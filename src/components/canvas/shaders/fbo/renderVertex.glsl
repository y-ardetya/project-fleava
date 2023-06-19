uniform sampler2D uPosition;

attribute vec2 ref;

varying vec2 vRef;

void main () {
    vRef = ref;
    vec3 pos = texture2D(uPosition, ref).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 5.0;
}