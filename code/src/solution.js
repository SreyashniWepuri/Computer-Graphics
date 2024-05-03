import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let renderer, scene, camera, ball;

const load = (url) => new Promise((resolve, reject) => {
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => resolve(gltf.scene), undefined, reject);
});

const checkCollision = (object1, object2) => {
  if (object1.geometry && object2.geometry) {
    const distance = object1.position.distanceTo(object2.position);
    const combinedRadius = object1.geometry.boundingSphere.radius + object2.geometry.boundingSphere.radius;
    return distance < combinedRadius;
  }
  return false;
};
const audioLoader = new THREE.AudioLoader();



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
  const texture = new THREE.TextureLoader().load('./assets/leaf.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.scale.set(100, 100, 100);
  scene.add(plane);

   ball = await load('./assets/old_soccer_ball/scene.gltf');
   ball.position.set(0,0,0);
   ball.name="mainball";
   scene.add(ball);
   


   const lava_planet1 = await load('./assets/lava_planet/scene.gltf');
   lava_planet1.position.set(1, 0, 3); 
   scene.add(lava_planet1);
   lava_planet1.name="planet1";
   console.log("Hi 1", lava_planet1);

  const lava_planet2 = await load('./assets/lava_planet/scene.gltf');
  lava_planet2.position.set(0, 0, 5); 
  scene.add(lava_planet2);
  lava_planet2.name="planet2";
  const lava_planet3 = await load('./assets/lava_planet/scene.gltf');
  lava_planet3.position.set(1, 0, 7); 
  scene.add(lava_planet3);
  lava_planet3.name="planet3";
  const lava_planet4 = await load('./assets/lava_planet/scene.gltf');
  lava_planet4.position.set(1, 0, 9); 
  scene.add(lava_planet4);
  lava_planet4.name="planet4";
  const lava_planet5 = await load('./assets/lava_planet/scene.gltf');
  lava_planet3.position.set(1, 0, 11); 
  scene.add(lava_planet5);
  lava_planet5.name="planet5";
  
  
  // Load and add Earth objects at different positions
const earth1 = await load('./assets/earth/scene.gltf');
earth1.position.set(2, 0, 4);
scene.add(earth1);
earth1.name = "earth1";
console.log("itsme", earth1);


const earth2 = await load('./assets/earth/scene.gltf');
earth2.position.set(-2, 0, 6);
scene.add(earth2);
earth2.name = "earth2";

const earth3 = await load('./assets/earth/scene.gltf');
earth3.position.set(0, 0, -4);
scene.add(earth3);
earth3.name = "earth3";

const earth4 = await load('./assets/earth/scene.gltf');
earth4.position.set(5, 0, 8);
scene.add(earth4);
earth4.name = "earth4";

const earth5 = await load('./assets/earth/scene.gltf');
earth5.position.set(-3, 0, -5);
scene.add(earth5);
earth5.name = "earth5";


// Load and add globe objects at different positions
const globe1 = await load('./assets/globe/scene.gltf');
globe1.position.set(2,0,-4);
scene.add(globe1);
globe1.name = "globe1";
// astronaut
const astronaut1 = await load('./assets/astronaut/scene.gltf');
astronaut1.position.set(3, 1 ,-15);
astronaut1.scale.set(0.07,0.07,0.07);
scene.add(astronaut1);
astronaut1.name = "astronaut";
const astronaut2 = await load('./assets/astronaut/scene.gltf');
astronaut2.position.set(-7, 1 ,-20);
astronaut2.scale.set(0.07,0.07,0.07);
scene.add(astronaut2);
//astronaut2.name = "astronaut";
const astronaut3 = await load('./assets/astronaut/scene.gltf');
astronaut3.position.set(10, 1 ,-25);
astronaut3.scale.set(0.07,0.07,0.07);
scene.add(astronaut3);
//astronaut3.name = "astronaut";
const astronaut4 = await load('./assets/astronaut/scene.gltf');
astronaut4.position.set(25, 1 ,-35);
astronaut4.scale.set(0.07,0.07,0.07);
scene.add(astronaut4);
//astronaut4.name = "astronaut";



// Define the range for random positions
const minX = -20;
const maxX = 20; 
const minZ = -20;
const maxZ = 20; 

// Function to generate a random position within the range
function randomPosition() {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(minX, maxX),
    0, // Y position is 0 for placing objects on the plane
    THREE.MathUtils.randFloat(minZ, maxZ)
  );
}

