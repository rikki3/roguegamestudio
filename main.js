import * as THREE from "./three.module.js";
import { GLTFLoader } from "./GLTFLoader.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load model
const loader = new GLTFLoader();

let model;

loader.load(
  "./model.glb",
  (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.position.set(0, 1.66, 0);
    model.scale.set(0.5, 0.5, 0.5);
  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop (rotation)
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.013; // rotate continuously
  }

  renderer.render(scene, camera);
}

animate();