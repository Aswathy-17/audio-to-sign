import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer, avatar;

// Initialize the 3D Scene
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add Light
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  // Load Avatar
  const loader = new GLTFLoader();
  loader.load('path/to/avatar.glb', (gltf) => {
    avatar = gltf.scene;
    mixer = new THREE.AnimationMixer(avatar);

    scene.add(avatar);

    // Play Default Animation (if exists)
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
  });

  window.addEventListener('resize', onWindowResize);

  animate();
}

// Resize Handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.01);
  renderer.render(scene, camera);
}

// Convert Text to Sign Language Animation
function convertToSign() {
  const text = document.getElementById('textInput').value.toUpperCase();

  if (!avatar || !mixer) {
    alert("Avatar not loaded yet!");
    return;
  }

  // Example: Trigger Animations Based on Characters
  [...text].forEach((char, index) => {
    setTimeout(() => {
      const action = mixer.clipAction(`Sign_${char}`); // Animation clips named Sign_A, Sign_B, etc.
      if (action) action.reset().play();
    }, index * 1000);
  });
}

init();
