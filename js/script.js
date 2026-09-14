
// Estado del OVA
let estado = {
    progreso: 0,
    seccionesDesbloqueadas: ['inicio'],
    insignias: [],
    estudiante: { nombre: '', carnet: '', correo: '' },
    moduloPedagogiaCompleto: false,
    moduloComunicacionCompleto: false,
    moduloTecnologiaCompleto: false
};

const totalSecciones = 8;

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    actualizarProgresoUI();
});

// Navegación
function nav(targetId) {
    if (!estado.seccionesDesbloqueadas.includes(targetId)) return;
    
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostrar objetivo
    document.getElementById(targetId).classList.add('active');
    const btn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    if(btn) btn.classList.add('active');

    // Scroll top
    document.getElementById('content').scrollTop = 0;
}

function unlockAndNav(targetId) {
    if (!estado.seccionesDesbloqueadas.includes(targetId)) {
        estado.seccionesDesbloqueadas.push(targetId);
        const btn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if(btn) btn.removeAttribute('disabled');
        calcularProgreso();
    }
    nav(targetId);
}

function calcularProgreso() {
    estado.progreso = Math.round((estado.seccionesDesbloqueadas.length / totalSecciones) * 100);
    actualizarProgresoUI();
}

function actualizarProgresoUI() {
    document.getElementById('progress-fill').style.width = estado.progreso + '%';
    document.getElementById('progress-text').innerText = estado.progreso + '%';
}

// Gamificación - Insignias
function otorgarInsignia(nombre) {
    if(!estado.insignias.includes(nombre)) {
        estado.insignias.push(nombre);
        
        const badgesDiv = document.getElementById('badges');
        if(document.getElementById('no-badges')) {
            badgesDiv.innerHTML = '';
        }
        
        const b = document.createElement('span');
        b.className = 'badge';
        b.innerText = nombre;
        badgesDiv.appendChild(b);
        
        alert(`🏆 ¡Felicidades! Has desbloqueado la insignia: ${nombre}`);
    }
}

// Actividades de Selección Única (Pedagogía)
function checkActivity(tipo, respuesta) {
    const fb = document.getElementById(`${tipo}-feedback`);
    if (respuesta === 'correcto') {
        fb.innerHTML = "✅ ¡Correcto! Has identificado adecuadamente el concepto.";
        fb.className = "feedback success";
        estado.moduloPedagogiaCompleto = true;
    } else {
        fb.innerHTML = "❌ Incorrecto. Analiza nuevamente las definiciones.";
        fb.className = "feedback error";
    }
}

// Modales para Recursos Educativos
function showResource(title, desc, adv, dis) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-adv').innerText = adv;
    document.getElementById('modal-dis').innerText = dis;
    document.getElementById('resource-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('resource-modal').style.display = 'none';
}

// Drag and Drop (Comunicación)
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev, categoria) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var elem = document.getElementById(data);
    
    // Evitar anidar dentro de otros elementos arrastrables
    if (ev.target.classList.contains('drop-zone')) {
        ev.target.appendChild(elem);
    }
}

function checkDragAndDrop() {
    const syncZone = document.getElementById('zone-sync');
    const asyncZone = document.getElementById('zone-async');
    let correctos = 0;
    
    Array.from(syncZone.children).forEach(el => {
        if(el.getAttribute('data-type') === 'sincronico') correctos++;
    });
    Array.from(asyncZone.children).forEach(el => {
        if(el.getAttribute('data-type') === 'asincronico') correctos++;
    });

    const fb = document.getElementById('drag-feedback');
    if (correctos === 4) {
        fb.innerHTML = "✅ ¡Excelente clasificación! Entiendes la diferencia temporal en la comunicación.";
        fb.className = "feedback success";
        estado.moduloComunicacionCompleto = true;
        verificarInsigniaExplorador();
    } else {
        fb.innerHTML = "❌ Hay elementos incorrectos. Recuerda: Sincrónico = Mismo tiempo (Ej. Chat, Video). Asincrónico = Distintos tiempos (Ej. Foro, Correo).";
        fb.className = "feedback error";
    }
}

function verificarInsigniaExplorador() {
    estado.moduloTecnologiaCompleto = true; // Se asume al llegar al caso
    if(estado.moduloPedagogiaCompleto && estado.moduloComunicacionCompleto) {
        otorgarInsignia("Explorador de la Educación a Distancia");
    }
}

// Caso Práctico
function checkCaso() {
    const r1 = document.getElementById('caso-1').value;
    const r2 = document.getElementById('caso-2').value;
    const r3 = document.getElementById('caso-3').value;
    const r4 = document.getElementById('caso-4').value;
    const fb = document.getElementById('caso-feedback');

    if(r1 === 'correcto' && r2 === 'correcto' && r3 === 'correcto' && r4 === 'correcto') {
        fb.innerHTML = "✅ ¡Decisiones acertadas! Has integrado los componentes correctamente en un aula virtual.";
        fb.className = "feedback success";
        otorgarInsignia("Diseñador Virtual");
        document.getElementById('btn-next-registro').style.display = 'inline-block';
    } else {
        fb.innerHTML = "❌ Algunas decisiones no son las más óptimas. Recuerda el enfoque en flexibilidad, retroalimentación y opciones libres si no hay presupuesto.";
        fb.className = "feedback error";
    }
}

