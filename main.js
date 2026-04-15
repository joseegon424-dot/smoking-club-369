document.addEventListener("DOMContentLoaded", function () {

    // --- 1. MENÚ MÓVIL Y SCROLL SUAVE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });

    // --- 2. SCROLL REVEAL (Animaciones al bajar) ---
    window.addEventListener('scroll', reveal);
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;
            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active');
            }
        }
    }
    reveal();
    // --- 3. COOKIES BANNER PROFESIONAL ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    if (!localStorage.getItem('cookiesResponded') && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }

    const closeBannerPopup = () => {
        localStorage.setItem('cookiesResponded', 'true');
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
            // Remove from DOM after animation
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 600);
        }
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', closeBannerPopup);
    }
    if (rejectBtn) {
        rejectBtn.addEventListener('click', closeBannerPopup);
    }

    // --- 4. EFECTO 3D TILT (Tarjetas) ---
    const tiltCards = document.querySelectorAll('.glitch-card, .event-visual-card, .review-card-improved, .blog-card-improved');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- 5. FORMULARIOS A WHATSAPP (NUEVO) ---

    // A) Formulario de MEMBERSHIP (Join)
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evita el envío tradicional

            // Capturar datos
            const firstName = document.getElementById('join-fname').value;
            const lastName = document.getElementById('join-lname').value;
            const email = document.getElementById('join-email').value;
            const phone = document.getElementById('join-phone').value;
            const dob = document.getElementById('join-dob').value;
            const found = document.getElementById('join-found').value;
            const message = document.getElementById('join-message').value;

            // Crear mensaje para WhatsApp
            const text = `*NUEVA SOLICITUD DE MEMBRESÍA*%0A%0A` +
                `*Nombre:* ${firstName} ${lastName}%0A` +
                `*Email:* ${email}%0A` +
                `*Teléfono:* ${phone}%0A` +
                `*Fecha de nacimiento:* ${dob}%0A` +
                `*Visto en:* ${found}%0A` +
                `*Mensaje:* ${message}%0A%0A` +
                `_Enviado desde el formulario web_`;

            // Abrir WhatsApp
            window.open(`https://wa.me/34644798800?text=${text}`, '_blank');
        });
    }

    // B) Formulario de CONTACTO
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Capturar datos
            const firstName = document.getElementById('contact-fname').value;
            const lastName = document.getElementById('contact-lname').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            // Crear mensaje
            const text = `*NUEVO MENSAJE DE CONTACTO*%0A%0A` +
                `*Nombre:* ${firstName} ${lastName}%0A` +
                `*Email:* ${email}%0A` +
                `*Asunto:* ${subject}%0A` +
                `*Mensaje:* ${message}%0A%0A` +
                `_Enviado desde el formulario web_`;

            window.open(`https://wa.me/34644798800?text=${text}`, '_blank');
        });
    }

    // C) Formulario del FOOTER (Newsletter)
    const footerForms = document.querySelectorAll('.footer-form');
    footerForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const text = `*MANTENERME INFORMADO*%0A%0AHola, me gustaría recibir actualizaciones.%0A*Email:* ${email}`;
            window.open(`https://wa.me/34644798800?text=${text}`, '_blank');
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {

    // Referencias
    const preloader = document.getElementById('preloader');
    const ageGate = document.getElementById('age-gate');
    const btnYes = document.getElementById('btn-enter');
    const btnNo = document.getElementById('btn-exit');

    // 1. Lógica del Preloader (Simulamos carga de 2.5s para efecto WOW)
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';

                // Una vez se va el preloader, chequeamos la edad
                checkAgeVerification();
            }, 500);
        }
    }, 2500);

    // 2. Función de Verificación de Edad
    function checkAgeVerification() {
        // Si YA está verificado en el navegador, no hacemos nada (el usuario entra)
        if (localStorage.getItem('ageVerified') === 'true') {
            return;
        }

        // Si NO está verificado, mostramos el Age Gate
        if (ageGate) {
            ageGate.style.display = 'flex';
        }
    }

    // 3. Botón "ENTER" (Sí soy mayor)
    if (btnYes) {
        btnYes.addEventListener('click', () => {
            // Guardamos que ya aceptó para que no salga siempre
            localStorage.setItem('ageVerified', 'true');

            // Ocultamos la caja
            ageGate.style.opacity = '0';
            setTimeout(() => {
                ageGate.style.display = 'none';
            }, 500);
        });
    }

    // 4. Botón "EXIT" (No soy mayor)
    if (btnNo) {
        btnNo.addEventListener('click', () => {
            // Redirigir a Google
            window.location.href = "https://www.google.es";
        });
    }

    // --- CÓDIGO EXISTENTE DE WOW ANIMATIONS Y MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.wow-fade-up, .reveal').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // --- 6. FAQ ACCORDION (NUEVO) ---
    const faqItems = document.querySelectorAll('.faq-brutal-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-brutal-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            const icon = question.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    if (icon.classList.contains('fa-plus')) icon.classList.replace('fa-plus', 'fa-minus');
                } else {
                    if (icon.classList.contains('fa-minus')) icon.classList.replace('fa-minus', 'fa-plus');
                }
            }
        });
    });
});
/* --- GOOGLE TRANSLATE CUSTOM --- */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es', // Base language of the website is Spanish
        includedLanguages: 'en,es,de,ca,it,fr,pt',
        autoDisplay: false
    }, 'google_translate_element');
}

