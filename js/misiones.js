// js/misiones.js

// ID extraído de tu planilla "Misiones - Luz y Verdad"
const GOOGLE_SHEETS_ID = "1B6O8kShJhBjhEFWZz5BwD2buvl2-t7r8cc4vtmJuGRA";
const NOMBRE_HOJA = "1";

let MISIONES = [];

export async function initMisiones() {
    const container = document.getElementById('contenedor-misiones');
    if (container) {
        container.innerHTML = `<p class="text-slate-400 text-sm col-span-full py-4 text-center"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Cargando noticias del campo misionero...</p>`;
    }

    try {
            const url = `https://opensheet.elk.sh/1B6O8kShJhBjhEFWZz5BwD2buvl2-t7r8cc4vtmJuGRA/Hoja%201`;
            const respuesta = await fetch(url); 
        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta: ${respuesta.status}`);
        }

        MISIONES = await respuesta.json();
        renderMisiones();
    } catch (error) {
        console.error("Error al cargar noticias de misiones:", error);
        if (container) {
            container.innerHTML = `<p class="text-red-400 text-sm col-span-full py-4 text-center">No se pudieron cargar las noticias del campo misionero en este momento.</p>`;
        }
    }
}

function renderMisiones() {
    const container = document.getElementById('contenedor-misiones');
    if (!container) return;

    if (!Array.isArray(MISIONES) || MISIONES.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-sm col-span-full py-4 text-center">No hay reportes misioneros publicados actualmente.</p>`;
        return;
    }

    container.innerHTML = MISIONES.map(m => `
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-amber-400"><i class="fa-solid fa-location-dot mr-1"></i>${m.lugar || 'Campo Misionero'}</span>
                    <span class="text-xs font-bold text-slate-300">${m.misionero || 'Misionero'}</span>
                </div>
                <p class="text-slate-300 text-sm leading-relaxed mb-4">${m.noticia || ''}</p>
            </div>
            <div class="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <span class="text-xs text-slate-400">${m.oraciones || 0} hermanos orando</span>
                <button onclick="unirmeOracionMision('${m.id}')" class="bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white border border-amber-500/30 text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
                    <i class="fa-solid fa-hands-praying"></i> Me uno en Oración
                </button>
            </div>
        </div>
    `).join('');
}

// Expone la función global para interactuar con los botones del HTML
window.unirmeOracionMision = function(id) {
    const mision = MISIONES.find(m => String(m.id) === String(id));
    if (mision) {
        mision.oraciones = (parseInt(mision.oraciones) || 0) + 1;
        renderMisiones();
    }
};