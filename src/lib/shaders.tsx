export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse; 
  varying vec2  vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float blob(vec2 uv, vec2 center, float radius) {
    float d = length(uv - center);
    return 1.0 - smoothstep(0.0, radius, d);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.10;

    vec3 base = vec3(0.035, 0.035, 0.035); 
    vec3 mauve = vec3(0.314, 0.176, 0.251); 
    vec3 indigo = vec3(0.427, 0.416, 0.631); 
    vec2 driftA = vec2(
      sin(t * 0.70) * 0.06,
      cos(t * 0.50) * 0.07
    );
    vec2 driftB = vec2(
      cos(t * 0.55) * 0.05,
      sin(t * 0.75) * 0.06
    );

    vec2 offsetA = vec2( 0.14, -0.10);
    vec2 offsetB = vec2(-0.12,  0.12);

    vec2 idleA = vec2(0.72, 0.42);
    vec2 idleB = vec2(0.58, 0.56);

    vec2 posA = mix(idleA, uMouse + offsetA, 0.55) + driftA;
    vec2 posB = mix(idleB, uMouse + offsetB, 0.55) + driftB; 
    
    float breatheA = 1.0 + sin(t * 1.10) * 0.06;
    float breatheB = 1.0 + sin(t * 0.85 + 1.2) * 0.05;

    float bA = pow(blob(uv, posA, 0.54) * breatheA, 1.6);
    float bB = pow(blob(uv, posB, 0.50) * breatheB, 1.8); 
    
    vec3 color = base;
    color = mix(color, mauve,  bA * 0.90);
    color = mix(color, indigo, bB * 0.75);
    color += mauve  * bA * bB * 0.15;
    color += indigo * bA * bB * 0.10;

    float vig = smoothstep(0.0, 1.0, length(uv - 0.5) * 1.85);
    color = mix(color, base * 0.5, vig);

    float grain = hash(uv * 900.0 + fract(uTime) * 437.0);
    color += (grain - 0.5) * 0.04;
    gl_FragColor = vec4(color, 1.0);
  }
`;