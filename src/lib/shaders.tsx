export const vertexShader =  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
    vec3 color = vec3(0.035, 0.035, 0.035);
    gl_FragColor = vec4(color, 1.0);
  }
`;