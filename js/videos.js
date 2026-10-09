// js/videos.js

// Lista de tus videos de YouTube. Puedes poner el link completo o solo el ID.
const VIDEOS = [
    {
        link: "https://youtu.be/1KFDOXApjaA?si=-jXqexRLvSFyVvSC", // O puedes usar tu propio enlace de YouTube
        titulo: "La semilla y el Corazón",
        duracion: "44 min",
        descripcion: "Según el Evangelio de Mateo esta fue la Parábola con la que Jesús inicia una nueva manera de predicar dando cumplimiento al Profeta Isaías e inaugurando así un giro decisivo en su manera de revelar y a la vez ocultar las verdades del Reino. Jesús mismo dijo que si no entendemos esta parábola no podremos entender las demás. La famosa Parábola del sembrador, la semilla y el terreno nos pone frente a la importancia de escuchar y responder a la Palabra con un corazón correcto."
    },
    {
        link: "https://youtu.be/GNRvR6nzYgk?si=AjdEBGNUfQGghmT3", // También acepta enlaces cortos de yoctu.be
        titulo: "El Poder de la Oración en Familia",
        duracion: "41 min",
        descripcion: "María fue una mujer llena de Gracia. Elegida por Dios para ser la madre de nuestro Señor Jesucristo y en la celebración del Día de la Madre que tuvimos en la Iglesia Nueva Vida,  evocamos su ejemplo  examinando cinco referencias bíblicas que la mencionan como madre de nuestro Señor.  Inspirados en su ejemplo aprendemos todo lo que el amor de una madre encierra. María nos enseña a amar desde la Responsabilidad, Desde el Acompañamiento, Desde la Renuncia, Desde la Impotencia y Desde la Expectativa."
    },
    {link:"https://youtu.be/wifB5bhZqYA?si=Lnnykbt7uHAv2S6t",
        titulo: "Introducción a los Roamnos",
        duracion: "30 min",
        descripcion: "Se concreta una breve panorámica de la Epístola, haciendo referencia al entorno social, la ciudad de Roma, las razones que motivan el escrito, el autor y la fecha, así como un bosquejo sintético del contenido que se tratará en temas sucesivos."

    }
];

// Función para extraer automáticamente el ID de cualquier enlace de YouTube
function obtenerYoutubeId(urlOrId) {
    if (!urlOrId) return '';
    // Si ya es un ID directo de 11 caracteres
    if (urlOrId.length === 11 && !urlOrId.includes('/') && !urlOrId.includes('.')) {
        return urlOrId;
    }
    // Expresión para extraer el ID de URLs normales o cortas
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
}

export function initVideos() {
    renderVideos();
}

function renderVideos() {
    const container = document.getElementById('contenedor-videos');
    if (!container) return;

    if (!Array.isArray(VIDEOS) || VIDEOS.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-500 text-sm py-6">No hay videos publicados en este momento.</p>`;
        return;
    }

    // En la función renderVideos de js/videos.js:
container.innerHTML = VIDEOS.map(v => {
    const videoId = obtenerYoutubeId(v.link || v.id);
    const miniaturaUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return `
        <div class="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500/50 transition group">
            <div class="relative bg-stone-900 aspect-video flex items-center justify-center cursor-pointer overflow-hidden" onclick="verVideo('${videoId}', '${v.titulo.replace(/'/g, "\\'")}')">
                <img src="${miniaturaUrl}" alt="${v.titulo}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300">
                <div class="absolute w-12 h-12 bg-amber-700 hover:bg-amber-800 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <i class="fa-solid fa-play ml-1"></i>
                </div>
                <span class="absolute bottom-2 right-2 bg-stone-900/80 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-stone-700">${v.duracion || 'Video'}</span>
            </div>
            
            <div class="p-4">
                <h4 class="font-serif font-bold text-stone-900 text-sm mb-1 line-clamp-1">${v.titulo}</h4>
                <p class="text-stone-600 text-xs leading-relaxed line-clamp-2">${v.descripcion}</p>
            </div>
        </div>
    `;
}).join('');
}

// Ventana emergente (Modal) para reproducir el video
window.verVideo = function(id, titulo) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
    if (!modal || !contenido) return;

    contenido.innerHTML = `
        <div class="mb-4 flex items-center justify-between pr-8">
            <h3 class="font-serif font-bold text-slate-100 text-lg">${titulo}</h3>
        </div>
        <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/${id}?autoplay=1" title="${titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
    modal.classList.remove('hidden');
};