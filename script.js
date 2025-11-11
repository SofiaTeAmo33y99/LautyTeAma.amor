document.addEventListener('DOMContentLoaded', () => {

    // --- Selectores de Elementos ---
    const heart = document.getElementById('main-heart');
    const counterDisplay = document.getElementById('click-counter');
    const clickerSection = document.getElementById('clicker-section');
    const messageSection = document.getElementById('message-section');
    const namesSection = document.getElementById('names-section');
    
    const girlForm = document.getElementById('girls-form');
    const girlInput = document.getElementById('girl-name-input');
    const girlResult = document.getElementById('girl-name-result');
    
    const rainContainer = document.getElementById('heart-rain-container');
    const containerMain = document.querySelector('.container'); // El contenedor principal

    // --- Estado Inicial ---
    let clickCount = 137;
    counterDisplay.textContent = clickCount;

    // --- Lógica de la Lluvia de Corazones y "Te Amo" ---
    function createFallingItem() {
        const itemEl = document.createElement('div');
        itemEl.classList.add('falling-item');
        
        // Decide si es un corazón o "Te Amo"
        if (Math.random() < 0.6) { // 60% de probabilidad de corazón
            itemEl.innerHTML = '💖'; 
        } else { // 40% de probabilidad de "Te Amo"
            itemEl.innerHTML = 'Te Amo';
            itemEl.classList.add('text'); // Para aplicar estilos de texto
        }
        
        itemEl.style.left = `${Math.random() * 100}vw`;
        itemEl.style.animationDuration = `${Math.random() * 4 + 4}s`; // Duración entre 4 y 8 segundos
        itemEl.style.opacity = Math.random() * 0.5 + 0.3; 
        itemEl.style.fontSize = `${Math.random() * 1 + 1}rem`; // Tamaño entre 1rem y 2rem (más variado)

        rainContainer.appendChild(itemEl);

        setTimeout(() => {
            itemEl.remove();
        }, parseFloat(itemEl.style.animationDuration) * 1000); 
    }

    // Lanza un nuevo elemento cada 400ms
    setInterval(createFallingItem, 400);

    // --- Lógica del Contador de Clics ---
    heart.addEventListener('click', () => {
        if (clickCount > 0) {
            clickCount--;
            counterDisplay.textContent = clickCount;

            heart.classList.add('heart-clicked');
            createClickEffect(heart.getBoundingClientRect()); // Explosión de corazones

            setTimeout(() => {
                heart.classList.remove('heart-clicked');
            }, 200);

            if (clickCount === 0) {
                triggerFinalEffect();
            }
        }
    });

    // Función para el efecto final al llegar a 0 clics
    function triggerFinalEffect() {
        // Aplica la animación de "desaparecer hacia abajo" al clicker
        clickerSection.classList.add('fadeOut');
        
        // Espera a que la animación termine antes de mostrar el resto
        setTimeout(() => {
            clickerSection.style.display = 'none'; // Oculta definitivamente el clicker

            // Muestra las secciones con sus animaciones de entrada
            messageSection.style.display = 'block';
            namesSection.style.display = 'block';

            // Pequeña animación para el contenedor principal
            containerMain.style.animation = 'none'; // Desactiva la animación inicial
            containerMain.offsetHeight; // Truco para reiniciar la animación
            containerMain.style.animation = 'containerRescale 1s ease-out forwards'; // Nueva animación
            
        }, 700); // Duración de fadeOutDown
    }

    // Animación de re-escalado/ajuste del contenedor principal
    // Necesario porque el contenido puede cambiar la altura del contenedor
    // Puedes ajustar los valores para que quede perfecto
    // @keyframes containerRescale en el CSS
    // Nota: Esta animación puede ser más compleja si el contenido cambia mucho
    // Aquí es solo un pequeño ajuste visual
    // Ya que ahora la visibilidad se controla por display:block, las animaciones fadeInFromTop hacen el trabajo.
    // Se elimina la necesidad de esta animación extra en JS para el contenedor principal.

    // --- Lógica del Formulario de Niñas ---
    girlForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        // Asegúrate de que el mensaje no se active si el input está vacío
        if (girlInput.value.trim() !== '') {
            girlResult.textContent = 'NO BEBE, LAUTY ELIGE LOS NOMBRES OK?';
            girlResult.classList.add('shake');

            setTimeout(() => {
                girlResult.classList.remove('shake');
            }, 500); 
        } else {
             girlResult.textContent = '¡Escribe un nombre, mi amor!'; // Mensaje si el input está vacío
             girlResult.classList.add('shake');
              setTimeout(() => {
                girlResult.classList.remove('shake');
                girlResult.textContent = ''; // Limpiar el mensaje
            }, 1000); 
        }
        girlInput.value = '';
    });

    // --- Función Extra: Explosión de corazones al hacer clic ---
    function createClickEffect(rect) {
        for (let i = 0; i < 7; i++) { // Lanza 7 corazones
            const miniHeart = document.createElement('div');
            miniHeart.innerHTML = '💕';
            miniHeart.style.position = 'absolute';
            miniHeart.style.left = `${rect.left + rect.width / 2}px`;
            miniHeart.style.top = `${rect.top + rect.height / 2}px`;
            miniHeart.style.zIndex = '100';
            miniHeart.style.pointerEvents = 'none';
            miniHeart.style.fontSize = `${Math.random() * 0.8 + 0.5}rem`; // Tamaño de mini-corazones
            miniHeart.style.opacity = '1';
            miniHeart.style.transition = 'all 0.6s ease-out'; // Transición más suave
            
            document.body.appendChild(miniHeart);

            const x = (Math.random() - 0.5) * 250; // Rango más amplio para dispersión
            const y = (Math.random() - 0.5) * 250; 

            setTimeout(() => {
                miniHeart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                miniHeart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                miniHeart.remove();
            }, 600);
        }
    }

});
