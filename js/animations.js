// JavaScript pour les animations et décorations

// Chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Enlever le loader après chargement
    setTimeout(function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('loaded');
        }
    }, 1500);

    // Génération des particules (bits et bytes)
    const particleContainer = document.getElementById('particleContainer');
    if (particleContainer) {
        createParticles(particleContainer);
    }
    
    // Chat flottant pour remonter en haut
    const scrollTopCat = document.getElementById('scrollTopCat');
    if (scrollTopCat) {
        setupScrollTop(scrollTopCat);
    }
    
    // Animation des éléments timeline au scroll
    setupScrollAnimations();
    
    // Effet sur les cartes de compétences au clic
    setupCardInteractions();
});

// Fonction pour créer les particules de bits et bytes
function createParticles(container) {
    const particleCount = 15;
    const binarySymbols = ['0', '1', '</>','{ }', '01', '10', '😺', '🐱', '🐈'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        
        // Position aléatoire
        const posX = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 1 + 0.5;
        
        // Durée aléatoire
        const duration = Math.random() * 15 + 10;
        
        // Texte aléatoire
        const symbolIndex = Math.floor(Math.random() * binarySymbols.length);
        particle.textContent = binarySymbols[symbolIndex];
        
        // Appliquer les styles
        particle.style.left = posX + '%';
        particle.style.fontSize = size + 'rem';
        particle.style.animationDuration = duration + 's';
        
        // Retarder l'animation
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Ajouter au conteneur
        container.appendChild(particle);
    }
}

// Fonction pour configurer le chat qui remonte en haut
function setupScrollTop(element) {
    // Masquer le chat au chargement
    element.style.opacity = '0';
    element.style.visibility = 'hidden';
    
    // Afficher le chat lorsqu'on scrolle
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        } else {
            element.style.opacity = '0';
            element.style.visibility = 'hidden';
        }
    });
    
    // Remonter en haut lors du clic
    element.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour configurer les animations au scroll
function setupScrollAnimations() {
    // Observer pour les éléments de timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Interaction avec les cartes de compétences
function setupCardInteractions() {
    const skillCards = document.querySelectorAll('.pro-skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // Effet de pulsation
            this.classList.add('pulse');
            
            // Animation d'icône
            const icon = this.querySelector('.pro-skill-icon i');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'skillWiggle 0.5s ease';
                }, 10);
            }
            
            // Retirer l'effet après l'animation
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 700);
        });
    });
    
    // Effet sonore de chat aléatoire (optionnel)
    const floatingCat = document.querySelector('.floating-cat');
    if (floatingCat) {
        floatingCat.addEventListener('click', function(e) {
            // Si vous voulez ajouter un effet sonore, vous pourriez le faire ici
            // Exemple: playCatSound();
            
            // Ajouter une petite animation supplémentaire
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'catBounce 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
        });
    }
}

// Effet de confetti de chats pour les interactions spéciales (optionnel)
function createCatConfetti() {
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱', '🐈'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        const emoji = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        
        confetti.textContent = emoji;
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confetti.style.opacity = '1';
        confetti.style.transition = 'all ' + (Math.random() * 3 + 2) + 's linear';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '120%';
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    setTimeout(() => {
        container.remove();
    }, 6000);
}

// Vous pouvez appeler createCatConfetti() lors d'événements spéciaux,
// comme l'envoi réussi du formulaire de contact

// Ajout d'un effet d'ondulation d'eau sur des éléments spécifiques (optionnel)
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size/2 + 'px';
        ripple.style.top = e.clientY - rect.top - size/2 + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Appliquer l'effet d'ondulation aux boutons
document.querySelectorAll('.btn').forEach(button => {
    addRippleEffect(button);
});


// JavaScript pour les modals de projets

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des modals de projets
    initProjectModals();
    
    // Ajout de l'effet sur les cartes de projets au survol
    initProjectCardEffects();
});

/**
 * Initialise les modals de projets et les gestionnaires d'événements associés
 */