// Place fur_tree in four different random positions
for (let i = 0; i < 4; i++) {
  const fur_tree = await load('./assets/fur_tree/scene.gltf');
  fur_tree.position.copy(randomPosition());
  scene.add(fur_tree);
}





// Load and add plastic_water_bottle objects at different positions
const plastic_water_bottle1 = await load('./assets/plastic_water_bottle/scene.gltf');
plastic_water_bottle1.position.set(2, 0, -4);
plastic_water_bottle1.scale.set(0.1, 0.1, 0.1); 
scene.add(plastic_water_bottle1);
plastic_water_bottle1.name = "plastic_water_bottle1";

const plastic_water_bottle2 = await load('./assets/plastic_water_bottle/scene.gltf');
plastic_water_bottle2.position.set(-2, 0, -6);
plastic_water_bottle2.scale.set(0.1, 0.1, 0.1); 
scene.add(plastic_water_bottle2);
plastic_water_bottle2.name = "plastic_water_bottle2";

const plastic_water_bottle3 = await load('./assets/plastic_water_bottle/scene.gltf');
plastic_water_bottle3.position.set(0, 0, 4);
plastic_water_bottle3.scale.set(0.1, 0.1, 0.1); 
scene.add(plastic_water_bottle3);
plastic_water_bottle3.name = "plastic_water_bottle3";

const plastic_water_bottle4 = await load('./assets/plastic_water_bottle/scene.gltf');
plastic_water_bottle4.position.set(-5, 0, -8);
plastic_water_bottle4.scale.set(0.1, 0.1, 0.1);
scene.add(plastic_water_bottle4);
plastic_water_bottle4.name = "plastic_water_bottle4";

const plastic_water_bottle5 = await load('./assets/plastic_water_bottle/scene.gltf');
plastic_water_bottle5.position.set(3, 0, 5);
plastic_water_bottle5.scale.set(0.1, 0.1, 0.1);
scene.add(plastic_water_bottle5);
plastic_water_bottle5.name = "plastic_water_bottle5";

// Load and add rocket objects at different positions
const rocket1 = await load('./assets/rocket/scene.gltf');
rocket1.position.set(2, 0, -4);

scene.add(rocket1);
rocket1.name = "rocket1";

const rocket2 = await load('./assets/rocket/scene.gltf');
rocket2.position.set(-4, 0,-4);
scene.add(rocket2);
rocket2.name = "rocket2";

const rocket3 = await load('./assets/rocket/scene.gltf');
rocket3.position.set(6, 0, 4);
scene.add(rocket3);
rocket3.name = "rocket3";

const rocket4 = await load('./assets/rocket/scene.gltf');
rocket4.position.set(-5, 0, -2);
scene.add(rocket4);
rocket4.name = "rocket4";

const rocket5 = await load('./assets/rocket/scene.gltf');
rocket5.position.set(3, 0, 5);
scene.add(rocket5);
rocket5.name = "rocket5";
   
   
  

  console.log('made a scene', ball);
  const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    ball.add(listener);
    
    audioLoader.load('./assets/music/happy.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      sound.play();
    });
  
};
function shakeCamera() {
  const intensity = 0.4; 
  const duration = 0.2; 

  const startPosition = camera.position.clone();
  const startTime = Date.now();

  function update() {
    const elapsed = (Date.now() - startTime) / 1000; 
    if (elapsed < duration) {
      const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * intensity,
        (Math.random() - 0.5) * intensity,
        (Math.random() - 0.5) * intensity
      );
      camera.position.copy(startPosition).add(randomOffset);
      requestAnimationFrame(update);
    } else {
      camera.position.copy(startPosition); 
    }
  }

  update();
}



let remainingPlanets = 20; 
let gameEnded = false;
const distanceThreshold = 1.5;

