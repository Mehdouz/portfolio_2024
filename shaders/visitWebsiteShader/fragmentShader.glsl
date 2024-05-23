uniform vec2 uMouse;
uniform float uTime;

varying float vElevation;
varying float vIntro;
varying vec2 vUv;

void main()
{
    vec3 color = mix(vec3(0.95, 0.93, 0.89), vec3(0.85, 0.83, 0.80), vElevation * 0.5);
    gl_FragColor = vec4(color, 1.0);
}