function initProjectModals() {
    // Sélection de tous les éléments pertinents
    const projectCards = document.querySelectorAll('.project-card');
    const detailsButtons = document.querySelectorAll('.btn-details');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    
    // Gérer le clic sur les cartes de projets
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Éviter l'ouverture du modal lors du clic sur la vidéo
            if (e.target.tagName === 'VIDEO' || 
                e.target.closest('video') || 
                e.target.tagName === 'BUTTON') {
                return;
            }
            
            const projectId = this.getAttribute('data-project');
            openProjectModal(`modal-${projectId}`);
            
            // Effet de pulsation sur la carte
            this.classList.add('pulse-card');
            setTimeout(() => {
                this.classList.remove('pulse-card');
            }, 300);
        });
    });
    
    // Gérer le clic sur les boutons "Voir plus"
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Éviter la propagation au parent
            
            const card = this.closest('.project-card');
            const projectId = card.getAttribute('data-project');
            openProjectModal(`modal-${projectId}`);
            
            // Effet de pulsation sur la carte
            card.classList.add('pulse-card');
            setTimeout(() => {
                card.classList.remove('pulse-card');
            }, 300);
        });
    });
    
    // Gérer le clic sur les boutons de fermeture des modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            closeProjectModal(modal.id);
        });
    });
    
    // Gérer le clic sur les overlays (fermeture du modal en cliquant en dehors)
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.project-modal');
            closeProjectModal(modal.id);
        });
    });
    
    // Gérer la touche Escape pour fermer le modal actif
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.project-modal.active');
            if (activeModal) {
                closeProjectModal(activeModal.id);
            }
        }
    });
}

/**
 * Ouvre un modal de projet spécifique
 * @param {string} modalId - L'ID du modal à ouvrir
 */
function openProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Bloquer le défilement de la page
    document.body.style.overflow = 'hidden';
    
    // Afficher le modal avec animation
    modal.classList.add('active');
    modal.querySelector('.modal-container').classList.add('modal-anim-in');
    
    // Gérer les vidéos dans le modal
    const video = modal.querySelector('video');
    if (video) {
        // Essayer de mettre la vidéo en pause d'abord (pour éviter les erreurs)
        try {
            video.pause();
            video.currentTime = 0;
        } catch (error) {
            console.warn('Impossible de réinitialiser la vidéo', error);
        }
        
        // Lecture automatique de la vidéo avec un délai
        setTimeout(() => {
            try {
                video.play().catch(err => {
                    console.warn('Lecture automatique désactivée par le navigateur', err);
                });
            } catch (error) {
                console.warn('Impossible de lire la vidéo', error);
            }
        }, 500);
    }
    
}

/**
 * Ferme un modal de projet spécifique
 * @param {string} modalId - L'ID du modal à fermer
 */
function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Animation de fermeture
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.classList.remove('modal-anim-in');
    modalContainer.classList.add('modal-anim-out');
    
    // Gérer les vidéos dans le modal
    const video = modal.querySelector('video');
    if (video) {
        try {
            video.pause();
        } catch (error) {
            console.warn('Impossible de mettre la vidéo en pause', error);
        }
    }
    
    // Fermer le modal après l'animation
    setTimeout(() => {
        modal.classList.remove('active');
        modalContainer.classList.remove('modal-anim-out');
        
        // Réactiver le défilement de la page
        document.body.style.overflow = '';
    }, 400);
}

/**
 * Initialise les effets sur les cartes de projets
 */
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Effet de suivi de souris subtil (parallaxe)
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `translateY(-5px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            this.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.15), ${moveX * 0.5}px ${moveY * 0.5}px 10px rgba(0, 0, 0, 0.05)`;
        });
        
        // Réinitialiser la position au départ de la souris
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Crée un effet de confetti de chats
 */
function createCatConfetti() {
    const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱', '🐈'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        const emoji = catEmojis[Math.floor(Math.random() * catEmojis.length)];
        
        confetti.textContent = emoji;
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        confetti.style.opacity = '1';
        confetti.style.transition = 'all ' + (Math.random() * 3 + 2) + 's linear';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '120%';
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    setTimeout(() => {
        container.remove();
    }, 6000);
}

/**
 * Précharge les vidéos pour améliorer les performances
 */
function preloadProjectVideos() {
    const videos = document.querySelectorAll('.project-card video source');
    
    videos.forEach(source => {
        const url = source.getAttribute('src');
        if (url) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'video';
            document.head.appendChild(link);
        }
    });
}

// Précharger les vidéos après le chargement complet de la page
window.addEventListener('load', preloadProjectVideos);