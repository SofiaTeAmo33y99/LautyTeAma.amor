/*
 * SCRIPT.JS para UN ESPACIO DE CALMA
 *
 * Este script controla la animación de respiración guiada (4-6).
 */

// Espera a que todo el contenido de la página (HTML) se haya cargado
document.addEventListener('DOMContentLoaded', () => {

    // Obtiene los elementos que necesitamos del HTML
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');

    // Tiempos de la respiración (en milisegundos)
    const inhaleTime = 4000; // 4 segundos
    const exhaleTime = 6000; // 6 segundos

    // Colores para la animación del círculo
    const inhaleColor = '#a8d8c9'; // Verde menta
    const exhaleColor = '#d0eaf0'; // Azul pálido

    /**
     * Función principal que controla el ciclo de respiración.
     * Se llama a sí misma recursivamente para crear un bucle infinito.
     */
    function breatheCycle() {
        
        // --- FASE 1: INHALAR ---
        text.textContent = 'Inhala... (4s)';
        circle.style.transform = 'scale(1.25)'; // Expande el círculo
        circle.style.backgroundColor = inhaleColor;

        // Espera 4 segundos antes de pasar a la siguiente fase
        setTimeout(() => {
            
            // --- FASE 2: EXHALAR ---
            text.textContent = 'Exhala... (6s)';
            circle.style.transform = 'scale(1)'; // Contrae el círculo a su tamaño original
            circle.style.backgroundColor = exhaleColor;

            // Espera 6 segundos antes de reiniciar el ciclo
            setTimeout(breatheCycle, exhaleTime);

        }, inhaleTime);
    }

    // Inicia el ciclo de respiración tan pronto como la página carga
    breatheCycle();
});
