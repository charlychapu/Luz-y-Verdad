const DEVOCIONALES = [
    {
        id: 1,
        titulo: "La Fidelidad de Dios en Tiempos Difíciles",
        pasaje: "Lamentaciones 3:22-23",
        categoria: "Fe",
        resumen: "Sus misericordias son nuevas cada mañana. Descubre cómo descansar en la fidelidad inconmovible de nuestro Padre celestial.",
        contenido: "En medio de la aflicción, el profeta Jeremías declaró una de las verdades más consoladoras de la Escritura..."
    }
];

export function initDevocionales() {
    renderDevocionales(DEVOCIONALES);
}

function renderDevocionales(lista = DEVOCIONALES) {
    const container = document.getElementById('contenedor-devocionales');
    if (!container) return;
    container.innerHTML = lista.map(d => `
        <div class="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">${d.categoria}</span>
                    <span class="text-xs text-slate-400 font-serif italic">${d.pasaje}</span>
                </div>
                <h3 class="text-lg font-serif font-bold text-slate-900 mb-2">${d.titulo}</h3>
                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${d.resumen}</p>
            </div>
            <button onclick="verDevocional(${d.id})" class="text-amber-600 hover:text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                Leer reflexión <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
        </div>
    `).join('');
}

window.filtrarDevocionales = function(cat, event) {
    document.querySelectorAll('#filtros-devocionales button').forEach(b => {
        b.classList.remove('bg-amber-600', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
    });
    if (event && event.target) {
        event.target.classList.remove('bg-white', 'text-slate-600');
        event.target.classList.add('bg-amber-600', 'text-white');
    }
    renderDevocionales(cat === 'Todos' ? DEVOCIONALES : DEVOCIONALES.filter(d => d.categoria === cat));
};

window.verDevocional = function(id) {
    const dev = DEVOCIONALES.find(d => d.id === id);
    if (!dev) return;
    const modal = document.getElementById('modal');
    document.getElementById('modal-contenido').innerHTML = `
        <span class="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">${dev.categoria}</span>
        <h2 class="text-2xl font-serif font-bold text-slate-900 mt-3 mb-1">${dev.titulo}</h2>
        <p class="text-amber-800 font-serif italic text-sm mb-4">${dev.pasaje}</p>
        <div class="text-slate-700 text-sm leading-relaxed space-y-3"><p>${dev.contenido}</p></div>
    `;
    modal.classList.remove('hidden');
};

window.abrirDevocionalDestacado = function() {
    window.verDevocional(1);
};