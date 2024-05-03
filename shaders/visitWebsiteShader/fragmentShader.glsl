uniform vec2 uMouse;
uniform float uTime;

varying float vElevation;
varying float vIntro;
varying vec2 vUv;

void main()
{
    vec3 color = mix(vec3(0.016,0.059,0.075), vec3(0.027,0.118,0.149), vElevation * 0.5);
    gl_FragColor = vec4(color, 1.0);
}
