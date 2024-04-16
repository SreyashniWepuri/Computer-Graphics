import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let renderer, scene, camera, ball;

const load = (url) => new Promise((resolve, reject) => {
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => resolve(gltf.scene), undefined, reject);
});

window.init = async () => {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
  scene.add(directionalLight);
  
  const geometry = new THREE.PlaneGeometry(1, 1);
  const texture = new THREE.TextureLoader().load('./assets/sparkle.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.scale.set(100, 100, 100);
  scene.add(plane);

   ball = await load('./assets/ball/scene.gltf');
  
   scene.add(ball);
   
  

  console.log('made a scene', ball);
  
};
window.loop = (dt, input) => {
  if (ball) {
    const movementSpeed = 0.005; // Movement speed
    const rollSpeed = 0.01; // Roll speed - adjust this for the size of the ball

    // Forward and backward movement - along the Z-axis
    if (input.keys.has('ArrowUp')) {
      ball.position.z -= movementSpeed * dt;
      ball.rotation.y += movementSpeed * dt / (Math.PI * ball.scale.y); 
    }
    if (input.keys.has('ArrowDown')) {
      ball.position.z += movementSpeed * dt;
      // Roll around the X-axis in the opposite direction
      ball.rotation.y += movementSpeed * dt / (Math.PI * ball.scale.y); 
    }

    // Left and right movement - along the X-axis
    if (input.keys.has('ArrowLeft')) {
      ball.position.x -= movementSpeed * dt;
      // Roll around the Y-axis
      ball.rotation.y += movementSpeed * dt / (Math.PI * ball.scale.y); // Assuming the ball's diameter is 1 unit
    }
    if (input.keys.has('ArrowRight')) {
      ball.position.x += movementSpeed * dt;
      // Roll around the Y-axis in the opposite direction
      ball.rotation.y -= movementSpeed * dt / (Math.PI * ball.scale.y); // Assuming the ball's diameter is 1 unit
    }

    // Clamp the ball's position to the plane's boundaries
    const planeBoundaryX = 50 / 2; // half the width
    const planeBoundaryZ = 50 / 2; // half the depth
    ball.position.x = Math.max(-planeBoundaryX, Math.min(planeBoundaryX, ball.position.x));
    ball.position.z = Math.max(-planeBoundaryZ, Math.min(planeBoundaryZ, ball.position.z));

    // Keep the camera looking at the ball
    camera.lookAt(ball.position);
  }

  // Render the scene
  renderer.render(scene, camera);

};