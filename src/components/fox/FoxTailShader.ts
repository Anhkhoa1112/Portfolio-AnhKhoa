import * as THREE from "three";

// ── Fox Tail Classification & Motion Constants (Raw Coordinates) ───────────
// The fox GLB faces +Y, tails extend towards -Y in raw coordinate space.
// Coordinate mapping: X = Left(-)/Right(+), Y = Back(-)/Front(+), Z = Down(-)/Up(+)

export const FOX_TAIL_THRESHOLDS = {
  Y_ROOT: -0.10,      // Y >= -0.10 is the fox body (static)
  LEFT_X_BOUND: -0.28,  // Full Left Tail when X <= -0.28
  LEFT_CENTER_X: -0.20, // Transition between Left and Center: [-0.28, -0.20]
  CENTER_RIGHT_X_MIN: -0.10, // Transition between Center and Right: [-0.10, 0.00]
  RIGHT_X_BOUND: 0.00,  // Full Right Tail when X >= 0.00
} as const;

// Tail Pivot points in raw coordinates (where each tail joins the body)
export const FOX_TAIL_PIVOTS = {
  left: new THREE.Vector3(-0.30, -0.10, -0.25),
  center: new THREE.Vector3(-0.10, -0.10, -0.30),
  right: new THREE.Vector3(0.02, -0.10, -0.22),
} as const;

export interface FoxTailUniforms {
  uFoxTime: { value: number };
  uTailIntensity: { value: number };
}

/**
 * Creates uniform references for the Fox Tail shader.
 */
export function createFoxTailUniforms(initialIntensity = 1.0): FoxTailUniforms {
  return {
    uFoxTime: { value: 0 },
    uTailIntensity: { value: initialIntensity },
  };
}

/**
 * GLSL code injected into Three.js MeshStandardMaterial vertex shader.
 * Uses 3-tail blend skinning:
 *   aTailWeights.x = Left Tail Weight (0..1)
 *   aTailWeights.y = Center Tail Weight (0..1)
 *   aTailWeights.z = Right Tail Weight (0..1)
 *   aTailWeights.w = Tail Root Falloff (0 at body seam, 1 at tail tips)
 *
 * Continuous C1 blend weights guarantee ZERO triangle splitting, ZERO mesh tearing,
 * and ZERO stepped edge artifacts across boundaries.
 */
const FOX_TAIL_COMMON_CHUNK = /* glsl */ `
#include <common>

attribute vec4 aTailWeights; // x=Left, y=Center, z=Right, w=Falloff
uniform float uFoxTime;
uniform float uTailIntensity;

vec3 applyTailRotationAroundPivot(vec3 p, vec3 pivot, float angleZ, float angleX) {
  vec3 rel = p - pivot;
  // 1. Rotate around raw Z (lateral sway in X-Y plane)
  float cZ = cos(angleZ);
  float sZ = sin(angleZ);
  vec2 rotXY = vec2(rel.x * cZ - rel.y * sZ, rel.x * sZ + rel.y * cZ);
  rel.x = rotXY.x;
  rel.y = rotXY.y;

  // 2. Rotate around raw X (vertical nod/wave in Y-Z plane)
  float cX = cos(angleX);
  float sX = sin(angleX);
  vec2 rotYZ = vec2(rel.y * cX - rel.z * sX, rel.y * sX + rel.z * cX);
  rel.y = rotYZ.x;
  rel.z = rotYZ.y;

  return rel + pivot;
}

vec3 applyTailRotationVector(vec3 v, float angleZ, float angleX) {
  float cZ = cos(angleZ);
  float sZ = sin(angleZ);
  vec2 rotXY = vec2(v.x * cZ - v.y * sZ, v.x * sZ + v.y * cZ);
  v.x = rotXY.x;
  v.y = rotXY.y;

  float cX = cos(angleX);
  float sX = sin(angleX);
  vec2 rotYZ = vec2(v.y * cX - v.z * sX, v.y * sX + v.z * cX);
  v.y = rotYZ.x;
  v.z = rotYZ.y;

  return v;
}
`;

/**
 * Computes the aTailWeights attribute once on the mesh geometry.
 *
 * Each tail vertex is assigned a 4-component vector:
 *   [wLeft, wCenter, wRight, falloff]
 * where wLeft + wCenter + wRight = 1.0 (smooth 3-way blend)
 * and falloff smoothly ramps from 0.0 at the body junction (Y = -0.10)
 * to 1.0 at the tail tips (Y <= -0.28).
 *
 * For body vertices (Y >= -0.10), all 4 weights are 0.0.
 */
