const carousel = document.getElementById('carousel');
let isDragging = false;
let startX, scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
    carousel.style.transition = 'none'; // Desativa a suavização durante o arraste
});

carousel.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        carousel.style.cursor = 'grab';
        carousel.style.transition = 'transform 0.3s ease'; // Reativa a suavização ao parar
    }
});

carousel.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        carousel.style.cursor = 'grab';
        carousel.style.transition = 'transform 0.3s ease'; // Reativa a suavização ao parar
    }
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste a sensibilidade do arraste
    carousel.scrollLeft = scrollLeft - walk;
});

document.addEventListener('DOMContentLoaded', () => {
    const sectionMap = {
        goDownload: 'Download',
        goNFTs: 'NFTs',
        goRank: 'Rank',
        goNewsletter: 'newsletter',
        goFAQ: 'FAQ'
    };

    Object.keys(sectionMap).forEach(className => {
        const element = document.querySelector(`.${className}`);
        
        if (element) {
            element.addEventListener('click', function() {
                const targetId = sectionMap[className];
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offset = 120; // Distância em pixels além da seção
                    const sectionRect = targetSection.getBoundingClientRect();
                    const sectionTop = sectionRect.top + window.pageYOffset;
                    const scrollDirection = (window.scrollY > sectionTop) ? 1 : -1; // Determina a direção
                    const scrollToPosition = sectionTop - (offset * scrollDirection);

                    // Animação inicial para rolar além da seção
                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: 'smooth'
                    });

                    // Ajuste a rolagem após um pequeno atraso para normalizar a posição
                    setTimeout(() => {
                        window.scrollTo({
                            top: sectionTop - (offset / 5 * scrollDirection),
                            behavior: 'smooth'
                        });
                    }, 500); // Ajuste o atraso conforme necessário
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        const info = details.querySelector('.info');

        const updateMaxHeight = () => {
            // Remove a transição para forçar a recalculação
            info.style.transition = 'none';
            // Ajusta a altura máxima para o conteúdo quando aberto
            if (details.open) {
                info.style.maxHeight = `${info.scrollHeight}px`;
                info.style.opacity = '1';
            } else {
                // Define a altura máxima para 0 quando fechado
                info.style.maxHeight = '0';
                info.style.opacity = '0';
            }

            // Força o reflow
            void info.offsetHeight;

            // Reaplica a transição
            info.style.transition = 'max-height 0.5s ease-out, opacity 0.5s ease-out';
        };

        // Atualiza a altura máxima ao abrir ou fechar
        details.addEventListener('toggle', updateMaxHeight);

        // Atualiza a altura máxima em caso de redimensionamento da janela
        window.addEventListener('resize', updateMaxHeight);

        // Atualiza a altura máxima inicialmente
        updateMaxHeight();
    });
});




