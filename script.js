const video = document.getElementById('video');

// Verifica se o navegador suporta getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Solicita permissão para acessar a câmera
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Conecta o stream da câmera ao elemento de vídeo
        video.srcObject = stream;

        // Salva o stream para ser usado posteriormente
        window.localStream = stream;
    })
    .catch(function(error) {
        console.error("Erro ao acessar a câmera: ", error);
    });
} else {
    console.error("Navegador não suporta getUserMedia");
}

// Função para criar corações com GIFs
function createHeart() {
    const heart = document.createElement('img');
    heart.src = 'https://path_to_your_gif/heart.gif'; // Substitua pelo caminho do seu GIF
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.querySelector('.background').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Criar corações a cada 500ms
setInterval(createHeart, 500);

// Função para parar o uso da câmera
function stopCamera() {
    if (window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop());
    }
}

// Adiciona um evento para parar a câmera quando a janela for fechada ou recarregada
window.addEventListener('beforeunload', stopCamera);
