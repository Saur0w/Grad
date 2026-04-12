export const vertexShader =  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2  vUv;

  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289v4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x)  { return mod289v4(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289v3(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p) {
    float v = 0.0;
    v += 0.5000 * snoise(p);
    v += 0.2500 * snoise(p * 2.01 + vec3(3.1, 2.7, 1.9));
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t  = uTime * 0.09;

    vec2 q = vec2(
      fbm(vec3(uv,          t)),
      fbm(vec3(uv + 5.200,  t))
    );
    vec2 r = vec2(
      fbm(vec3(uv + 4.0 * q + vec2(1.70, 9.20), t * 0.8)),
      fbm(vec3(uv + 4.0 * q + vec2(8.30, 2.80), t * 0.8))
    );

    float f = (fbm(vec3(uv + 4.0 * r, t * 0.6)) + 1.0) * 0.5;

    vec3 colBase   = vec3(0.071, 0.071, 0.071);
    vec3 colIndigo = vec3(0.090, 0.055, 0.220);
    vec3 colTeal   = vec3(0.035, 0.130, 0.140);
    vec3 colAmber  = vec3(0.130, 0.080, 0.025);

    float b1 = smoothstep(0.30, 0.75, f);
    float b2 = smoothstep(0.45, 0.90, fbm(vec3(uv * 1.6 + r, t * 0.5)) * 0.5 + 0.5);
    float b3 = smoothstep(0.20, 0.60, fbm(vec3(uv * 0.9 + q, t * 0.4)) * 0.5 + 0.5);

    vec3 color = mix(colBase,   colIndigo, b1 * 0.85);
         color = mix(color,     colTeal,   b2 * 0.65);
         color = mix(color,     colAmber,  b3 * 0.45);

    float vignette = 1.0 - smoothstep(0.35, 1.0, length(uv - 0.5) * 1.55);
    color *= 0.70 + 0.30 * vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;