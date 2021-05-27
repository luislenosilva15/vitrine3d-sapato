import {GLTFLoader} from "./Imports/GLTFLoader.js"
import {OrbitControls} from "./Imports/OrbitControls.js"

let camera, scene, renderer, loader, model, controller ;

scene = new THREE.Scene();

scene.background = new THREE.Color( 0x989898 );

scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );

loader = new GLTFLoader();

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000.00 );

render();
init();
rotateCamera();

function init() {

    //Light
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 5, 0 );
        scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 4, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        scene.add( dirLight );

    const dirLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight2.color.setHSL( 0.1, 1, 0.95 );
        dirLight2.position.set( 4.5, 3.75, 1 );
        dirLight2.position.multiplyScalar( 30 );
        scene.add( dirLight2 );

    //Import GLTF
    loader.load("models3d/scene.gltf", function(gltf){
        model = gltf.scene;
        model.scale.set(1,1,1);
        model.position.set(0,-0.5,0);
        scene.add(model);

    });
  camera.position.set(2,2,4);
}

function render() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
}

function rotateCamera() {

    controller = new OrbitControls(camera, renderer.domElement);
    controller.enableDamping = true; 
  //  controller.dampingFactor = 0.05;
    //controller.maxPolarAngle = Math.PI / 2;
    controller.enableZoom = true;
    controller.enabled = true;

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera); 
    controller.update();



}

animate();