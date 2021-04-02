import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Styles
import "./assets/scss/main.scss"

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Resizing
window.addEventListener("resize", (event) => {

  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)

})

// Fullscreen and Safari support
window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    }else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
});

// Canvas
const canvas = document.querySelector(".c-canvas");

// Scene
const scene = new THREE.Scene();

/**
 * Camera
 *
 * Field of view: A bigger number of degrees angles is like fisheye lens and smaller like telephoto lens.
 * Aspect ratio
 * Near
 * Far
 *
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;

// Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh =  new THREE.Mesh(geometry, material);
// scene.add(mesh);

const count = 1; // numbers of triangles

// Draw Triangle Vertices
const vertices = new Float32Array(count * 3 * 3); // count = number of triangles * 3 vertices * 3 values of vertices

for( let i = 0; i < count * 3 * 3; i++) {
  vertices.[i] = ((Math.random() - 0.5) * 2)
}
// Draw Plane Vertices
/*
 * const vertices = new Float32Array([
 *   // Bottom triangle
 * 	-1.0, -1.0,  1.0, // vertex left-bottom
 * 	 1.0, -1.0,  1.0, // vertex rigth-bottom
 * 	 1.0,  1.0,  1.0, // vertex right-top
 * 
 *   // Top triangle
 * 	 1.0,  1.0,  1.0, // vertex top-right
 * 	-1.0,  1.0,  1.0, // vertex left-top
 * 	-1.0, -1.0,  1.0  // vertex left-bottom
 *
 *   Bottom triangle + Top triangle = Plane
 * ] );
 */

// itemSize = 3 because there are 3 values per vertex ( -0.4|1.2|1.0 // -0.3|0.5|0.8 // .. )
const positionAttribute = new THREE.BufferAttribute( vertices, 3 )

// Empty Geometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', positionAttribute );

const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide} );
// material.wireframe = true;
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh);




//Render
const renderer = new THREE.WebGLRenderer({
  canvas,
  // alpha: true,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height);
// if pixel ratio of device is bigger than 2 we take 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Clock
const clock = new THREE.Clock();

// Animation
const raq = () => {

  // const elapsedTime = clock.getElapsedTime(); // Time elapsed by second
    
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(raq);

}

raq();
