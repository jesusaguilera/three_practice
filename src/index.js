import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Styles
import "./assets/scss/main.scss"

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

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
