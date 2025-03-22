import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export function initThreeScene(containerId) {
    let scene, camera, renderer, controls, particles;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff83df);

    // Obtener el contenedor y verificar que exista
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return;
    }

    // Usar dimensiones de la ventana como respaldo si el contenedor no tiene dimensiones
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) {
        console.warn('El contenedor no tiene dimensiones válidas, usando dimensiones de la ventana como respaldo.');
    }

    // Configurar la cámara con un fov más bajo para menos distorsión
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);

    // Cargar modelo GLB
    const loader = new GLTFLoader();
    loader.load(
        '/flowers.glb',
        function (gltf) {
            scene.add(gltf.scene);
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            gltf.scene.position.sub(center);

            // Text
            const textureLoader = new THREE.TextureLoader();
            const textTexture = textureLoader.load('/Text.svg');
            const textMaterial = new THREE.MeshBasicMaterial({
                map: textTexture,
                transparent: true
            });
            const textGeometry = new THREE.PlaneGeometry(3, 1); // Ajusta el tamaño según el modelo
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(0, size.y / 2 + 0.5, 0); // Posición sobre el modelo
            scene.add(textMesh);

            // Text footer
            const footerTexture = textureLoader.load('/Text-footer.svg'); // Carga el SVG del footer
            const footerMaterial = new THREE.MeshBasicMaterial({
                map: footerTexture,
                transparent: true
            });
            const footerGeometry = new THREE.PlaneGeometry(3, 1); // Tamaño del plano para el texto inferior
            const footerMesh = new THREE.Mesh(footerGeometry, footerMaterial);
            footerMesh.position.set(0, -size.y / 2 - 0.5, 0); // Posición debajo del modelo
            scene.add(footerMesh);

        undefined,
        function (error) {
            console.error('Error al cargar el modelo GLB:', error);
        }
    }
    );

    // Crear partículas de corazones
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const textureLoader = new THREE.TextureLoader();
    const heartTexture = textureLoader.load('/Heart.svg');
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        map: heartTexture,
        transparent: true,
        alphaTest: 0.5,
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    function onWindowResize() {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize, false);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        // Actualizar posiciones de las partículas
        const positionsArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < positionsArray.length; i += 3) {
            positionsArray[i + 1] += 0.01; // Mover hacia arriba
            if (positionsArray[i + 1] > 5) {
                positionsArray[i + 1] = -5; // Reiniciar posición
            }
            positionsArray[i] += (Math.random() - 0.5) * 0.005; // Desplazamiento aleatorio en x
            positionsArray[i + 2] += (Math.random() - 0.5) * 0.005; // Desplazamiento aleatorio en z
        }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }
    animate();
}