// js/misiones.js

// URL de tu planilla OpenSheet
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
        container.innerHTML = `<p class="col-span-full text-center text-amber-800/60 text-sm py-6">No se pudieron cargar las misiones en este momento.</p>`;
    }
}

function renderMisiones(lista) {
    const container = document.getElementById('contenedor-misiones');
    if (!container) return;

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-stone-500 text-sm py-6">No hay noticias o proyectos misioneros disponibles.</p>`;
        return;
    }

    container.innerHTML = lista.map((m, index) => {
        // Imagen por defecto si no se incluye enlace a imagen en la planilla
        const imagenUrl = m.imagen || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop';

        return `
            <article class="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500/40 transition flex flex-col justify-between">
                <div>
                    <div class="relative h-48 w-full overflow-hidden bg-stone-100">
                        <img src="${imagenUrl}" alt="${m.titulo || 'Misión'}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                        ${m.ubicacion ? `
                            <span class="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-stone-700/50 flex items-center gap-1">
                                <i class="fa-solid fa-location-dot text-amber-400"></i> \${m.ubicacion}
                            </span>
                        ` : ''}
                    </div>
                    <div class="p-5">
                        <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
                            <span class="text-amber-800 font-medium">${m.fecha || ''}</span>
                        </div>
                        <h3 class="font-serif font-bold text-stone-900 text-lg mb-2 leading-snug">${m.titulo || 'Sin título'}</h3>
                        <p class="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4">${m.resumen || m.descripcion || ''}</p>
                    </div>
                </div>
                <div class="p-5 pt-0">
                    <button onclick="verMisionIndex(${index})" class="w-full bg-stone-100 hover:bg-amber-700 hover:text-white text-stone-800 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 border border-stone-200 hover:border-amber-700">
                        <i class="fa-solid fa-newspaper"></i> Leer Reporte
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

    const imagenUrl = m.imagen || 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop';

    contenido.innerHTML = `
        <div class="mb-4">
            ${m.ubicacion ? `<span class="text-xs font-semibold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200/60">\${m.ubicacion}</span>` : ''}
            <h2 class="font-serif font-bold text-stone-900 text-2xl mt-2 mb-1">${m.titulo || 'Reporte Misionero'}</h2>
            <p class="text-xs text-stone-500">${m.fecha || ''}</p>
        </div>
        <div class="rounded-xl overflow-hidden mb-4 max-h-64 border border-stone-200">
            <img src="${imagenUrl}" alt="${m.titulo}" class="w-full h-full object-cover">
        </div>
        <div class="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed whitespace-pre-line border-t border-stone-100 pt-4">
            ${m.descripcion || m.contenido || m.resumen || ''}
        </div>
    `;
    modal.classList.remove('hidden');
};
