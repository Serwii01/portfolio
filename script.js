document.addEventListener('DOMContentLoaded', function () {
    var modoOscuroSwitch = document.getElementById('modo-input');
    var body = document.body;

    // Detectar preferencia del sistema al cargar la página
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        modoOscuroSwitch.checked = true;
    }

    modoOscuroSwitch.addEventListener('change', function () {
        body.classList.toggle('dark-mode');
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
