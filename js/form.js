// Script pour la gestion du formulaire de contact

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Gestion des inputs du formulaire
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Ajout d'un effet visuel au focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            
            // Validation simple
            if (input.value.trim() !== '') {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else if (input.hasAttribute('required')) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        });
    });
});

/**
 * Gère la soumission du formulaire
 * @param {Event} e - L'événement de soumission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    
    // Vérification que tous les champs requis sont remplis
    const requiredFields = e.target.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('invalid');
            isValid = false;
        } else {
            field.classList.remove('invalid');
        }
    });
    
    if (!isValid) {
        showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Simulation d'envoi du formulaire
    // Dans un cas réel, vous utiliseriez fetch() ou axios pour envoyer les données à un backend
    console.log('Données du formulaire:', formValues);
    
    // Affichage d'un message de succès
    showFormMessage('Votre message a été envoyé avec succès !', 'success');
    
    // Réinitialisation du formulaire
    e.target.reset();
}

/**
 * Affiche un message après tentative d'envoi du formulaire
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de message ('success' ou 'error')
 */
function showFormMessage(message, type) {
    // Suppression d'un éventuel message précédent
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Création du nouvel élément de message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Ajout de styles au message
    messageElement.style.padding = '10px';
    messageElement.style.marginTop = '15px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d1e7dd';
        messageElement.style.color = '#0a3622';
    } else {
        messageElement.style.backgroundColor = '#f8d7da';
        messageElement.style.color = '#842029';
    }
    
    // Ajout du message au formulaire
    const form = document.getElementById('contactForm');
    form.appendChild(messageElement);
    
    // Disparition automatique après 5 secondes
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 5000);
}