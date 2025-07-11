const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const eases = require("eases");
const BezierEasing = require("bezier-easing");
import * as THREE from 'three';


// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const settings = {
  // Make the loop animated
  animate: true,
  // dimensions: [512, 512],
  // dimensions: [1080,2408],
  dimensions:[1080,1920],
  fps: 24,
  duration: 4,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attribute: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    // canvas: context.canvas
    context
  });

  // WebGL background color
  renderer.setClearColor( "lightgrey", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();


  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1,32, 16);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "red",
  //   // wireframe: true
  // });

  const palette = random.pick(palettes);
  // Setup a mesh with geometry + material
  for (let i = 0; i < 40; i++) {

    const mesh = new THREE.Mesh(
      geometry,  
      new THREE.MeshStandardMaterial({
        color: random.pick(palette),
      })
    );
    
  mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1));
    
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.multiplyScalar(0.6);
    scene.add(mesh);

  }

  scene.add(new THREE.AmbientLight('hsl(90, 0%, 40%)'));

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(70, 100, 0);
  scene.add(light);

  
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      // camera.aspect = viewportWidth / viewportHeight;
      
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.0;
      
      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;
      
      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
      
    },
    // Update & render your scene here
    render({playhead }) {
      const easefn= BezierEasing(.67,0,.29,1.01);
      let t = Math.sin(playhead *Math.PI * 2);
      scene.rotation.y =easefn(t);

      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {

      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