export function setupTailGeometryAttributes(geometry: THREE.BufferGeometry): {
  totalVertices: number;
  leftTailCount: number;
  centerTailCount: number;
  rightTailCount: number;
  bodyCount: number;
} {
  const existingAttr = geometry.getAttribute("aTailWeights");
  if (existingAttr) {
    return (geometry.userData.tailStats as any) || {
      totalVertices: geometry.getAttribute("position").count,
      leftTailCount: 0,
      centerTailCount: 0,
      rightTailCount: 0,
      bodyCount: 0,
    };
  }

  const posAttr = geometry.getAttribute("position");
  if (!posAttr) {
    throw new Error("Geometry has no position attribute");
  }

  const count = posAttr.count;
  const weights = new Float32Array(count * 4);
  const posArray = posAttr.array as Float32Array;

  let leftCount = 0;
  let centerCount = 0;
  let rightCount = 0;
  let bodyCount = 0;

  for (let i = 0; i < count; i++) {
    const x = posArray[i * 3];
    const y = posArray[i * 3 + 1];

    if (y < FOX_TAIL_THRESHOLDS.Y_ROOT) {
      // Distance from root junction (Y = -0.10) towards tail tips (Y <= -0.28)
      const distFromRoot = Math.abs(y - FOX_TAIL_THRESHOLDS.Y_ROOT);
      const normDist = Math.min(1.0, distFromRoot / 0.18);
      // Cubic smoothstep: w^2 * (3 - 2w)
      const falloff = normDist * normDist * (3.0 - 2.0 * normDist);

      // Smoothstep transition Left -> Center: [-0.28, -0.20]
      const tLC = Math.max(0, Math.min(1, (x - (-0.28)) / ((-0.20) - (-0.28))));
      const sLC = tLC * tLC * (3 - 2 * tLC);
      const wLeft = 1.0 - sLC;

      // Smoothstep transition Center -> Right: [-0.10, 0.00]
      const tCR = Math.max(0, Math.min(1, (x - (-0.10)) / (0.00 - (-0.10))));
      const sCR = tCR * tCR * (3 - 2 * tCR);
      const wRight = sCR;

      // Center tail weight fills the intermediate zone
      const wCenter = Math.max(0, 1.0 - wLeft - wRight);
      const sum = wLeft + wCenter + wRight || 1.0;

      weights[i * 4] = wLeft / sum;
      weights[i * 4 + 1] = wCenter / sum;
      weights[i * 4 + 2] = wRight / sum;
      weights[i * 4 + 3] = falloff;

      if (wLeft > 0.5) leftCount++;
      else if (wCenter > 0.5) centerCount++;
      else rightCount++;
    } else {
      // Fox body: static
      weights[i * 4] = 0.0;
      weights[i * 4 + 1] = 0.0;
      weights[i * 4 + 2] = 0.0;
      weights[i * 4 + 3] = 0.0;
      bodyCount++;
    }
  }

  geometry.setAttribute("aTailWeights", new THREE.BufferAttribute(weights, 4));

  const stats = {
    totalVertices: count,
    leftTailCount: leftCount,
    centerTailCount: centerCount,
    rightTailCount: rightCount,
    bodyCount,
  };

  geometry.userData.tailStats = stats;
  return stats;
}

/**
 * Injects the Fox Tail deformation shader into a material via onBeforeCompile.
 */
