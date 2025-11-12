/*
 * SCRIPT.JS para UN ESPACIO DE CALMA
 *
 * Este script controla la animación de respiración guiada (4-6)
 * y el Escaneo Corporal Interactivo.
 */

// Espera a que todo el contenido de la página (HTML) se haya cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Respiración Guiada ---
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');

    const inhaleTime = 4000; // 4 segundos
    const exhaleTime = 6000; // 6 segundos

    const inhaleColor = '#a8d8c9'; // Verde menta
    const exhaleColor = '#d0eaf0'; // Azul pálido

    function breatheCycle() {
        text.textContent = 'Inhala... (4s)';
        circle.style.transform = 'scale(1.25)';
        circle.style.backgroundColor = inhaleColor;

        setTimeout(() => {
            text.textContent = 'Exhala... (6s)';
            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = exhaleColor;
            setTimeout(breatheCycle, exhaleTime);
        }, inhaleTime);
    }

    breatheCycle();

    // --- Escaneo Corporal Interactivo ---
    const bodyParts = document.querySelectorAll('.body-scan-svg path');
    const scanInstructions = document.getElementById('scan-instructions');

    const instructionsMap = {
        "Cabeza y Rostro": "Siente la frente, la mandíbula, los ojos. ¿Hay tensión? Relaja.",
        "Cuello y Hombros": "Percibe el peso de tus hombros. ¿Están elevados? Déjalos caer. Suelta el cuello.",
        "Pecho y Espalda Superior": "Nota tu respiración. ¿Es profunda? ¿Hay presión? Observa el movimiento de tu pecho.",
        "Brazo Izquierdo": "Siente tu brazo izquierdo, desde el hombro hasta los dedos. ¿Alguna sensación?",
        "Brazo Derecho": "Siente tu brazo derecho, desde el hombro hasta los dedos. ¿Alguna sensación?",
        "Abdomen y Espalda Baja": "Dirige tu respiración al abdomen. Siente cómo se expande al inhalar y se contrae al exhalar.",
        "Cadera y Glúteos": "Conecta con tu base. Siente el asiento bajo tus glúteos. Permite que cualquier tensión se libere.",
        "Muslo y Rodilla Izquierda": "Siente tu muslo y rodilla izquierda. ¿Peso, calor, hormigueo?",
        "Muslo y Rodilla Derecha": "Siente tu muslo y rodilla derecha. ¿Peso, calor, hormigueo?",
        "Pantorrilla Izquierda": "Observa tu pantorrilla izquierda. ¿Descansa suavemente?",
        "Pantorrilla Derecha": "Observa tu pantorrilla derecha. ¿Descansa suavemente?",
        "Pie Izquierdo": "Siente tu pie izquierdo, cada dedo, la planta, el talón. La conexión con el suelo.",
        "Pie Derecho": "Siente tu pie derecho, cada dedo, la planta, el talón. La conexión con el suelo."
    };

    bodyParts.forEach(part => {
        part.addEventListener('click', function() {
            // Remueve la clase 'active' de todas las partes
            bodyParts.forEach(p => p.classList.remove('active'));
            
            // Añade la clase 'active' a la parte clickeada
            this.classList.add('active');
            
            // Muestra la instrucción correspondiente
            const label = this.getAttribute('data-label');
            scanInstructions.textContent = instructionsMap[label] || "Dirige tu atención a esta zona del cuerpo. Observa sin juzgar.";
        });
    });

});
