document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
        });
    });


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------- Certifications Modal --------
    const certificationBadge = document.querySelector('.fa-certificate').closest('div');
    const certificationModal = document.getElementById('certification-modal');
    const closeCertificationBtn = document.getElementById('close-certification');

    if (certificationBadge && certificationModal && closeCertificationBtn) {
        certificationBadge.style.cursor = 'pointer';
        certificationBadge.addEventListener('click', () => {
            certificationModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });

        closeCertificationBtn.addEventListener('click', () => {
            certificationModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });

        // Close modal on background click
        certificationModal.addEventListener('click', e => {
            if (e.target === certificationModal) {
                certificationModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }


    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
            backToTopButton.classList.remove('invisible', 'opacity-0');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.classList.add('invisible', 'opacity-0');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.skill-card, .project-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load


    /* ---------- CONTACT FORM (Formspree) ---------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Sending…';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent.');
                    contactForm.reset();
                } else {
                    throw new Error('Network error');
                }
            } catch (err) {
                alert('Oops! Something went wrong. Please try again later.');
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }
});
