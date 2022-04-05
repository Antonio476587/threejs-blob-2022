import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import perlin from '../node_modules/perlin';
import animations from "./animations";

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(0.7, 80, 80)

// Materials

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.1
material.metalness = 0.1
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xeb1b6b, 1)
pointLight.position.x = -9
pointLight.position.y = -3
pointLight.position.z = 2
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x29034a, 1)
pointLight2.position.x = -1.5
pointLight2.position.y = 6
pointLight2.position.z = 3
scene.add(pointLight2)

const light1 = gui.addFolder("Light 1");

light1.add(pointLight.position, 'x', -10, 10, 0.5)
light1.add(pointLight.position, 'y', -3, 6, 0.1)
light1.add(pointLight.position, 'z', -10, 10, 0.5)

const light2 = gui.addFolder("Light 2");

light2.add(pointLight2.position, 'x', -10, 10, 0.5)
light2.add(pointLight2.position, 'y', -3, 6, 0.1)
light2.add(pointLight2.position, 'z', -10, 10, 0.5)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true, 
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const update = function() {

    // change '0.003' for more aggressive animation
    let time = performance.now() * 0.0006;
    
    //go through vertices here and reposition them
    
    // change 'k' value for more spikes
    let k = 2;

    const positionAttribute = sphere.geometry.getAttribute( 'position' );

    const vertex = new THREE.Vector3();

    const vertexList = [];

for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex ++ ) {

	vertex.fromBufferAttribute( positionAttribute, vertexIndex );
	// do something with vertex
    vertex.normalize().multiplyScalar(1 + 0.3 * perlin.noise.perlin3(vertex.x * k + time, vertex.y * k, vertex.z * k));
    vertexList.push(...vertex.toArray());

}
    const positions = new Float32Array(vertexList);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
  
  }

const clock = new THREE.Clock()

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;


const onDocumentMouseMove = function(e) {
    mouseX = (e.clientX - windowX);
    mouseY = (e.clientY - windowY);
}

globalThis.addEventListener("mousemove", onDocumentMouseMove)


const tick = () =>
{
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .001 * elapsedTime

    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .3 * (targetX - sphere.rotation.y)

    // Vertex update
    update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()