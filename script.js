document.addEventListener("DOMContentLoaded", () => {
    
    // Força a página a voltar para o topo ao ser atualizada (F5)
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 1. FAQ (Acordeão)
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const icon = question.querySelector("i");
            const answer = question.nextElementSibling;

            const allAnswers = document.querySelectorAll(".faq-answer");
            allAnswers.forEach(item => {
                if (item !== answer) {
                    item.style.maxHeight = null;
                    item.style.paddingBottom = "0px";
                    const otherIcon = item.previousElementSibling.querySelector("i");
                    if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
                }
            });

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.paddingBottom = "0px";
                icon.style.transform = "rotate(0deg)";
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.paddingBottom = "20px";
                icon.style.transform = "rotate(180deg)";
            }
        });
    });

    // 2. CHATBOT POP-UP E BOTÃO FLUTUANTE
    const chatOverlay = document.getElementById("chatOverlay");
    const chatCloseBtn = document.getElementById("chatCloseBtn");
    const chatActionClose = document.getElementById("chatActionClose");
    const whatsappFloatBtn = document.getElementById("whatsappFloatBtn");
    const triggerButtons = document.querySelectorAll(".btn-cta:not(.btn-cta-header)");

    const openChatBot = (event) => {
        event.preventDefault();
        chatOverlay.classList.add("active");
    };

    const closeChatBot = () => {
        chatOverlay.classList.remove("active");
    };

    triggerButtons.forEach(button => {
        button.addEventListener("click", openChatBot);
    });

    if (whatsappFloatBtn) {
        whatsappFloatBtn.addEventListener("click", openChatBot);
    }

    chatCloseBtn.addEventListener("click", closeChatBot);
    chatActionClose.addEventListener("click", closeChatBot);

    chatOverlay.addEventListener("click", (event) => {
        if (event.target === chatOverlay) {
            closeChatBot();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && chatOverlay.classList.contains("active")) {
            closeChatBot();
        }
    });

    // 3. ANIMAÇÕES AO ROLAR A PÁGINA (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: descomente a linha abaixo se quiser que a animação ocorra apenas 1 vez
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos com a classe .animate-on-scroll e observa
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

});