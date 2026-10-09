// js/main.js
import { initDevocionales } from './devocionales.js';
import { initMisiones } from './misiones.js';
import { initVideos } from './videos.js';
import { initPDFs } from './pdfs.js';
import { initOracion } from './oracion.js';

window.cerrarModal = function() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
        document.getElementById('modal-contenido').innerHTML = '';
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // Cargamos los módulos locales de inmediato
    try { initPDFs(); } catch (err) { console.error("Error en PDFs:", err); }
    try { initDevocionales(); } catch (err) { console.error("Error en Devocionales:", err); }
    try { initVideos(); } catch (err) { console.error("Error en Videos:", err); }
    try { initOracion(); } catch (err) { console.error("Error en Oracion:", err); }

    // Cargamos Misiones (consulta externa a Google Sheets)
    try { await initMisiones(); } catch (err) { console.error("Error en Misiones:", err); }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
        });
    }
});