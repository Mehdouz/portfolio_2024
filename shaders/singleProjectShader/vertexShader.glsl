uniform float uTime;
uniform vec2 uMouse;
uniform float uVelocity;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

vec3 deformationCurve(vec3 position, vec2 uv, float offset) {
    position.y = position.y + (sin(uv.x * M_PI) * offset);
    return position;
}

void main() {
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uVelocity * 0.8);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
