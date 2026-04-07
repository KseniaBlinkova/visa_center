import { VisaDetailComponent } from "../../components/visa-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
// ИСПРАВЛЕНО: Путь через ../../ надежнее, если корень сайта не настроен строго
import { getMaxOnesSequence } from "../../src/utils/homework.js"; 

export class VisaPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    // МЕТОД getHTML УДАЛЕН. Он теперь берется из VisaDetailComponent.

    getData() {
        const visaData = {
            1: {
                title: "Туристическая виза",
                fullText: "Туристическая виза предназначена для краткосрочных поездок с целью отдыха или знакомства со страной. Обычно выдаётся на срок от двух недель до трёх месяцев и не разрешает вести в стране пребывания трудовую деятельность."
            },
            2: {
                title: "Деловая виза",
                fullText: "Деловая виза предназначена для участия в переговорах, конференциях или других рабочих мероприятиях. Для получения нужно предоставлять приглашение от принимающей компании. Виза может быть однократной или многократной."
            },
            3: {
                title: "Медицинская виза",
                fullText: "Медицинская виза выдаётся для прохождения лечения или медицинского обследования за рубежом. Требуется приглашение от медицинского учреждения, подтверждение диагноза и финансовые гарантии оплаты лечения."
            },
            4: {
                title: "Студенческая виза",
                fullText: "Студенческая виза выдаётся иностранным студентам для обучения в зарубежных образовательных учреждениях. Даёт право находиться в стране в течение всего срока обучения. Для получения необходимо подтверждение зачисления."
            },
            5: {
                title: "Виза по приглашению",
                fullText: "Виза по приглашению предназначена для посещения родственников или друзей по частному приглашению. Требуется нотариально заверенное приглашение от принимающей стороны и подтверждение родства."
            }
        };

        return visaData[this.id] || {
            title: "Информация о визе",
            fullText: "Подробная информация о данном типе визы. Обратитесь в консульство для уточнения деталей."
        };
    }

    clickBack() {
        this.parent.innerHTML = '';
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    init3D() {
        // Динамический импорт Three.js
        import('three').then(async (THREE) => {
            const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
            const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

            const container = document.getElementById('container-3d');
            if (!container) {
                console.error("Контейнер container-3d не найден в DOM!");
                return;
            }

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf8f9fa);

            const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 0, 7);

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.innerHTML = '';
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            scene.add(ambientLight);
            
            const sunLight = new THREE.DirectionalLight(0xffffff, 1);
            sunLight.position.set(5, 5, 5);
            scene.add(sunLight);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            const loader = new GLTFLoader();
            // Путь к модели должен быть от корня или относительно этого файла
            loader.load('../../models/planet.glb', (gltf) => {
                const model = gltf.scene;
                
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3()).length();
                const center = box.getCenter(new THREE.Vector3());

                model.position.x += (model.position.x - center.x);
                model.position.y += (model.position.y - center.y);
                model.position.z += (model.position.z - center.z);

                const scale = 6 / size;
                model.scale.set(scale, scale, scale);

                scene.add(model);

                const animate = () => {
                    requestAnimationFrame(animate);
                    model.rotation.y += 0.005; 
                    controls.update(); 
                    renderer.render(scene, camera);
                };
                animate();
            }, undefined, (error) => {
                console.error("Ошибка загрузки модели:", error);
            });
        });
    }

    render() {
        const data = this.getData();
        this.parent.innerHTML = ''; 

        // 1. Отрисовка кнопки "Назад"
        this.parent.insertAdjacentHTML('beforeend', '<div id="back-button-container" class="container mt-4 mb-3 ps-0"></div>');
        const backBtnContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backBtnContainer);
        backButton.render(() => this.clickBack());

        // 2. Отрисовка карточки через КОМПОНЕНТ
        // Важно: VisaDetailComponent должен содержать <div id="container-3d"></div>
        const detailComponent = new VisaDetailComponent(this.parent);
        detailComponent.render(data);

        // 3. Оживление 3D-планеты
        this.init3D(); 
    }
}