function collide() {
  const p = scene.getObjectByName('mainball');
  const ballPosition = p.position.clone();

  const planets = [
    scene.getObjectByName('planet1'),
    scene.getObjectByName('planet2'),
    scene.getObjectByName('planet3'),
    scene.getObjectByName('planet4'),
    scene.getObjectByName('planet5'),
    scene.getObjectByName('earth1'),
    scene.getObjectByName('earth2'),
    scene.getObjectByName('earth3'),
    scene.getObjectByName('earth4'),
    scene.getObjectByName('earth5'),
    scene.getObjectByName('plastic_water_bottle1'),
    scene.getObjectByName('plastic_water_bottle2'),
    scene.getObjectByName('plastic_water_bottle3'),
    scene.getObjectByName('plastic_water_bottle4'),
    scene.getObjectByName('plastic_water_bottle5'),
    scene.getObjectByName('rocket1'),
    scene.getObjectByName('rocket2'),
    scene.getObjectByName('rocket3'),
    scene.getObjectByName('rocket4'),
    scene.getObjectByName('rocket5'),
  ];

  planets.forEach(planet => {
    if (!planet) return; 

    const planetPosition = planet.position.clone();
    const distance = ballPosition.distanceTo(planetPosition);
    const combinedRadius = p.scale.x / 2 + planet.scale.x / 2; 

    if (distance < combinedRadius) {
      p.scale.addScalar(0.03);
      scene.remove(planet);
      remainingPlanets--;
      shakeCamera();
     

      if (remainingPlanets === 0) {
        gameEnded = true;
      }
    }
  });
}

function endGame() {
  console.log('Game Over! All planets have been disappeared.');
  
}


// Variables to handle acceleration and deceleration
let acceleration = 0.0003;
let deceleration = 0.001;
let speed = 0;
let rollAngle = 0;
let rotationSpeed = 0.5;


function calculateRollAngle(direction) {
  // Adjust rollAngle based on direction
  rollAngle = direction === 'right' ? Math.min(rollAngle + rotationSpeed, 1) :
    direction === 'left' ? Math.max(rollAngle - rotationSpeed, -1) :
    0;
}

window.loop = (dt, input) => {
  if (gameEnded) {
    alert('Game Over! All planets have been disappeared.');
    return;
  }

  if (ball && (input.keys.has('ArrowUp') || input.keys.has('ArrowDown') || input.keys.has('ArrowLeft') || input.keys.has('ArrowRight'))) {
    const movementSpeed = 0.008; // Movement speed

    // Accelerate the ball
    if (speed < movementSpeed) {
      speed += acceleration * dt;
    }

    // Forward and backward movement - along the Z-axis
    if (input.keys.has('ArrowUp')) {
      ball.position.z -= speed * dt;
      collide();
    }
    if (input.keys.has('ArrowDown')) {
      ball.position.z += speed * dt;
      collide();
    }

    // Left and right movement - along the X-axis
    if (input.keys.has('ArrowLeft')) {
      ball.position.x -= speed * dt;
      collide();
    }
    if (input.keys.has('ArrowRight')) {
      ball.position.x += speed * dt;

      collide();
    }

    
    //Update ball's rotation based on its velocity for rolling effect
    const velocity = new THREE.Vector3(speed, 0, 0);
    const axis = new THREE.Vector3(0, 1, 0); // Axis for rolling
    const angle = velocity.length() * dt; // Angle of rotation based on velocity
    ball.rotateOnWorldAxis(axis, angle);
  


    // Clamp the ball's position to the plane's boundaries
    const planeBoundaryX = 50 / 2; // half the width
    const planeBoundaryZ = 50 / 2; // half the depth
    ball.position.x = Math.max(-planeBoundaryX, Math.min(planeBoundaryX, ball.position.x));
    ball.position.z = Math.max(-planeBoundaryZ, Math.min(planeBoundaryZ, ball.position.z));

    // Apply deceleration when no keys are pressed
    if (!input.keys.has('ArrowUp') && !input.keys.has('ArrowDown') && !input.keys.has('ArrowLeft') && !input.keys.has('ArrowRight')) {
      speed -= deceleration * dt;
      speed = Math.max(0, speed); // Ensure speed doesn't go negative
    }

    // Keep the camera looking at the ball
    camera.lookAt(ball.position);
  }

  // Render the scene
  renderer.render(scene, camera);
};
// I have added background music for extra bonus points . professor if you didnt get the background music just refresh the page .


