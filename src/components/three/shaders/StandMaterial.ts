"use client";

import * as THREE from "three";
import { extend } from "@react-three/fiber";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 lightDirection;

  uniform float verticalStart;
  uniform float verticalEnd;
  uniform float verticalPower;

  uniform float radialEnd;
  uniform float radialStrength;

  uniform float baseDarkness;
  uniform float grayTone;

  uniform vec3 edgeColor;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {

    float diff = max(dot(normalize(vNormal), normalize(lightDirection)), 0.0);

    vec3 litColor = vec3(1.0);
    vec3 baseColor = mix(edgeColor, litColor, diff);

    float vertical = smoothstep(verticalStart, verticalEnd, vPosition.y);
    vertical = pow(vertical, verticalPower);

    float radial = length(vPosition.xz);
    radial = smoothstep(0.0, radialEnd, radial);

    float shade = (1.0 - vertical) * radial * radialStrength;
    shade = max(shade, baseDarkness * (1.0 - vertical));

    vec3 gray = vec3(grayTone);

    vec3 finalColor = mix(baseColor, gray, shade);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

class StandMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        lightDirection: {
          value: new THREE.Vector3(0.0, 0.1, 1.3).normalize(),
        },
        verticalStart: { value: -1.0 },
        verticalEnd: { value: -0.7 },
        verticalPower: { value: 6.25 },
        radialEnd: { value: 1.25 },
        radialStrength: { value: 1.05 },
        baseDarkness: { value: 0.36 },
        grayTone: { value: 0.96 },
        edgeColor: { value: new THREE.Color("#ebebeb") },
      },
    });
  }
}

extend({ StandMaterial });
