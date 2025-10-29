// app.js - Interactivity and SPA Logic
document.addEventListener('DOMContentLoaded', () => {
    // SPA Navigation
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const pageSections = document.querySelectorAll('.page-section');

    function showSection(targetId) {
        pageSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        navLinks.forEach((link, index) => {
            link.classList.remove('active');
            if ((link.getAttribute('href') === targetId) || (link.textContent.trim().toLowerCase() === targetId.replace('#', ''))) {
                link.classList.add('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href') || `#${link.textContent.trim().toLowerCase()}`;
            showSection(href);
            // Handle burger close on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('nav-list').classList.remove('active');
                document.querySelector('[data-burger-toggle]').ariaExpanded = 'false';
                document.querySelector('[data-burger-toggle]').classList.remove('active');
            }
        });
    });

    // Initial load
    const initialHash = window.location.hash || '#hero';
    showSection(initialHash);

    // Hash change listener
    window.addEventListener('hashchange', () => showSection(window.location.hash || '#hero'));

    // Burger Menu
    const burger = document.querySelector('[data-burger-toggle]');
    const navList = document.getElementById('nav-list');
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Modal Handling with <dialog>
    const modal = document.getElementById('project-modal');
    const openTriggers = document.querySelectorAll('[data-open-modal]');
    const closeTriggers = document.querySelectorAll('[data-close-modal]');

    openTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.dataset.openModal === 'project' ? trigger.closest('.project-card')?.dataset.project : 'general';
            if (target && target !== 'general') {
                loadProjectModal(target);
            }
            modal.showModal();
        });
    });

    closeTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => modal.close());
    });

    modal.addEventListener('close', () => {
        document.querySelector('[data-modal-body]').innerHTML = '';
    });

    function loadProjectModal(projectId) {
        const projects = {
            medibook: '<h3>MediBook</h3><p>Full-stack MERN app for doctor bookings. Live: <a href="https://medibookonline.azurewebsites.net/">Demo</a></p>',
            plant: '<h3>Plant Disease Recognition</h3><p>CNN-based ML model. Live: <a href="https://plantdiseasedetectioncnn.streamlit.app/">Demo</a></p>',
            agentic: '<h3>Agentic RAG ChatBOT</h3><p>AI chatbot with RAG. Live: <a href="https://finbotchat.streamlit.app/">Demo</a></p>'
        };
        document.querySelector('[data-modal-body]').innerHTML = projects[projectId] || '<p>Project details loading...</p>';
    }

    // Form Handling
    const form = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            formBtn.disabled = !form.checkValidity();
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            alert('Form submitted! (In production, integrate with EmailJS or backend)');
            form.reset();
            formBtn.disabled = true;
        }
    });

    // Range slider value update
    const priorityRange = document.getElementById('priority');
    const priorityValue = document.getElementById('priority-value');
    if (priorityRange && priorityValue) {
        priorityRange.addEventListener('input', () => {
            priorityValue.textContent = priorityRange.value;
        });
    }

    // Skills animation on scroll (simple intersection observer)
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('progress').forEach((prog, index) => {
                    setTimeout(() => {
                        prog.style.setProperty('--progress-value', prog.value + '%');
                    }, index * 200);
                });
            }
        });
    });

    if (document.querySelector('#skills')) {
        skillsObserver.observe(document.querySelector('#skills'));
    }
});