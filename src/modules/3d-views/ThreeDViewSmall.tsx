import Script from 'next/script';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {gsap} from 'gsap';
import {MeshStandardMaterial} from 'three';
import * as TWEEN from '@tweenjs/tween.js';
// import {convertArray} from 'three/src/animation/animationutils';
import {defaultSettings, modeldata, pathModel} from 'utils/conway-machines';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {TProduct} from '_types/types';

const ThreeDViewSmall = ({product}: {product: TProduct}) => {
  const router = useRouter();
  const params = router.query;
  const project = params?.project;
  // Canvas
  const canvasRef = useRef<any>(null);
  var loadedobject: any;

  useEffect(() => {
    let canvas = canvasRef.current;
    let isClicked = false;
    let labelRenderer: any;
    let isModalOpen = false;
    var fov = defaultSettings['camera'][0].fov;
    var near = defaultSettings['camera'][0].near;
    var far = defaultSettings['camera'][0].far;
    /**
     * Loader
     */

    const loadingManager = new THREE.LoadingManager(
      // Loaded callback
      () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, {duration: 1, value: 0});
        // Hide the loading screen
        document.getElementById('spinner')!.style.display = 'none';
        document.getElementById('fullscreen-overlay')!.style.display = 'none';
      },
      (url, itemsLoaded, itemsTotal) => {
        // Update the progress bar
        const progressRatio = itemsLoaded / itemsTotal;
      }
    );
    loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      document.getElementById('spinner')!.style.display = 'block';
      document.getElementById('fullscreen-overlay')!.style.display = 'block';
    };

    // Hide spinner once everything has finished loading
    loadingManager.onLoad = function () {
      document.getElementById('spinner')!.style.display = 'none';
      document.getElementById('fullscreen-overlay')!.style.display = 'none';
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/static/draco/');
    const gltfLoaderModal = new GLTFLoader();
    gltfLoaderModal.setDRACOLoader(dracoLoader);
    // gltfLoader.setDRACOLoader(dracoLoader)
    dracoLoader.preload();
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    var mDragging = false;
    var mDown = false;

    window.addEventListener('mousedown', function () {
      // mDown = true;
    });
    window.addEventListener('mousemove', function () {
      // if (mDown) {
      //   mDragging = true;
      // }
    });
    window.addEventListener('mouseup', function () {
      // If not dragging, then it's a click!
      // mouseUp();
      // // Reset variables
      // mDown = false;
      // mDragging = false;
    });

    /**
     * Base
     */
    // Debug
    // const gui = new dat.GUI()
    const debugObject: any = {};

    debugObject.envMapIntensity = 2;
    // gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(()=>{
    //     updateAllMaterials()
    // })

    // Scene
    const scene = new THREE.Scene();
    const sceneModal = new THREE.Scene();

    const overlayMaterial = new THREE.ShaderMaterial({
      // wireframe: true,
      transparent: true,
      uniforms: {
        uAlpha: {value: 0.8},
      },
      vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
      fragmentShader: `
            uniform float uAlpha;
    
            void main()
            {
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `,
    });
    // const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    // scene.add(overlay)
    /**
     * Update all materials
     */
    const updateAllMaterials = () => {
      scene.traverse(child => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.frustumCulled = false;
          child.material.envMap = environmentMap;
          child.material.dispose();
          child.geometry.dispose();
          child.material.envMapIntensity = 2;
          child.material.roughness = 0.3;
          child.material.metalness = 0;
          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    };

    /**
     * Environment map
     */
    const environmentMap = cubeTextureLoader.load([
      '/static/textures/Studio1/px.png',
      '/static/textures/Studio1/nx.png',
      '/static/textures/Studio1/py.png',
      '/static/textures/Studio1/ny.png',
      '/static/textures/Studio1/pz.png',
      '/static/textures/Studio1/nz.png',
    ]);
    const colorEnv = new THREE.Color('#FfFfFf');
    environmentMap.encoding = THREE.sRGBEncoding;

    scene.environment = environmentMap;
    scene.background = colorEnv;
    const environmentMapModal = cubeTextureLoader.load([
      '/static/textures/Studio1/px.png',
      '/static/textures/Studio1/nx.png',
      '/static/textures/Studio1/py.png',
      '/static/textures/Studio1/ny.png',
      '/static/textures/Studio1/pz.png',
      '/static/textures/Studio1/nz.png',
    ]);
    environmentMapModal.encoding = THREE.sRGBEncoding;

    sceneModal.background = colorEnv;
    sceneModal.environment = environmentMapModal;
    const sizes = {
      width: 833,
      height: 659,
    };

    const camera = new THREE.PerspectiveCamera(fov, 833 / 659, near, far);
    // camera.position.set(1.1, 0.6, 1.825)
    // camera.position.setLength(1.8);

    // camera.view.
    scene.add(camera);

    const directionalLight = new THREE.DirectionalLight('#6cbbff', 0.305);
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -5;
    directionalLight.shadow.camera.top = 5;
    directionalLight.shadow.camera.right = 5;
    directionalLight.shadow.camera.bottom = 5;
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLightModal = new THREE.DirectionalLight('#6cbbff', 0.305);
    directionalLightModal.shadow.camera.near = 0.1;
    directionalLightModal.shadow.camera.far = 100;
    directionalLightModal.shadow.camera.left = -5;
    directionalLightModal.shadow.camera.top = 5;
    directionalLightModal.shadow.camera.right = 5;
    directionalLightModal.shadow.camera.bottom = 5;
    directionalLightModal.shadow.camera.far = 15;
    directionalLightModal.shadow.mapSize.set(1024, 1024);
    directionalLightModal.castShadow = true;
    scene.add(directionalLightModal);

    var target = new THREE.Object3D();
    scene.add(target);
    target.position.set(-1, 0.7, 0);
    target.rotation.set(Math.PI, 0, 0);
    directionalLight.target = target;
    target.updateMatrixWorld();
    scene.add(directionalLight.target);

    const pointlight2: any = new THREE.PointLight('#c7ccff', 1);
    pointlight2.shadow.camera.near = 0.1;
    pointlight2.shadow.camera.far = 1;
    pointlight2.shadow.camera.left = -1;
    pointlight2.shadow.camera.top = 1;
    pointlight2.shadow.camera.right = 1;
    pointlight2.shadow.camera.bottom = 1;
    pointlight2.shadow.camera.far = 15;
    pointlight2.shadow.mapSize.set(1024, 1024);
    scene.add(pointlight2);
    const pointlight: any = new THREE.PointLight('#ffe0b5', 0.96);
    pointlight.shadow.camera.near = 0.1;
    pointlight.shadow.camera.far = 1;
    pointlight.shadow.camera.left = -1;
    pointlight.shadow.camera.top = 1;
    pointlight.shadow.camera.right = 1;
    pointlight.shadow.camera.bottom = 1;
    pointlight.shadow.camera.far = 15;
    pointlight.shadow.mapSize.set(1024, 1024);
    scene.add(pointlight);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: true,
    });
    labelRenderer = new CSS2DRenderer();

    sizes.width = 530;
    sizes.height = 380;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.95, 2));
    // renderer.setSize(500,350)

    var clock: any, mixer: any;
    clock = new THREE.Clock();

    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', event => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / sizes.height) * 2 + 1;
      // ////(mouse)
    });

    var raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(-3, 0, 0);
    const rayDirection = new THREE.Vector3(10, 0, 0);
    // raycaster.layers.set( 5 );
    rayDirection.normalize();

    // raycaster.set(rayOrigin, rayDirection)
    
    var intersects: any;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // animate();

    dracoLoader.setDecoderPath('/draco/');

    // const loader = new OBJLoader();
    const loader = new GLTFLoader(loadingManager);
    loader.setDRACOLoader(dracoLoader);
    var shadowMaterial: any = new THREE.ShadowMaterial();
    var planeGeometry = new THREE.PlaneGeometry(200, 200);
    var standardMaterial = new THREE.ShadowMaterial({
      color: colorEnv,
      transparent: true,
    });
    standardMaterial.opacity = 0.1;
    shadowMaterial.blur = 5;

    standardMaterial.name = 'Floor';
    // var planeMaterial = new THREE.ShadowMaterial()
    // planeMaterial.opacity=0.02

    // create the plane
    var plane = new THREE.Mesh(planeGeometry, standardMaterial);
    // position the plane at the center of the canvas
    plane.position.set(0, -0.2, 0);
    // rotate the plane to match the canvas orientation
    plane.rotation.x = -Math.PI / 2;
    // set the plane to receive shadows
    plane.receiveShadow = true;
    plane.customDepthMaterial = shadowMaterial;

    // add the plane to the scene
    scene.add(plane);
    //(plane);
    var shadowModalMaterial: any = new THREE.ShadowMaterial();
    var planeModalGeometry = new THREE.PlaneGeometry(200, 200);
    var standardModalMaterial: any = new THREE.ShadowMaterial({
      color: colorEnv,
      transparent: true,
    });
    standardModalMaterial.opacity = 0.1;
    shadowModalMaterial.blur = 5;

    standardMaterial.name = 'Floor';
    // var planeMaterial = new THREE.ShadowMaterial()
    // planeMaterial.opacity=0.02

    // create the plane
    var planeModal = new THREE.Mesh(planeModalGeometry, standardModalMaterial);
    // position the plane at the center of the canvas
    planeModal.position.set(0, -0.2, 0);
    // roModaltate the plane to match the canvas orientation
    planeModal.rotation.x = -Math.PI / 2;
    // seModalt the plane to receive shadows
    planeModal.receiveShadow = true;
    planeModal.customDepthMaterial = shadowModalMaterial;

    const parent = new THREE.Object3D();
    scene.add(parent);
    var path = pathModel['path'][0].path;
    var model = pathModel['path'][0].model;
    var type = pathModel['path'][0].type;

    loader.load(
      // resource URL
      // process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
      // product['3d_file']?.media?.path,
      path + model + type,
      // called when resource is loaded
      function (object) {
        loadedobject = object.scene;

        let mat = new THREE.MeshLambertMaterial({
          color: 0xff0000,
        });
        let boxGeom = new THREE.BoxGeometry(1, 1, 1);
        let cube = new THREE.Mesh(boxGeom, mat);
        cube.name = 'newCUBE';
        cube.position.set(3, 1, 0);
        cube.scale.set(2, 2, 2);
        cube.material.fog = false;
        // scene.current.add(cube);
        var mainBounds = new THREE.Box3().setFromObject(cube);

        let bbox = new THREE.Box3().setFromObject(object.scene);
        let newBounds = new THREE.Box3().setFromObject(object.scene);

        let lengthSceneBounds = {
          x: Math.abs(mainBounds.max.x - mainBounds.min.x),
          y: Math.abs(mainBounds.max.y - mainBounds.min.y),
          z: Math.abs(mainBounds.max.z - mainBounds.min.z),
        };
        let lengthMeshBounds = {
          x: Math.abs(newBounds.max.x - newBounds.min.x),
          y: Math.abs(newBounds.max.y - newBounds.min.y),
          z: Math.abs(newBounds.max.z - newBounds.min.z),
        };

        // Calculate length ratios
        let lengthRatios = [
          lengthSceneBounds.x / lengthMeshBounds.x,
          lengthSceneBounds.y / lengthMeshBounds.y,
          lengthSceneBounds.z / lengthMeshBounds.z,
        ];

        // Select smallest ratio in order to contain the model within the scene
        let minRatio = Math.min(...lengthRatios);

        // If you need some padding on the sides
        let padding = 0;
        minRatio -= padding;
        // Use smallest ratio to scale the model
        object.scene.scale.set(minRatio, minRatio, minRatio);
        // Set the scale of the object

        const box: any = new THREE.Box3().setFromObject(object.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        // Calculate the scale factor for each dimension
        const scaleFactor = 1 / maxDimension;
        // Set the scale of the object

        const distance = Math.max(size.x, size.y, size.z) * 1.25;
        pointlight.position.set(box.min.x, box.max.y, box.min.z);
        controls.target.set(center.x, center.y, center.z);
        pointlight2.position.set(box.max.x, box.min.y, box.min.z);
        directionalLight.position.set(box.x + 1, box.y, box.z);
        // Set camera position and look at center of object
        camera.position.set(
          center.x + distance,
          center.y + distance / 2,
          center.z + distance
        );
        // Adjust camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.lookAt(center);

        camera.updateProjectionMatrix();

        // object.material.name="dadaad"

        parent.add(object.scene);
        scene.add(object.scene);

        updateAllMaterials();
      }
    );

    /**
     * SVG
     */

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    var zoomend;
    zoomend = 4;

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv!.style.color = '#ffffff';
    earthDiv!.style.background = '#000000cc';
    earthDiv!.style.width = '200px';
    earthDiv!.style.borderRadius = '5em';
    earthDiv!.style.fontSize = '18px';
    earthDiv!.style.lineHeight = '0.8';
    earthDiv!.style.padding = '1em';
    const earthLabel = new CSS2DObject(earthDiv);

    function mouseUp() {
      if (mDragging === false && !isModalOpen) {
        intersects = raycaster.intersectObjects(loadedobject.children);
        // intersects[0].object.material.emissive.set('#ffcb06')
        // scene.remove(earthLabel)
        if (intersects[0] == undefined) {
          isClicked = false;
          // clickedMesh = null;
          scene.remove(earthLabel);
        } else {
          if (isClicked && intersects[0]) {
            // isClicked = false

            // clickedMesh = null
            scene.traverse(function (child: any) {
              if (child.material instanceof MeshStandardMaterial) {
                child.material.emissive.set('#f1e204');
                child.material.opacity = 0.1;
                intersects[0].object.material.emissive.set('#f1e204');
                intersects[0].object.material.color.setHex('#f1e204');

                intersects[0].object.material.opacity = 1;
                scene.add(earthLabel);
              }
            });
          }
        }
      }
    }

    /**
     * Camera
     */
    // Base camera

    const controls = new OrbitControls(camera, canvas);
    controls.minDistance = -1000;
    controls.maxDistance = 4.4;
    controls.enableDamping = true;
    controls.addEventListener('start', () => {});

    controls.addEventListener('end', ev => {
      intersects = raycaster.intersectObjects(loadedobject.children);
      // clickedMesh = null
    });

    /**
     * Renderer
     */

    let hex;

    let sprite;
    const spriteMaterial = new THREE.SpriteMaterial({
      alphaTest: 0.5,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(250, 250, 250);
    sprite.scale.set(60, 60, 1);
    scene.add(sprite);

    const tick = () => {
      // Update controls
      controls.update();
      raycaster.set(rayOrigin, rayDirection);
      // annotation = document.getElementById('annotation');

      // Render
      renderer.render(scene, camera);
      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
      raycaster.setFromCamera(mouse, camera);

      hex = modeldata['conway-machines'][0].hex;
    };

    tick();

    var id;

    function animate() {
      id = requestAnimationFrame(animate);

      var delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      TWEEN.update();
      labelRenderer.render(scene, camera);
      renders();
    }

    function renders() {
      const time = Date.now() * 0.0005;

      renderer.render(scene, camera);
    }
  }, [product]);

  const highLightpart = (loadedobject: any) => {
    if (loadedobject) {
      loadedobject.traverse(function (child: any) {
        if (child.material instanceof MeshStandardMaterial) {
          child.material.emissive.set('#000000');
          child.material.opacity = 1;
          // child.visible = true
          child.material.transparent = true;
          // buttonLabel.visible=false
          // buttonDiv!.style.display="None"
          document.body!.style.cursor = 'default';
        }
      });
    }
  };

  return (
    <div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.0.5/gsap.min.js"></Script>
      <div id="loadingModal" className="modals">
        <div className="modal-dialog">
          <div className="modal-contents">
            <div className="modal-body">
              <div className="spinner-border" role="status">
                <div className="loader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div onMouseOver={() => highLightpart(loadedobject)}>
        <canvas
          ref={canvasRef}
          className="webgl relative"
          id="canvas1"
        ></canvas>
      </div>
      <div id="fullscreen-overlay">
        <p className="loadingtypo" id="typo">
          Loading...
        </p>
        <div id="spinner"></div>
      </div>
    </div>
  );
};

export default ThreeDViewSmall;
