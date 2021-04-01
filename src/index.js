import * as THREE from "three"
import gsap from "gsap";

// Styles
import "./assets/scss/main.scss"

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

// let time = Date.now();
// Clock
const clock = new THREE.Clock();

// Gsap
// Gsap has its own raq() furnction furnction
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

// Animation
const raq = () => {

  /**
    * Time
    * The cube will rotate at the same speed regardless the frame rate of computer (it depending on computer, the frame rate can vary 45, 60, 75...)
    * The common Frame Rate on computers is 60fps
    */
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time; // Delta => difference between time and previous  time
  // time = currentTime; // update the time for the next raq call
  const elapsedTime = clock.getElapsedTime(); // Time elapsed by second
    
  // Update objetcs
  // mesh.rotation.y += 0.002 * deltaTime;
  mesh.rotation.y = elapsedTime * (Math.PI * 2); // 360º by one second
  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position)

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(raq);

}

raq();
