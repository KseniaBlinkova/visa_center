import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
// Добавляем OrbitControls для вращения мышкой
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

export class PlanetComponent {
    constructor(parent) {
        this.parent = parent;
        this.model = null;
        this.controls = null;
    }
    
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.parent.clientWidth / this.parent.clientHeight, 0.1, 1000);
        this.camera.position.set(2, 1.5, 3); 

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.parent.appendChild(this.renderer.domElement);

        // Включаем вращение мышкой
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; 

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 2);
        dirLight.position.set(5, 5, 5);
        this.scene.add(dirLight);

        const loader = new GLTFLoader();
        loader.load('../../models/planet.glb', (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);
            this.animate();
        });
    }

    setView(view) {
        if (!this.controls || !this.camera) return;

        // Сбрасываем фокус камеры в центр модели
        this.controls.target.set(0, 0, 0);

        switch(view) {
            case 'front': this.camera.position.set(0, 0, 5); break;
            case 'back':  this.camera.position.set(0, 0, -5); break;
            case 'left':  this.camera.position.set(-5, 0, 0); break;
            case 'right': this.camera.position.set(5, 0, 0); break;
        }

        // ВАЖНО: обновляем контроллер, чтобы он зафиксировал новую позицию
        this.controls.update();
    }
    zoomIn() { if (this.model) this.model.scale.multiplyScalar(1.1); }
    zoomOut() { if (this.model) this.model.scale.multiplyScalar(0.9); }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) this.controls.update(); // Нужно для работы OrbitControls
        this.renderer.render(this.scene, this.camera);
    }
}




