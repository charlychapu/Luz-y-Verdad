const PDFS = [
    "documentos/berkhof",
    "documentos/nt-interlineal-griego.pdf",
    "documentos/los-primeros-cristianos.pdf",
    "documentos/atributos-de-dios.pdf"
];

export function initPDFs() {
    renderPDFs(PDFS);
}

function renderPDFs(lista = PDFS) {
    const container = document.getElementById('contenedor-pdfs');
    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-slate-500 text-sm py-6">No se encontraron archivos en la librería.</p>`;
        return;
    }

    // En la función renderPDFs de js/pdfs.js:
container.innerHTML = lista.map(rutaPdf => {
    const nombreArchivo = rutaPdf.split('/').pop();
    return `
        <div class="bg-white border border-stone-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-amber-500/50 transition gap-3">
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-10 h-10 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center justify-center text-lg shrink-0">
                    <i class="fa-solid fa-file-pdf"></i>
                </div>
                <span class="font-semibold text-stone-800 text-sm truncate">${nombreArchivo}</span>
            </div>
            <a href="${rutaPdf}" target="_blank" download class="shrink-0 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5">
                <i class="fa-solid fa-download"></i> Descargar
            </a>
        </div>
    `;
}).join('');
}

window.buscarPDFs = function() {
    const input = document.getElementById('buscar-pdf');
    if (!input) return;
    const query = input.value.toLowerCase();
    const filtrados = PDFS.filter(ruta => ruta.toLowerCase().includes(query));
    renderPDFs(filtrados);
};