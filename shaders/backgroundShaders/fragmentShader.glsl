uniform vec2 uMouse;
uniform float uTime;
uniform float uScroll;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec3 color = mix(vec3(0.95, 0.93, 0.89), vec3(0.87, 0.84, 0.80), vElevation * 2.0);
    gl_FragColor = vec4(color, 1.0);
}
