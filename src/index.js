import * as THREE from "three"

// Styles
import "./assets/scss/main.scss"

/**
  * Variables
  */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const canvas = document.querySelector(".c-canvas");

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Camera
 *
 * fov => Field of view: A bigger number of degrees angles is like fisheye lens and smaller like telephoto lens.
 * aspect ratio
 * near
 * far
 *
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000);
scene.add(camera);

/**
 * Render
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  // alpha: true,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);