export function hookMaterialTailShader(
  material: THREE.Material,
  uniforms: FoxTailUniforms
): void {
  if (material.userData.foxTailShaderApplied) {
    return;
  }
  material.userData.foxTailShaderApplied = true;

  // Custom program cache key ensures Three.js compiles a unique program
  const prevCacheKey = material.customProgramCacheKey?.bind(material);
  material.customProgramCacheKey = () => {
    const base = prevCacheKey ? prevCacheKey() : "";
    return `${base}_fox_tail_skinning_v7`;
  };

  const prevOnBeforeCompile = material.onBeforeCompile?.bind(material);

  material.onBeforeCompile = (shader, renderer) => {
    if (prevOnBeforeCompile) {
      prevOnBeforeCompile(shader, renderer);
    }

    // Attach uniforms
    shader.uniforms.uFoxTime = uniforms.uFoxTime;
    shader.uniforms.uTailIntensity = uniforms.uTailIntensity;

    // 1. Inject attribute, uniforms, and helper functions in common header
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      FOX_TAIL_COMMON_CHUNK
    );

    // 2. Rotate normal in beginnormal_vertex (preserving PBR specular/normal accuracy)
    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      /* glsl */ `#include <beginnormal_vertex>
	if (aTailWeights.w > 0.0001 && uTailIntensity > 0.0) {
		float falloff = aTailWeights.w;
		float tipFlex = pow(falloff, 1.4);
		float phaseLag = falloff * 0.85;

		float aZ_L = (sin(uFoxTime * 0.55 - phaseLag) * 0.115 + sin(uFoxTime * 0.231 + 0.0) * 0.052) * (1.0 + tipFlex * 0.45);
		float aX_L = (sin(uFoxTime * 0.374 + 1.2 - phaseLag * 0.7) * 0.065 + sin(uFoxTime * 0.170 + 0.5) * 0.028) * (1.0 + tipFlex * 0.35);
		vec3 nL = applyTailRotationVector(objectNormal, aZ_L, aX_L);

		float aZ_C = (sin(uFoxTime * 0.48 + 1.7 - phaseLag) * 0.096 + sin(uFoxTime * 0.201 + 2.21) * 0.045) * (1.0 + tipFlex * 0.45);
		float aX_C = (sin(uFoxTime * 0.326 + 2.9 - phaseLag * 0.7) * 0.062 + sin(uFoxTime * 0.148 + 1.1) * 0.025) * (1.0 + tipFlex * 0.35);
		vec3 nC = applyTailRotationVector(objectNormal, aZ_C, aX_C);

		float aZ_R = (sin(uFoxTime * 0.62 + 3.2 - phaseLag) * 0.105 + sin(uFoxTime * 0.260 + 4.16) * 0.048) * (1.0 + tipFlex * 0.45);
		float aX_R = (sin(uFoxTime * 0.421 + 4.4 - phaseLag * 0.7) * 0.060 + sin(uFoxTime * 0.192 + 1.6) * 0.024) * (1.0 + tipFlex * 0.35);
		vec3 nR = applyTailRotationVector(objectNormal, aZ_R, aX_R);

		vec3 blendedNormal = normalize(nL * aTailWeights.x + nC * aTailWeights.y + nR * aTailWeights.z);
		objectNormal = normalize(mix(objectNormal, blendedNormal, aTailWeights.w * uTailIntensity));

		#ifdef USE_TANGENT
			vec3 tL = applyTailRotationVector(objectTangent, aZ_L, aX_L);
			vec3 tC = applyTailRotationVector(objectTangent, aZ_C, aX_C);
			vec3 tR = applyTailRotationVector(objectTangent, aZ_R, aX_R);
			vec3 blendedTangent = normalize(tL * aTailWeights.x + tC * aTailWeights.y + tR * aTailWeights.z);
			objectTangent = normalize(mix(objectTangent, blendedTangent, aTailWeights.w * uTailIntensity));
		#endif
	}`
    );

    // 3. Deform vertex position in begin_vertex with blended 3-tail skinning
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      /* glsl */ `#include <begin_vertex>
	if (aTailWeights.w > 0.0001 && uTailIntensity > 0.0) {
		float falloff = aTailWeights.w;
		float tipFlex = pow(falloff, 1.4);
		float phaseLag = falloff * 0.85;

		float aZ_L = (sin(uFoxTime * 0.55 - phaseLag) * 0.115 + sin(uFoxTime * 0.231 + 0.0) * 0.052) * (1.0 + tipFlex * 0.45);
		float aX_L = (sin(uFoxTime * 0.374 + 1.2 - phaseLag * 0.7) * 0.065 + sin(uFoxTime * 0.170 + 0.5) * 0.028) * (1.0 + tipFlex * 0.35);
		vec3 pL = applyTailRotationAroundPivot(transformed, vec3(-0.30, -0.10, -0.25), aZ_L, aX_L);

		float aZ_C = (sin(uFoxTime * 0.48 + 1.7 - phaseLag) * 0.096 + sin(uFoxTime * 0.201 + 2.21) * 0.045) * (1.0 + tipFlex * 0.45);
		float aX_C = (sin(uFoxTime * 0.326 + 2.9 - phaseLag * 0.7) * 0.062 + sin(uFoxTime * 0.148 + 1.1) * 0.025) * (1.0 + tipFlex * 0.35);
		vec3 pC = applyTailRotationAroundPivot(transformed, vec3(-0.10, -0.10, -0.30), aZ_C, aX_C);

		float aZ_R = (sin(uFoxTime * 0.62 + 3.2 - phaseLag) * 0.105 + sin(uFoxTime * 0.260 + 4.16) * 0.048) * (1.0 + tipFlex * 0.45);
		float aX_R = (sin(uFoxTime * 0.421 + 4.4 - phaseLag * 0.7) * 0.060 + sin(uFoxTime * 0.192 + 1.6) * 0.024) * (1.0 + tipFlex * 0.35);
		vec3 pR = applyTailRotationAroundPivot(transformed, vec3(0.02, -0.10, -0.22), aZ_R, aX_R);

		vec3 blendedPos = pL * aTailWeights.x + pC * aTailWeights.y + pR * aTailWeights.z;
		transformed = mix(transformed, blendedPos, aTailWeights.w * uTailIntensity);
	}`
    );
  };

  material.needsUpdate = true;
}

/**
 * Traverses an Object3D hierarchy, computes aTailWeights for all mesh geometries,
 * and hooks all materials for GPU tail deformation.
 */
export function applyFoxTailShader(
  target: THREE.Object3D,
  uniforms: FoxTailUniforms
): {
  meshCount: number;
  totalVertices: number;
  stats: ReturnType<typeof setupTailGeometryAttributes> | null;
} {
  let meshCount = 0;
  let totalVertices = 0;
  let lastStats: ReturnType<typeof setupTailGeometryAttributes> | null = null;

  target.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      meshCount++;

      // Geometry setup
      if (mesh.geometry) {
        lastStats = setupTailGeometryAttributes(mesh.geometry);
        totalVertices += mesh.geometry.getAttribute("position")?.count || 0;
      }

      // Material setup
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => hookMaterialTailShader(mat, uniforms));
        } else {
          hookMaterialTailShader(mesh.material, uniforms);
        }
      }
    }
  });

  return {
    meshCount,
    totalVertices,
    stats: lastStats,
  };
}
