// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // High DPI support
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Function to create a heart shape with improved design
function createHeart() {
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  // Extrude the heart shape to create 3D geometry
  const geometry = new THREE.ExtrudeGeometry(heartShape, {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  });

  // Apply a shiny red material with a subtle glow
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xff0066, // Red color
    roughness: 0.3,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  const heartMesh = new THREE.Mesh(geometry, material);
  return heartMesh;
}

// Create and animate multiple hearts
const hearts = [];
for (let i = 0; i < 100; i++) {
  const heart = createHeart();

  // Set random positions for each heart
  heart.position.set(
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200,
    (Math.random() - 0.5) * 200
  );

  // Randomize the initial scale and rotation using a wider range
  heart.scale.set(Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5);
  heart.rotation.x = Math.random() * 2 * Math.PI;
  heart.rotation.y = Math.random() * 2 * Math.PI;

  hearts.push(heart);
  scene.add(heart);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  hearts.forEach((heart) => {
    // Move hearts in the Z-axis (towards the camera) with a slowing effect
    heart.position.z += 0.4;

    // Reset position if heart moves too close to the camera
    if (heart.position.z > 50) {
      heart.position.z = -100;
    }

    // Add smooth rotation to make them look more dynamic
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}
animate();

// Handle burst on tap/click with particle effect
function burstHeart(event) {
  // Get the 3D position of the click/tap
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycaster to detect the clicked heart
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check if a heart is clicked
  const intersects = raycaster.intersectObjects(hearts);

  if (intersects.length > 0) {
    const heart = intersects[0].object;

    // Create particle system for burst effect
    const burstGeometry = new THREE.BufferGeometry();
    const burstMaterial = new THREE.PointsMaterial({ color: heart.material.color, size: 0.5 });
    const burstVertices = [];
    for (let i = 0; i < 100; i++) {
      const x = heart.position.x + (Math.random() - 0.5) * 5;
      const y = heart.position.y + (Math.random() - 0.5) * 5;
      const z = heart.position.z + (Math.random() - 0.5) * 5;
      burstVertices.push(x, y, z);
    }
    burstGeometry.setAttribute('position', new THREE.Float32BufferAttribute(burstVertices, 3));
    const burstParticles = new THREE.Points(burstGeometry, burstMaterial);
    scene.add(burstParticles);

    // Burst animation for both heart and particles
    const burstInterval = setInterval(() => {
      heart.scale.multiplyScalar(0.92);
      heart.rotation.x += 0.05;
      heart.rotation.y += 0.05;

      burstParticles.material.size *= 0.95; // Shrink particles
      burstParticles.material.opacity *= 0.95; // Fade out particles

      if (heart.scale.x < 0.1) {
        scene.remove(heart);
        scene.remove(burstParticles);
        clearInterval(burstInterval);
      }
    }, 16);
  }
}

// Add event listener for mouse clicks/taps
window.addEventListener('click', burstHeart);

// Adjust on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