// Función global para cambiar idioma (llamada desde el HTML)
window.changeLanguage = function (langCode) {
    // Guardar preferencia
    localStorage.setItem('preferredLanguage', langCode);

    // Forzar inmediatamente vía cookie para que si recarga o algo falle, ya esté
    if (langCode !== 'es') {
        document.cookie = `googtrans=/es/${langCode}; path=/`;
        document.cookie = `googtrans=/es/${langCode}; domain=${window.location.hostname}; path=/`;
    } else {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    }

    // Actualizar el botón del selector de idioma (bandera y texto)
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.innerHTML = `<span class="flag-icon flag-${langCode}"></span> ${langCode.toUpperCase()} <i class="fas fa-chevron-down" style="font-size:0.7rem;"></i>`;
    }

    // Disparar evento de Google Translate
    var select = document.querySelector(".goog-te-combo");
    if (select) {
        let optionExists = Array.from(select.options).some(opt => opt.value === langCode);
        if (langCode === 'es' && !optionExists) {
            select.value = ''; // Volver al idioma original de la página
        } else {
            select.value = langCode;
        }
        select.dispatchEvent(new Event('change'));
    } else {
        // En caso de que el select no exista aún, recargamos para aplicar la cookie
        window.location.reload();
    }
};

// Inicializar e inyectar configuraciones
(function () {
    // Por defecto ahora el sitio siempre forzará a Inglés ('en') si no hay otro guardado
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';

    // Pre-inyectar la cookie de traducción para que Google arranque ya en inglés sin delay visual
    if (savedLang !== 'es') {
        document.cookie = `googtrans=/es/${savedLang}; path=/`;
        document.cookie = `googtrans=/es/${savedLang}; domain=${window.location.hostname}; path=/`;
    }

    // Inyectar el contenedor de Google Translate dinámicamente si no existe
    if (!document.getElementById('google_translate_element')) {
        var gtDiv = document.createElement('div');
        gtDiv.id = 'google_translate_element';
        gtDiv.style.display = 'none';
        document.body.appendChild(gtDiv);
    }

    // Inyectar CSS para ocultar el popup/banner superior de Google
    const style = document.createElement('style');
    style.innerHTML = `
        body { top: 0 !important; }
        .goog-te-banner-frame { display: none !important; }
        .skiptranslate { display: none !important; }
        #goog-gt-tt { display: none !important; }
    `;
    document.head.appendChild(style);

    // Cargar script de Google dinámicamente
    var gtScript = document.createElement('script');
    gtScript.type = 'text/javascript';
    gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(gtScript);

    // Asegurar que el botón UI muestra el idioma seleccionado siempre en la primera carga
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.innerHTML = `<span class="flag-icon flag-${savedLang}"></span> ${savedLang.toUpperCase()} <i class="fas fa-chevron-down" style="font-size:0.7rem;"></i>`;
    }

    // Respaldo visual: Esperar a que cargue Google Translate para forzar el selector si la cookie falla
    const checkTranslateReady = setInterval(() => {
        var select = document.querySelector(".goog-te-combo");
        // Confirmar no solo que select existe, sino que ya se ha llenado con las opciones (más de 1 opción)
        if (select && select.options.length > 0) {
            clearInterval(checkTranslateReady);
            let optionExists = Array.from(select.options).some(opt => opt.value === savedLang);
            if (savedLang === 'es' && !optionExists) {
                select.value = '';
            } else if (optionExists) {
                select.value = savedLang;
            }
            select.dispatchEvent(new Event('change'));
        }
    }, 300);
})();
