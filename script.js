/* Espera a que toda la página (el HTML) se haya cargado antes de ejecutar el script */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Lógica del Animador de Respiración --- */

    // Seleccionamos los elementos que necesitamos del HTML
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    const button = document.getElementById('start-breath-btn');

    let isBreathing = false; // Controla si la animación está activa
    let inhaleTime = 4000;   // 4 segundos para inhalar
    let exhaleTime = 6000;   // 6 segundos para exhalar
    
    // Variables para guardar los "temporizadores" y poder cancelarlos si se presiona "Detener"
    let inhaleTimeout;
    let exhaleTimeout;

    // Esta es la función principal que crea el ciclo de respiración
    function startBreathingCycle() {
        if (!isBreathing) return; // Si se presionó detener, no hace nada

        // Fase de INHALACIÓN
        text.textContent = 'Inhala (4s)';
        circle.style.transitionDuration = `${inhaleTime / 1000}s`; // Pasa la duración a segundos (ej. "4s")
        circle.classList.add('expand');

        // Espera a que termine la inhalación (4s)
        inhaleTimeout = setTimeout(() => {
            // Fase de EXHALACIÓN
            text.textContent = 'Exhala (6s)';
            circle.style.transitionDuration = `${exhaleTime / 1000}s`; // Pasa la duración a segundos (ej. "6s")
            circle.classList.remove('expand');

            // Espera a que termine la exhalación (6s)
            exhaleTimeout = setTimeout(() => {
                // Vuelve a empezar el ciclo
                startBreathingCycle();
            }, exhaleTime);

        }, inhaleTime);
    }

    // Qué pasa cuando se hace clic en el botón
    button.addEventListener('click', () => {
        if (isBreathing) {
            // --- Si se está respirando, DETENER ---
            isBreathing = false;
            button.textContent = 'Comenzar';
            text.textContent = 'Presiona "Comenzar" para iniciar';
            
            // Limpia los temporizadores para que el ciclo se detenga inmediatamente
            clearTimeout(inhaleTimeout);
            clearTimeout(exhaleTimeout);

            // Resetea el círculo a su estado inicial
            circle.classList.remove('expand');
            circle.style.transitionDuration = '0.5s'; // Una transición rápida para volver

        } else {
            // --- Si no se está respirando, COMENZAR ---
            isBreathing = true;
            button.textContent = 'Detener';
            // Inicia el ciclo por primera vez
            startBreathingCycle();
        }
    });


    /* --- 2. Lógica de los Mensajes Personales --- */

    // La lista de mensajes que me diste
    const messages = [
        "TE QUIERO mucho no lo olvides",
        "Te adoro preciosa la más linda sos",
        "SOS super inteligente no dudes de eso",
        "NUNCA te voy a dejar sola",
        "SOS mi persona favorita",
        "Te Amo te amo te amo",
        "Te re compre dale deci k si",
        "TE ADORO DIOSSSS",
        "SOS PERFECTAAAA",
        "UNICA Y HERMOSA",
        "DIOS K HERMOSA",
        "Ya se acabaron segui",
        "AH te la creíste sigue",
        "Te amo",
        "Ya se acabaron encerio"
    ];

    // Seleccionamos el elemento de texto
    const personalTextElement = document.getElementById('personal-text');
    let messageIndex = 0; // Para saber qué mensaje mostrar

    function changePersonalMessage() {
        // 1. Añade la clase 'fade-out' para que el texto desaparezca suavemente
        personalTextElement.classList.add('fade-out');

        // 2. Espera 0.5s (lo que dura la animación de fade-out)
        setTimeout(() => {
            // 3. Cambia el texto
            personalTextElement.textContent = messages[messageIndex];
            
            // 4. Avanza al siguiente mensaje
            messageIndex++;
            
            // 5. Si llega al final de la lista, vuelve al principio
            if (messageIndex >= messages.length) {
                messageIndex = 0;
            }

            // 6. Quita la clase 'fade-out' para que el nuevo texto aparezca
            personalTextElement.classList.remove('fade-out');

        }, 500); // 500 milisegundos = 0.5 segundos (debe coincidir con el CSS)
    }

    // 1. Muestra el primer mensaje inmediatamente al cargar la página
    changePersonalMessage();

    // 2. Llama a la función 'changePersonalMessage' cada 4 segundos (4000 milisegundos)
    setInterval(changePersonalMessage, 4000);

});
