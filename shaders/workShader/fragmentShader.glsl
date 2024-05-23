uniform sampler2D uTexture;
uniform vec2 uAspectRatio;
uniform vec2 uMouse;
uniform vec2 uMouseIntro;
uniform float uIntro;

varying vec2 vUv;


void main() {
    vec2 resizedUvs = (vUv - vec2(0.5)) * uAspectRatio.xy + vec2(0.5);


    vec2 mixMouse = mix(uMouseIntro, uMouse, uIntro);

    // vec4 color = rgbShift(uTexture, resizedUvs);

    gl_FragColor = vec4(texture2D(uTexture, resizedUvs + (mixMouse * 0.008) * uIntro).r, texture2D(uTexture, resizedUvs - (mixMouse * 0.008) * uIntro).g, texture2D(uTexture, resizedUvs - (mixMouse * 0.005) * uIntro).b, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
}
