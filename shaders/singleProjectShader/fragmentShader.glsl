uniform sampler2D uTexture;
uniform vec2 uAspectRatio;
uniform vec2 uMouse;
uniform vec2 uMouseIntro;
uniform float uIntro;

varying vec2 vUv;



void main() {
    vec2 resizedUvs = (vUv - vec2(0.5)) * uAspectRatio.xy + vec2(0.5);

    vec2 mixMouse = mix(uMouseIntro, uMouse, uIntro);

    vec3 color = texture2D(uTexture,vUv).rgb;

    gl_FragColor = vec4(color, 1.0);
}
