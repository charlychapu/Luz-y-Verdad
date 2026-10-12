// js/videos.js

// URL de tu planilla OpenSheet
const HOJA_VIDEOS = 'https://opensheet.elk.sh/1B6O8kShJhBjhEFWZz5BwD2buvl2-t7r8cc4vtmJuGRA/Videos';

export async function initVideos() {
    await cargarVideos();
}

function obtenerYoutubeId(urlOrId) {
    if (!urlOrId) return '';
    if (urlOrId.length === 11 && !urlOrId.includes('/') && !urlOrId.includes('.')) {
        return urlOrId;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
}

async function cargarVideos() {
    const container = document.getElementById('contenedor-videos');
    if (!container) return;

    try {
        const response = await fetch(HOJA_VIDEOS);
        if (!response.ok) throw new Error("Error al obtener videos");
        const videos = await response.json();
        renderVideos(videos);
    } catch (error) {
        console.error("Error al cargar videos:", error);
        container.innerHTML = `<p class="col-span-full text-center text-stone-500 text-sm py-6">No se pudieron cargar los videos en este momento.</p>`;
    }
}

function renderVideos(lista) {
    const container = document.getElementById('contenedor-videos');
    if (!container) return;

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-stone-500 text-sm py-6">No hay videos publicados.</p>`;
        return;
    }

    container.innerHTML = lista.map(v => {
        const videoId = obtenerYoutubeId(v.link || v.id);
        const miniaturaUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return `
            <div class="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500/50 transition group">
                <div class="relative bg-stone-900 aspect-video flex items-center justify-center cursor-pointer overflow-hidden" onclick="verVideo('${videoId}', '${(v.titulo || '').replace(/'/g, "\\'")}')">
                    <img src="${miniaturaUrl}" alt="${v.titulo}" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300">
                    <div class="absolute w-12 h-12 bg-amber-700 hover:bg-amber-800 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <i class="fa-solid fa-play ml-1"></i>
                    </div>
                    <span class="absolute bottom-2 right-2 bg-stone-900/80 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-stone-700">${v.duracion || 'Video'}</span>
                </div>
                
                <div class="p-4">
                    <h4 class="font-serif font-bold text-stone-900 text-sm mb-1 line-clamp-1">${v.titulo || 'Sin título'}</h4>
                    <p class="text-stone-600 text-xs leading-relaxed line-clamp-2">${v.descripcion || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

window.verVideo = function(id, titulo) {
    const modal = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
    if (!modal || !contenido) return;

    contenido.innerHTML = `
        <div class="mb-4 flex items-center justify-between pr-8">
            <h3 class="font-serif font-bold text-stone-900 text-lg">${titulo}</h3>
        </div>
        <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-stone-200 shadow-xl">
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/${id}?autoplay=1" title="${titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `;
    modal.classList.remove('hidden');
};
