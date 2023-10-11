// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);
// Initialize dat.GUI
const gui = new dat.GUI();

// Camera settings
const cameraSettings = {
  positionX: 0,
  positionY: 10,
  positionZ: 10,
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0,
};

// Add camera settings to the GUI
const cameraFolder = gui.addFolder('Camera Settings');
cameraFolder.add(cameraSettings, 'positionX', -100, 100).onChange(updateCamera);
cameraFolder.add(cameraSettings, 'positionY', -100, 100).onChange(updateCamera);
cameraFolder.add(cameraSettings, 'positionZ', 0, 20).onChange(updateCamera);
cameraFolder.add(cameraSettings, 'lookAtX', -25, 25).onChange(updateCamera);
cameraFolder.add(cameraSettings, 'lookAtY', -25, 25).onChange(updateCamera);
cameraFolder.add(cameraSettings, 'lookAtZ', -25, 25).onChange(updateCamera);

// Function to update the camera based on GUI input
function updateCamera() {
  camera.position.set(cameraSettings.positionX, cameraSettings.positionY, cameraSettings.positionZ);
  camera.lookAt(cameraSettings.lookAtX, cameraSettings.lookAtY, cameraSettings.lookAtZ);
}


// Create a ground
const groundGeometry = new THREE.PlaneGeometry(10, 10, 32);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xC3BBDE, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// Rotate the ground to make it horizontal
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create a box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x4A3A7C });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Position the camera
camera.position.set(0, 5, 5);

camera.lookAt(0, 0, 0); // Make the camera look at the center of the scene

// Position the box
box.position.set(0, 0, 0);

// Main rendering loop
// Main rendering loop
const animate = () => {
    requestAnimationFrame(animate);

    // Move the box based on keyboard input
    if (keyboardState.left) {
        box.position.x -= 0.05;
    }
    if (keyboardState.right) {
        box.position.x += 0.05;
    }
    if (keyboardState.up) {
        box.position.z += 0.05;
    }
    if (keyboardState.down) {
        box.position.z -= 0.05;
    }

    // Call the wrapBox function to wrap the box's position
    wrapBox();

    renderer.render(scene, camera);
};

// Keyboard input for box movement
const keyboardState = {
    left: false,
    right: false,
    up: false,
    down: false,
};

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboardState.left = true;
            break;
        case 'ArrowRight':
            keyboardState.right = true;
            break;
        case 'ArrowUp':
            keyboardState.up = true;
            break;
        case 'ArrowDown':
            keyboardState.down = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboardState.left = false;
            break;
        case 'ArrowRight':
            keyboardState.right = false;
            break;
        case 'ArrowUp':
            keyboardState.up = false;
            break;
        case 'ArrowDown':
            keyboardState.down = false;
            break;
    }
});

// Function to wrap the box around the scene
const wrapBox = () => {
    if (box.position.x > 5) {
        box.position.x = -5;
    } else if (box.position.x < -5) {
        box.position.x = 5;
    }

    if (box.position.y > 5) {
        box.position.y = -5;
    } else if (box.position.y < -5) {
        box.position.y = 5;
    }
};


animate();
