// js/devocionales.js

// URL de tu planilla OpenSheet
const HOJA_DEVOCIONALES = 'https://opensheet.elk.sh/1B6O8kShJhBjhEFWZz5BwD2buvl2-t7r8cc4vtmJuGRA/Devocionales';

let devocionalesData = [];

export async function initDevocionales() {
    await cargarDevocionales();
}

async function cargarDevocionales() {
    const container = document.getElementById('contenedor-devocionales');
    if (!container) return;

    try {
        const response = await fetch(HOJA_DEVOCIONALES);
        if (!response.ok) throw new Error("Error al obtener los devocionales");
        devocionalesData = await response.json();
        renderDevocionales(devocionalesData);
    } catch (error) {
        console.error("Error al cargar devocionales:", error);
        container.innerHTML = `<p class="col-span-full text-center text-amber-800/60 text-sm py-6">No se pudieron cargar los devocionales en este momento.</p>`;
    }
}

function renderDevocionales(lista) {
    const container = document.getElementById('contenedor-devocionales');
    if (!container) return;

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-stone-500 text-sm py-6">No hay devocionales disponibles.</p>`;
        return;
    }

    container.innerHTML = lista.map((d, index) => `
        <article class="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-500/40 transition flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span class="bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-md border border-amber-200/60">${d.categoria || 'General'}</span>
                    <span>${d.fecha || ''}</span>
                </div>
                <h3 class="font-serif font-bold text-stone-900 text-lg mb-1 leading-snug">${d.titulo}</h3>
                <p class="text-xs font-semibold text-amber-800 italic mb-3">${d.pasaje || ''}</p>
                <p class="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4">${d.resumen || d.contenido}</p>
            </div>
            <button onclick="verDevocionalIndex(${index})" class="w-full bg-stone-100 hover:bg-amber-700 hover:text-white text-stone-800 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1.5 border border-stone-200 hover:border-amber-700">
                <i class="fa-solid fa-book-open"></i> Leer Completo
            </button>
        </article>
    `).join('');
}

window.verDevocionalIndex = function(index) {
    const d = devocionalesData[index];
    if (!d) return;

    const modal = document.getElementById('modal');
    const contenido = document.getElementById('modal-contenido');
    if (!modal || !contenido) return;

    contenido.innerHTML = `
        <div class="mb-4">
            <span class="text-xs font-semibold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200/60">${d.categoria || 'General'}</span>
            <h2 class="font-serif font-bold text-stone-900 text-2xl mt-2 mb-1">${d.titulo}</h2>
            <p class="text-xs text-stone-500">${d.fecha || ''} • <span class="font-semibold text-amber-800">${d.pasaje || ''}</span></p>
        </div>
        <div class="prose prose-stone max-w-none text-stone-700 text-sm leading-relaxed whitespace-pre-line border-t border-stone-100 pt-4">
            ${d.contenido}
        </div>
    `;
    modal.classList.remove('hidden');
};

window.filtrarDevocionales = function(cat, event) {
    if (event) {
        document.querySelectorAll('#filtros-devocionales button').forEach(b => {
            b.className = 'bg-white text-stone-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-300 hover:border-amber-700 transition';
        });
        event.target.className = 'bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-800 transition';
    }

    if (cat === 'Todos') {
        renderDevocionales(devocionalesData);
    } else {
        const filtrados = devocionalesData.filter(d => (d.categoria || '').toLowerCase() === cat.toLowerCase());
        renderDevocionales(filtrados);
    }
};
