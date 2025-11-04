// main.js - Implementação de JS Obrigatório

/**
 * 1. Navegação Mobile com Menu Hambúrguer
 */
function setupMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.main-nav');
    const menu = document.getElementById('menu');

    if (!hamburger || !nav || !menu) return;

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        
        // Alterna o estado do botão
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Adiciona/Remove a classe 'active' no nav para mostrar/ocultar o menu via CSS
        nav.classList.toggle('active');

        // Garante que o dropdown principal no mobile também alterne a classe 'active'
        const hasDropdown = menu.querySelector('.has-dropdown');
        if (hasDropdown) {
            hasDropdown.addEventListener('click', (e) => {
                // Previne o link principal de navegar
                e.preventDefault(); 
                hasDropdown.classList.toggle('active');
            });
        }
    });
}


/**
 * 2. Componentes de Feedback (Toast)
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Mostra o toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Esconde e remove o toast após 'duration'
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 500); // Espera a transição do CSS
    }, duration);
}


/**
 * 3. Formulários Estilizados com Validação Visual
 */
function setupFormValidation() {
    const form = document.getElementById('cadastro-form');
    // A validação de formulário só deve ser aplicada na página 'cadastro.html'
    if (!form) return; 

    const inputs = form.querySelectorAll('input, select');
    
    // Função de validação de campo
    const validateField = (field) => {
        const group = field.closest('.form-group');
        const feedback = group.querySelector('.feedback');
        // Usa a mensagem de erro definida no atributo data-validation-message do HTML
        const message = field.getAttribute('data-validation-message') || 'Campo inválido.';

        group.classList.remove('is-valid', 'is-invalid');
        // Garante que o feedback exista, pois ele é criado no cadastro.html
        if (!feedback) return true; 

        feedback.textContent = '';
        
        if (field.checkValidity()) {
            group.classList.add('is-valid');
            return true;
        } else {
            group.classList.add('is-invalid');
            feedback.textContent = message;
            return false;
        }
    };

    // Validação ao perder o foco (blur)
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });

    // Validação ao enviar o formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        inputs.forEach(input => {
            // Revalida todos os campos no submit
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Lógica de sucesso (simulação)
            showToast('Cadastro realizado com sucesso!', 'success');
            form.reset();
            
            // Remove classes de validação após sucesso
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                if (group) group.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            // Lógica de erro
            showToast('Por favor, preencha todos os campos obrigatórios corretamente.', 'danger', 5000);
        }
    });
}

// Inicia as funcionalidades após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    setupFormValidation();
});