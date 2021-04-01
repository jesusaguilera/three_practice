import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Styles
import "./assets/scss/main.scss"

/**
* Cursor 
*/
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener("mousemove", (event) => {
  // From -0.5 to 0.5 values
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = - (event.clientY / sizes.height - 0.5);
})

/**
*  Basic
*/

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Canvas
const canvas = document.querySelector(".c-canvas");

// Scene
const scene = new THREE.Scene();

/**
 * PerspectiveCamera
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
controls.enableDamping = true;
// controls.target.y = 1;

/**
 * OrthographicCamera
 *
 * Left
 * Right
 * Top
 * Bottom
 * Near
 * Far
 *
 */
// In order to fix deformation we need to multiply aspectRatio by left and right
// const aspectRatio= sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// camera.position.z = 1;
// scene.add(camera);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh =  new THREE.Mesh(geometry, material);
scene.add(mesh);


//Render
const renderer = new THREE.WebGLRenderer({
  canvas,
  // alpha: true,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock();

// Animation
const raq = () => {

  const elapsedTime = clock.getElapsedTime(); // Time elapsed by second
    
  // Update objetcs
  // mesh.rotation.y = elapsedTime;
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position)

  // Update camera
  // camera.position.x = cursor.x * 2.5;
  // camera.position.y = cursor.y * 2.5;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2.5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2.5;
  // camera.position.y = cursor.y * 2.5;
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(raq);

}

raq();