// Evaluación Final - Data
const evaluacionData = [
    {
        q: "1. ¿Quién tiene la función de facilitar, orientar y guiar el proceso formativo en la educación a distancia?",
        options: ["El Administrador Educativo", "El Docente", "El Estudiante", "Los Padres de Familia"],
        ans: 1
    },
    {
        q: "2. Una unidad didáctica presentada a través de videos interactivos y enlaces web se considera un contenido:",
        options: ["Documento físico", "Multimedia / Hipermedia", "Software comercial", "Recurso unidireccional"],
        ans: 1
    },
    {
        q: "3. La evaluación que tiene como función dar seguimiento y retroalimentación DURANTE el proceso se llama:",
        options: ["Formativa", "Diagnóstica", "Sumativa", "Autoevaluación"],
        ans: 0
    },
    {
        q: "4. Las estrategias de aprendizaje son procedimientos aplicados por:",
        options: ["El Docente para planificar la clase", "El Estudiante para procesar la información", "El Administrador para gestionar recursos", "El tutor para calificar"],
        ans: 1
    },
    {
        q: "5. ¿Cuál de las siguientes es una herramienta de comunicación sincrónica?",
        options: ["Correo electrónico", "Foro de discusión", "Videoconferencia", "Buzón de tareas"],
        ans: 2
    },
    {
        q: "6. La principal ventaja de la comunicación asincrónica es:",
        options: ["Ver las reacciones inmediatas del receptor", "Flexibilidad para interactuar sin compartir la misma línea de tiempo", "Mayor costo de infraestructura", "Requerir conexión simultánea obligatoria"],
        ans: 1
    },
    {
        q: "7. Moodle es un ejemplo representativo de:",
        options: ["Plataforma de Software Libre", "Plataforma de Software Comercial", "Herramienta de comunicación sincrónica", "Unidad didáctica física"],
        ans: 0
    },
    {
        q: "8. ¿Cuál es un reto de la implementación de la informática educativa?",
        options: ["La mayor interactividad", "La adaptación al ritmo del estudiante", "La necesidad de capacitación constante del docente", "La aceptación de los estudiantes"],
        ans: 2
    },
    {
        q: "9. La integración de Personas + Interacción + Proyecto Educativo + TIC forma:",
        options: ["Un documento impreso", "Una Comunidad Virtual de Aprendizaje", "Una evaluación sumativa", "Un foro asincrónico"],
        ans: 1
    },
    {
        q: "10. La plataforma educativa integra funciones de: contenidos, evaluación, seguimiento, gestión y...",
        options: ["Aislamiento", "Comunicación", "Deportes", "Presencialidad"],
        ans: 1
    }
];

function startQuiz() {
    estado.estudiante.nombre = document.getElementById('r-nombre').value;
    estado.estudiante.carnet = document.getElementById('r-carnet').value;
    estado.estudiante.correo = document.getElementById('r-correo').value;
    
    document.getElementById('display-nombre').innerText = estado.estudiante.nombre;
    document.getElementById('display-carnet').innerText = estado.estudiante.carnet;
    
    generarExamen();
    unlockAndNav('evaluacion');
}

function generarExamen() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    
    evaluacionData.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = 'quiz-item';
        let html = `<p>${item.q}</p>`;
        item.options.forEach((opt, i) => {
            html += `<label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>`;
        });
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function submitQuiz() {
    let score = 0;
    let retro = '<ul>';
    let todasRespondidas = true;

    evaluacionData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if(!selected) {
            todasRespondidas = false;
        } else {
            const val = parseInt(selected.value);
            if(val === item.ans) {
                score += 10;
                retro += `<li style="color:green;">Pregunta ${index+1}: Correcta</li>`;
            } else {
                retro += `<li style="color:red;">Pregunta ${index+1}: Incorrecta (Esperado: ${item.options[item.ans]})</li>`;
            }
        }
    });
    
    retro += '</ul>';

    if(!todasRespondidas) {
        alert("Por favor, responde todas las preguntas antes de enviar.");
        return;
    }

    const btnSubmit = document.getElementById('btn-submit-quiz');
    btnSubmit.style.display = 'none';
    
    const resDiv = document.getElementById('quiz-results');
    resDiv.style.display = 'block';
    
    document.getElementById('quiz-score').innerText = `Puntuación: ${score} / 100`;
    document.getElementById('quiz-feedback').innerHTML = retro;

    let msg = "";
    if (score >= 90) {
        msg = "¡Excelente dominio!";
        otorgarInsignia("Experto en Educación a Distancia");
    } else if (score >= 80) {
        msg = "Muy buen dominio.";
    } else if (score >= 70) {
        msg = "Dominio aceptable. Revisa algunos contenidos.";
    } else {
        msg = "Es recomendable revisar nuevamente los módulos.";
    }
    document.getElementById('quiz-msg').innerText = msg;
    
    // Al finalizar, completar barra de progreso
    estado.progreso = 100;
    actualizarProgresoUI();

    // ==========================================================
    // ENVÍO DE DATOS A GOOGLE SHEETS
    // ==========================================================
    
    const urlGoogleScript = 'https://script.google.com/macros/s/AKfycbzqSNVBse9fqQp-Z_UClSr56OIo2WCP2bKuGyAdVRxeiYnDqsLawRMB_z5d9HpFSA-2hQ/exec'; 
    const statusText = document.getElementById('quiz-save-status');
    statusText.innerText = "Guardando resultados en la base de datos...";
    
    const formData = new FormData();
    formData.append('nombre', estado.estudiante.nombre);
    formData.append('carnet', estado.estudiante.carnet);
    formData.append('correo', estado.estudiante.correo);
    formData.append('punteo', score);

    // Hacemos el envío directamente, ignorando el bloqueo CORS del navegador
    fetch(urlGoogleScript, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
    })
    .then(() => {
        console.log("Petición enviada a Drive");
        statusText.innerText = "✅ Tus resultados han sido guardados exitosamente en la base de datos.";
        statusText.style.color = "green";
    })
    .catch(error => {
        console.error("Error al guardar:", error);
        statusText.innerText = "❌ Hubo un problema de conexión al guardar los resultados.";
        statusText.style.color = "red";
    });
}
