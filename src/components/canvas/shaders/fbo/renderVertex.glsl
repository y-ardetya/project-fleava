uniform sampler2D uPosition;

attribute vec2 ref;

varying vec2 vRef;
varying vec3 vPos;
varying vec3 vNormal;

float rand (vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main () {
    vRef = ref;
    vec3 pos = texture2D(uPosition, ref).xyz;
    vPos = pos;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 3.0;
     // Size attenuation;
    gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;
}