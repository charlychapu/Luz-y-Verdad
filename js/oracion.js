let PETICIONES = [
    { id: 1, nombre: "Carlos M.", motivo: "Pido oración por la salud física de mi madre.", amens: 12 }
];

export function initOracion() {
    renderPeticiones();
}

function renderPeticiones() {
    const container = document.getElementById('contenedor-peticiones');
    const contador = document.getElementById('contador-peticiones');
    if (!container) return;

    if (contador) contador.innerText = `${PETICIONES.length} Peticiones activas`;

    container.innerHTML = PETICIONES.map(p => `
        <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm">
            <div>
                <span class="text-xs font-bold text-slate-800">${p.nombre}</span>
                <p class="text-slate-600 text-sm mt-1 leading-relaxed">${p.motivo}</p>
            </div>
            <button onclick="darAmen(${p.id})" class="shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                <i class="fa-solid fa-hands-praying text-amber-600"></i> Amén (${p.amens})
            </button>
        </div>
    `).join('');
}

window.agregarPeticion = function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre-oracion').value;
    const motivo = document.getElementById('motivo-oracion').value;

    PETICIONES.unshift({ id: Date.now(), nombre, motivo, amens: 1 });
    renderPeticiones();
    document.getElementById('form-oracion').reset();
};

window.darAmen = function(id) {
    const peticion = PETICIONES.find(p => p.id === id);
    if (peticion) {
        peticion.amens++;
        renderPeticiones();
    }
};