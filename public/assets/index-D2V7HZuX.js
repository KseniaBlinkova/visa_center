import*as d from"https://unpkg.com/three@0.157.0/build/three.module.js";import{GLTFLoader as b}from"https://unpkg.com/three@0.157.0/examples/jsm/loaders/GLTFLoader.js";import{OrbitControls as g}from"https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();class v{constructor(t){this.parent=t}getHTML(t){return`
            <button class="btn btn-outline-danger btn-sm" id="del-${t}" 
                style="width: 100%; height: 32px; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center; white-space: nowrap;">
                Удалить
            </button>`}render(t,e){this.parent.innerHTML=this.getHTML(t);const i=document.getElementById(`del-${t}`);i&&(i.onclick=n=>{n.stopPropagation(),e(t)})}}class f{constructor(t){this.parent=t}getMaxApprovalSeries(t){return t?Math.max(...t.split("0").map(e=>e.length)):0}merge(...t){const e={};if(t.length===0)return e;let i=0;do{const n=t[i];for(const s in n)n.hasOwnProperty(s)&&!(s in e)&&(e[s]=n[s]);i++}while(i<t.length);return e}getHTML(t){const e=t.reqCode||"0",i=this.getMaxApprovalSeries(e),n=e.length,s={passport:"Загранпаспорт",photo:"Фото"},o=t.extraDocs||{insurance:"Страховка"},c=this.merge(s,o),h=Object.values(c).join(", ");return`
            <div class="col" id="visa-card-${t.id}">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    <img src="${t.src}" class="card-img-top" alt="${t.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        
                        <div class="d-flex justify-content-between align-items-start mb-2" style="min-height: 3rem;">
                            <h5 class="card-title" style="color: #3242AA; font-weight: bold; margin: 0; font-size: 1.1rem; line-height: 1.2;">
                                ${t.title}
                            </h5>
                            <span class="badge bg-success" title = "Cерия одобрений" style="font-size: 0.8rem; white-space: nowrap; margin-left: 5px;">
                                ${i} из ${n}
                            </span>
                        </div>
                        
                        <p class="card-text text-muted mb-3" style="font-size: 0.9rem; min-height: 2rem; line-height: 1.4;">
                            ${t.text}
                        </p>
                        
                        <div class="mb-3">
                            <small class="text-primary fw-bold" style="font-size: 0.7rem; text-transform: uppercase;">Документы:</small><br>
                            <small class="text-muted" style="font-size: 0.85rem; line-height: 1.2; display: block; min-height: 2.2rem;">
                                ${h}
                            </small>
                        </div>

                        <!-- КНОПКИ: СТРОГО В ОДНУ СТРОКУ, ОДИНАКОВАЯ ВЫСОТА 32px -->
                        <div class="d-flex align-items-center mt-auto" style="gap: 4px; width: 100%;">
                            <button class="btn btn-primary btn-sm details-btn" 
                                    style="flex: 1; height: 32px; white-space: nowrap; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                                Подробнее
                            </button>
                            
                            <button class="btn btn-secondary btn-sm edit-btn" 
                                    id="edit-btn-${t.id}" 
                                    style="flex: 1; height: 32px; white-space: nowrap; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                                Изменить
                            </button>
                            
                            <div id="del-btn-container-${t.id}" style="flex: 1; height: 32px;">
                                <!-- Сюда рендерится ButtonDelete -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t,e,i,n){this.parent.insertAdjacentHTML("beforeend",this.getHTML(t));const s=document.getElementById(`visa-card-${t.id}`);if(s){s.querySelector(".details-btn").onclick=e;const c=s.querySelector(".edit-btn");c&&(c.onclick=h=>{h.stopPropagation(),n(t.id)})}const o=document.getElementById(`del-btn-container-${t.id}`);o&&new v(o).render(t.id,i)}}class y{constructor(t,e){this.parent=t,this.onSearch=e}getHTML(){return`
            <div class="d-flex align-items-center gap-2" style="flex-wrap: nowrap;">
                <!-- 1. Добавили flex-wrap: nowrap, чтобы кнопки никогда не уезжали вниз -->
                
                <div id="search-group" class="input-group" 
                    style="max-width: 400px; flex-grow: 1; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s;">
                    <!-- 2. Добавили flex-grow: 1, чтобы инпут был гибким и сжимался первым -->
                    
                    <span class="input-group-text bg-white border-0">🔍</span>
                    
                    <input type="text" id="search-input" class="form-control border-0" 
                        placeholder="Поиск визы..." style="box-shadow: none;">
                </div>

                <!-- 3. Обернули кнопки в контейнер с flex-shrink: 0, чтобы они не сжимались и не ломались -->
                <div class="d-flex gap-2" style="flex-shrink: 0;">
                    <button class="btn text-white px-4" type="button" id="search-btn" 
                        style="background-color: #3242AA; border-radius: 8px; border: none; white-space: nowrap;">
                        Найти
                    </button>

                    <button class="btn btn-outline-secondary" type="button" id="clear-btn" 
                        style="border-radius: 8px; white-space: nowrap;">
                        Сбросить
                    </button>
                </div>
            </div>
        `}render(){this.parent.innerHTML=this.getHTML();const t=document.getElementById("search-input"),e=document.getElementById("search-group"),i=document.getElementById("search-btn"),n=document.getElementById("clear-btn");t.onfocus=()=>{e.style.borderColor="#86b7fe",e.style.boxShadow="0 0 0 0.25rem rgba(13, 110, 253, 0.25)"},t.onblur=()=>{e.style.borderColor="#dee2e6",e.style.boxShadow="none"},i.onclick=()=>this.onSearch(t.value),n.onclick=()=>{t.value="",this.onSearch("")},t.onkeypress=s=>{s.key==="Enter"&&this.onSearch(t.value)}}}class w{constructor(t){this.parent=t}getHTML(){return'<button id="add-visa-btn" class="btn btn-success" style="white-space: nowrap; background-color: #3242AA; border: none; ">+ Добавить визу</button>'}render(t){this.parent.innerHTML=this.getHTML(),document.getElementById("add-visa-btn").addEventListener("click",t)}}class x{constructor(t){this.parent=t,this.model=null,this.controls=null}init(){this.scene=new d.Scene,this.camera=new d.PerspectiveCamera(45,this.parent.clientWidth/this.parent.clientHeight,.1,1e3),this.camera.position.set(2,1.5,3),this.renderer=new d.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setSize(this.parent.clientWidth,this.parent.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.parent.appendChild(this.renderer.domElement),this.controls=new g(this.camera,this.renderer.domElement),this.controls.enableDamping=!0;const t=new d.AmbientLight(16777215,1);this.scene.add(t);const e=new d.DirectionalLight(16777215,2);e.position.set(5,5,5),this.scene.add(e),new b().load("../../models/planet.glb",n=>{this.model=n.scene,this.scene.add(this.model),this.animate()})}setView(t){if(!(!this.controls||!this.camera)){switch(this.controls.target.set(0,0,0),t){case"front":this.camera.position.set(0,0,5);break;case"back":this.camera.position.set(0,0,-5);break;case"left":this.camera.position.set(-5,0,0);break;case"right":this.camera.position.set(5,0,0);break}this.controls.update()}}zoomIn(){this.model&&this.model.scale.multiplyScalar(1.1)}zoomOut(){this.model&&this.model.scale.multiplyScalar(.9)}animate(){requestAnimationFrame(()=>this.animate()),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera)}}class E{async get(t){const e=await fetch(t);if(!e.ok)throw new Error(`Ошибка GET: ${e.status}`);return await e.json()}async post(t,e){return await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}async patch(t,e){const i=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)throw new Error(`Ошибка PATCH: ${i.status}`);return await i.json()}async delete(t){const e=await fetch(t,{method:"DELETE"});if(!e.ok)throw new Error(`Ошибка DELETE: ${e.status}`);return e.status===204?null:await e.json()}}const m=new E;class L{constructor(){this.baseUrl="http://localhost:3005"}getVisas(){return`${this.baseUrl}/visas`}getVisaById(t){return`${this.baseUrl}/visas/${t}`}removeVisaById(t){return`${this.baseUrl}/visas/${t}`}updateVisaById(t){return`${this.baseUrl}/visas/${t}`}}const a=new L;class B{constructor(t,e){this.parent=t,this.id=e,this.data=null}getHTML(t){return`
            <div class="container mt-4">
                <div class="mb-3">
                    <button id="back-btn" class="btn btn-outline-secondary btn-sm">← Вернуться к списку</button>
                </div>
                <div class="card shadow-sm border-0">
                    <div class="row g-0">
                        <div class="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center" style="min-height: 450px;">
                            <div id="planet-container" style="width: 100%; height: 350px;"></div>
                            
                            <div class="btn-group btn-group-sm mb-3" role="group">
                                <button id="view-front" class="btn btn-outline-primary">Вид спереди</button>
                                <button id="view-back" class="btn btn-outline-primary">Сзади</button>
                                <button id="view-left" class="btn btn-outline-primary">Слева</button>
                                <button id="view-right" class="btn btn-outline-primary">Справа</button>
                                <button id="zoom-in" class="btn btn-primary">+</button>
                                <button id="zoom-out" class="btn btn-primary">-</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card-body p-4">
                                <h2 class="fw-bold" style="color: #3242AA;">${t.title}</h2>
                                <p class="lead mt-3" style="color: #444;">${t.fullDescription||"Описание уточняется..."}</p>
                                <hr>
                                <p><strong>Срок оформления:</strong> ${t.term||"не указан"}</p>
                                <div class="alert alert-info mt-3">
                                    <small><strong>Инструкция:</strong> Для вращения используйте мышь. Кнопки меняют ракурс.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`}async render(){this.parent.innerHTML=`
            <div class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Загрузка 3D-модели и данных...</p>
            </div>`;try{const t=await m.get(a.getVisaById(this.id));this.data=t,this.parent.innerHTML=this.getHTML(t),document.getElementById("back-btn").onclick=()=>window.renderPage(l),this.initPlanet()}catch(t){this.parent.innerHTML=`
                <div class="container mt-5 text-center">
                    <div class="alert alert-danger">Ошибка: данные не получены (${t.message})</div>
                    <button class="btn btn-primary" id="error-back-btn">Вернуться на главную</button>
                </div>`,document.getElementById("error-back-btn").onclick=()=>window.renderPage(l)}}initPlanet(){const t=document.getElementById("planet-container");if(t){const e=new x(t);e.init(),document.getElementById("view-front").onclick=()=>e.setView("front"),document.getElementById("view-back").onclick=()=>e.setView("back"),document.getElementById("view-left").onclick=()=>e.setView("left"),document.getElementById("view-right").onclick=()=>e.setView("right"),document.getElementById("zoom-in").onclick=()=>e.zoomIn(),document.getElementById("zoom-out").onclick=()=>e.zoomOut()}}}class u{constructor(t,e){this.parent=t,this.id=e}getHTML(t){return`
            <div class="container mt-4">
                <div class="card shadow p-4">
                    <h2 class="mb-4" style="color: #3242AA;">Редактирование визы</h2>
                    
                    <!-- Контейнер для уведомлений об успехе или ошибке -->
                    <div id="message-container"></div>

                    <form id="edit-visa-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Название визы</label>
                            <input type="text" class="form-control" id="title-input" value="${t.title||""}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Краткое описание (карточка)</label>
                            <input type="text" class="form-control" id="text-input" value="${t.text||""}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Полное описание (подробная страница)</label>
                            <textarea class="form-control" id="desc-input" rows="4">${t.fullDescription||""}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Срок оформления</label>
                            <input type="text" class="form-control" id="term-input" value="${t.term||""}">
                        </div>
                        
                        <div class="d-flex gap-3 mt-4">
                            <button type="button" id="save-btn" class="btn btn-success px-4 d-flex align-items-center gap-2">
                                <span id="save-btn-text">Сохранить изменения</span>
                                <span id="save-btn-spinner" class="spinner-border spinner-border-sm d-none" role="status"></span>
                            </button>
                            <button type="button" id="cancel-btn" class="btn btn-secondary">Отменить</button>
                        </div>
                    </form>
                </div>
            </div>`}async render(){this.parent.innerHTML=`
            <div class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Загрузка данных формы...</p>
            </div>`;try{const t=await m.get(a.getVisaById(this.id));this.parent.innerHTML=this.getHTML(t),document.getElementById("save-btn").onclick=()=>this.saveData(),document.getElementById("cancel-btn").onclick=()=>window.renderPage(l)}catch(t){this.parent.innerHTML=`
                <div class="container mt-5">
                    <div class="alert alert-danger">Ошибка загрузки данных: ${t.message}</div>
                    <button class="btn btn-primary" onclick="window.renderPage(MainPage)">Вернуться на главную</button>
                </div>`}}async saveData(){const t=document.getElementById("save-btn"),e=document.getElementById("save-btn-text"),i=document.getElementById("save-btn-spinner"),n=document.getElementById("message-container"),s={title:document.getElementById("title-input").value,text:document.getElementById("text-input").value,fullDescription:document.getElementById("desc-input").value,term:document.getElementById("term-input").value};t.disabled=!0,e.textContent="Сохранение...",i.classList.remove("d-none"),n.innerHTML="";try{await m.patch(a.updateVisaById(this.id),s),n.innerHTML=`
                <div class="alert alert-success show" role="alert">
                    ✨ Данные успешно обновлены! Возвращаемся на главную...
                </div>`,setTimeout(()=>{window.renderPage(l)},1500)}catch(o){n.innerHTML=`
                <div class="alert alert-danger" role="alert">
                    ❌ Ошибка при сохранении: ${o.message}
                </div>`,t.disabled=!1,e.textContent="Сохранить изменения",i.classList.add("d-none")}}}class l{constructor(t){this.parent=t,this.visaData=[]}async getData(t=""){const e=document.getElementById("visa-list");e&&(e.innerHTML='<div class="text-center w-100"><div class="spinner-border text-primary"></div></div>');const i=t?`${a.getVisas()}?title=${encodeURIComponent(t)}`:a.getVisas();try{const n=await m.get(i);this.visaData=n,this.renderCards(this.visaData)}catch(n){e&&(e.innerHTML=`<div class="alert alert-danger w-100">Ошибка загрузки: ${n.message}</div>`)}}getHTML(){return`
            <div class="container mt-3">
                <div class="row align-items-center g-3 mb-4">
                    <div class="col-auto">
                        <h4 class="mb-0" style="color: #3242AA; font-weight: bold; white-space: nowrap;">
                            Виды виз
                        </h4>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <div id="search-placeholder" style="width: 100%; max-width: 550px;"></div>
                    </div>
                    <div class="col-auto text-end">
                        <div id="add-btn-placeholder"></div>
                    </div>
                </div>
                <hr>
                <div id="visa-list" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 p-3"></div>
            </div>
        `}async deleteVisa(t){if(confirm("Вы уверены, что хотите удалить эту визу?"))try{await m.delete(a.getVisaById(t)),await this.getData()}catch(e){console.error("Ошибка при удалении:",e)}}renderCards(t){const e=document.getElementById("visa-list");if(e){if(e.innerHTML="",t.length===0){e.innerHTML='<div class="text-center w-100">Ничего не найдено</div>';return}t.forEach(i=>{new f(e).render(i,()=>window.renderPage(B,i.id),s=>this.deleteVisa(s),s=>window.renderPage(u,s))})}}async render(){this.parent.innerHTML=this.getHTML(),new y(document.getElementById("search-placeholder"),t=>{this.getData(t)}).render(),new w(document.getElementById("add-btn-placeholder")).render(()=>{window.renderPage(u,1)}),await this.getData()}}class T{constructor(t){this.parent=t}getHTML(){return'<button id="home-button" class="btn btn-light" style="border-radius: 8px; width: 150px; height: 40px; font-weight: normal; color: black; margin-right: 65px;"> Домой</button>'}render(t){this.parent.innerHTML=this.getHTML(),document.getElementById("home-button").addEventListener("click",t)}}const p=document.getElementById("root"),I=document.getElementById("home-button-container"),H=new T(I);H.render(()=>window.renderPage(l));window.renderPage=(r,...t)=>{p.innerHTML="",new r(p,...t).render()};window.renderPage(l);
