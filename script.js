/* Espera a que toda la página (el HTML) se haya cargado antes de ejecutar el script */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Lógica del Animador de Respiración --- */

    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    const button = document.getElementById('start-breath-btn');

    let isBreathing = false;
    let inhaleTime = 4000;
    let exhaleTime = 6000;
    
    let inhaleTimeout;
    let exhaleTimeout;

    function startBreathingCycle() {
        if (!isBreathing) return;

        text.textContent = 'Inhala (4s)';
        circle.style.transitionDuration = `${inhaleTime / 1000}s`;
        circle.classList.add('expand');

        inhaleTimeout = setTimeout(() => {
            text.textContent = 'Exhala (6s)';
            circle.style.transitionDuration = `${exhaleTime / 1000}s`;
            circle.classList.remove('expand');

            exhaleTimeout = setTimeout(() => {
                startBreathingCycle();
            }, exhaleTime);

        }, inhaleTime);
    }

    button.addEventListener('click', () => {
        if (isBreathing) {
            isBreathing = false;
            button.textContent = 'Comenzar';
            text.textContent = 'Presiona "Comenzar" para iniciar';
            
            clearTimeout(inhaleTimeout);
            clearTimeout(exhaleTimeout);

            circle.classList.remove('expand');
            circle.style.transitionDuration = '0.5s';

        } else {
            isBreathing = true;
            button.textContent = 'Detener';
            startBreathingCycle();
        }
    });


    /* --- 2. Lógica del Escaneo Corporal Interactivo --- */

    const bodyParts = document.querySelectorAll('.body-part');
    const scanInstruction = document.getElementById('scan-instruction');

    const scanInstructions = {
        "Cabeza": "Nota cualquier sensación en tu cabeza y rostro. ¿Hay tensión en la mandíbula o la frente? Dirige tu respiración allí.",
        "Cuello y Hombros": "Siente la tensión que a menudo se acumula aquí. ¿Está rígida? Permite que tu respiración suavice y libere.",
        "Pecho": "¿Cómo se siente tu pecho? ¿Abierto o contraído? Observa el ritmo de tu corazón sin juicio. Respira profundamente aquí.",
        "Abdomen": "Presta atención a tu abdomen, a menudo un centro de emociones. ¿Hay mariposas, nudos? Suaviza tu abdomen con cada exhalación.",
        "Brazos y Manos": "Siente el peso y las sensaciones en tus brazos y manos. ¿Están relajados o tensos? Permite que se aflojen.",
        "Pelvis y Caderas": "Conecta con la base de tu cuerpo. Siente la estabilidad de tus caderas. Suelta cualquier tensión en esta zona.",
        "Piernas": "Nota tus piernas, tus pilares. ¿Hay inquietud o pesadez? Siente cómo te conectan con la tierra.",
        "Pies": "Siente tus pies en el suelo. La conexión con la tierra, la estabilidad. Dirige tu atención a cada dedo, a la planta del pie."
    };

    bodyParts.forEach(part => {
        part.addEventListener('click', () => {
            // Elimina el resaltado de todas las partes primero
            bodyParts.forEach(p => p.classList.remove('highlighted'));
            
            // Resalta la parte clicada
            part.classList.add('highlighted');
            
            // Muestra la instrucción correspondiente
            const partName = part.dataset.part;
            scanInstruction.textContent = scanInstructions[partName];
        });
    });


    /* --- 3. Lógica de los Mensajes Personales --- */

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

    const personalTextElement = document.getElementById('personal-text');
    let messageIndex = 0;

    function changePersonalMessage() {
        personalTextElement.classList.add('fade-out');

        setTimeout(() => {
            personalTextElement.textContent = messages[messageIndex];
            
            messageIndex++;
            if (messageIndex >= messages.length) {
                messageIndex = 0;
            }

            personalTextElement.classList.remove('fade-out');
        }, 500);
    }

    changePersonalMessage();
    setInterval(changePersonalMessage, 4000);

});
