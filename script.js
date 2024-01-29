document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modo-oscuro-btn').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize ScrollReveal
    ScrollReveal().reveal('#header', {
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        reset: false
    });
    
    ScrollReveal().reveal('.seccion', {
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        reset: false
    });

    ScrollReveal().reveal('.interiores', {
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        reset: false
    });

    ScrollReveal().reveal('.dobles', {
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        reset: false
    });

    ScrollReveal().reveal('#padretitulaciones', {
        duration: 1000,
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        reset: false
    });

});