import * as THREE from "three"

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

// Position
// mesh.position.x = 0.7
// mesh.position.y =  -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6 , 1);
//mesh.position.normalize(); // Reduce mesh length to 1
//mesh.position.length(); // Get length of mesh position
//mesh.position.distanceTo(camera.position); // Get distance between box and camera

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = .5;
// mesh.scale.z = .5;
mesh.scale.set(2, 0.5, 0.5)

// Rotation
/* 
 Math.PI * 2 => 360º
 Math.PI * 1.5 => 270º
 Math.PI => 180º
 Math.PI * 0.5 => 90º
 Math.PI * 0.25 => 45º
*/
// mesh.rotation.reorder("YXZ")
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.z = 0.5;
// mesh.rotation.set(0.8, 0.5, 0.5);
   
// Look At
camera.lookAt(mesh.position)

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

//Render
const renderer = new THREE.WebGLRenderer({
  canvas,
  // alpha: true,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);
