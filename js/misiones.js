// js/misiones.js

const HOJA_MISIONES = 'https://opensheet.elk.sh/1B6O8kShJhBjhEFWZz5BwD2buvl2-t7r8cc4vtmJuGRA/Misiones';

let misionesData = [];

export async function initMisiones() {
    await cargarMisiones();
}

async function cargarMisiones() {
    const container = document.getElementById('contenedor-misiones');
    if (!container) return;

    try {
        const response = await fetch(HOJA_MISIONES);
        if (!response.ok) throw new Error("Error al obtener las misiones");
        misionesData = await response.json();
        renderMisiones(misionesData);
    } catch (error) {
        console.error("Error al cargar misiones:", error);
        container.innerHTML = `<p class="col-span-full text-center text-amber-200/60 text-sm py-6">No se pudieron cargar las misiones en este momento.</p>`;
    }
}

// Función auxiliar para obtener el valor de un campo sin importar mayúsculas, minúsculas o tildes
function getValor(objeto, ...nombresPosibles) {
    if (!objeto) return '';
    const keys = Object.keys(objeto);
    for (const posible of nombresPosibles) {
        const keyEncontrada = keys.find(k => 
            k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() === 
            posible.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
        );
        if (keyEncontrada && objeto[keyEncontrada]) {
            return objeto[keyEncontrada];
        }
    }
    return '';
}

function renderMisiones(lista) {
    const container = document.getElementById('contenedor-misiones');
    if (!container) return;

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-stone-400 text-sm py-6">No hay noticias o proyectos misioneros disponibles.</p>`;
        return;
    }

    container.innerHTML = lista.map((m, index) => {
        // Obtenemos cada campo reconociendo diferentes formas de escribir las columnas
        const misionero = getValor(m, 'misionero', 'misión', 'mision') || 'Misión ICE Los Robles';
        const lugar = getValor(m, 'lugar', 'ubicacion', 'ubicación', 'pais');
        const noticia = getValor(m, 'noticia', 'descripcion', 'descripción', 'resumen');
        const oraciones = getValor(m, 'oraciones', 'oracion', 'oración', 'motivos');
        const imagenUrl = getValor(m, 'imagen', 'foto', 'portada') || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop';

        // Construimos la etiqueta de ubicación asegurando que existe valor
        const etiquetaUbicacion = lugar 
            ? `<span class="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-sm text-stone-200 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-stone-700 flex items-center gap-1"><i class="fa-solid fa-location-dot text-amber-400"></i> ` + lugar + `</span>` 
            : '';

        return `
            <article class="bg-stone-800 border border-stone-700/80 rounded-2xl overflow-hidden shadow-md hover:border-amber-500/50 transition flex flex-col justify-between group">
                <div>
                    <div class="relative h-44 w-full overflow-hidden bg-stone-950">
                        <img src="${imagenUrl}" alt="${misionero}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                        ${etiquetaUbicacion}
                    </div>
                    <div class="p-5">
                        <p class="text-xs text-amber-400 font-medium mb-1.5"><i class="fa-solid fa-user-tie mr-1"></i> ${misionero}</p>
                        <h3 class="font-serif font-bold text-stone-100 text-base mb-2 leading-snug">${noticia ? noticia.substring(0, 70) + '...' : ''}</h3>
                        <p class="text-stone-300 text-xs leading-relaxed line-clamp-3 mb-2">${noticia}</p>
                        ${oraciones ? `<p class="text-stone-400 text-[11px] italic bg-stone-900/50 p-2 rounded-lg border border-stone-700/50 mt-3"><strong class="text-amber-400">Oración:</strong> \${oraciones}</p>` : ''}
                    </div>
                </div>
                <div class="p-5 pt-0">
                    <button onclick="verMisionIndex(${index})" class="w-full bg-stone-700/60 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 border border-stone-600 hover:border-amber-600">
                        <i class="fa-solid fa-newspaper"></i> Leer Reporte Completo
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

window.verMisionIndex = function(index) {
    const m = misionesData[index];
    if (!m) return;

    const modal = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
    if (!modal || !contenido) return;

    const misionero = getValor(m, 'misionero', 'misión', 'mision') || 'Misión ICE Los Robles';
    const lugar = getValor(m, 'lugar', 'ubicacion', 'ubicación', 'pais');
    const noticia = getValor(m, 'noticia', 'descripcion', 'descripción', 'resumen');
    const oraciones = getValor(m, 'oraciones', 'oracion', 'oración', 'motivos');
    const imagenUrl = getValor(m, 'imagen', 'foto', 'portada') || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop';

    contenido.innerHTML = `
        <div class="mb-4">
            ${lugar ? `<span class="text-xs font-semibold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200">\${lugar}</span>` : ''}
            <h2 class="font-serif font-bold text-stone-900 text-2xl mt-2 mb-1">Reporte de ${misionero}</h2>
        </div>
        <div class="rounded-xl overflow-hidden mb-4 max-h-64 border border-stone-200 bg-stone-100">
            <img src="${imagenUrl}" alt="${misionero}" class="w-full h-full object-cover">
        </div>
        <div class="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed whitespace-pre-line border-t border-stone-100 pt-4 mb-4">
            ${noticia}
        </div>
        ${oraciones ? `
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-stone-800">
                <h4 class="font-bold text-amber-900 mb-1"><i class="fa-solid fa-hands-praying mr-1"></i> Motivos de Oración:</h4>
                <p class="leading-relaxed">\${oraciones}</p>
            </div>
        ` : ''}
    `;
    modal.classList.remove('hidden');
};
