// ================================
// Theme Toggle + Liquid Glass Navbar
// ================================

const body = document.body;

const themeToggle =
    document.getElementById('themeToggle') ||
    document.getElementById('theme-btn');


// ================================
// Apply Saved Theme
// ================================

const savedTheme =
    localStorage.getItem('theme_v2');

if (savedTheme === 'dark') {
    body.classList.add('dark');
}


// ================================
// Theme Icon State
// ================================

function updateThemeIcons() {

    const isDark =
        body.classList.contains('dark');

    const sunIcon =
        document.querySelector('.sun-icon');

    const moonIcon =
        document.querySelector('.moon-icon');

    if (sunIcon) {

        sunIcon.style.opacity =
            isDark ? '0' : '1';

        sunIcon.style.transform =
            isDark
                ? 'rotate(90deg) scale(0)'
                : 'rotate(0deg) scale(1)';
    }

    if (moonIcon) {

        moonIcon.style.opacity =
            isDark ? '1' : '0';

        moonIcon.style.transform =
            isDark
                ? 'rotate(0deg) scale(1)'
                : 'rotate(-90deg) scale(0)';
    }
}

updateThemeIcons();


// ================================
// Liquid Glass Navbar
// ================================

// Supports both IDs:
// #navbar and your current #nav

const navbar =
    document.getElementById('navbar') ||
    document.getElementById('nav');

const navButtons =
    document.querySelectorAll('.nav-btn');

const activePill =
    document.getElementById('activePill') ||
    document.getElementById('active-pill');

const navGlare =
    document.getElementById('navGlare') ||
    document.getElementById('glare');


// ================================
// Navbar Scroll Activation
// Webcore-style .scrolled state
// ================================

let scrollTicking = false;

function updateNavbarScrollState() {

    if (!navbar) return;

    if (window.scrollY > 20) {

        navbar.classList.add('scrolled');

    } else {

        navbar.classList.remove('scrolled');
    }
}

function handleNavbarScroll() {

    if (!scrollTicking) {

        requestAnimationFrame(() => {

            updateNavbarScrollState();

            scrollTicking = false;
        });

        scrollTicking = true;
    }
}

window.addEventListener(
    'scroll',
    handleNavbarScroll,
    {
        passive: true
    }
);

// Set correct state when page loads
updateNavbarScrollState();


// ================================
// Active Navigation Pill
// ================================

function updateActivePill(
    button,
    smooth = true
) {

    if (!button || !activePill) return;

    activePill.style.transition =
        smooth
            ? 'transform .5s cubic-bezier(.34,1.2,.64,1), width .5s cubic-bezier(.34,1.2,.64,1)'
            : 'none';

    activePill.style.width =
        `${button.offsetWidth}px`;

    activePill.style.transform =
        `translateX(${button.offsetLeft}px)`;
}


// ================================
// Initialize Active Pill
// ================================

function initializeActivePill() {

    const activeButton =
        document.querySelector(
            '.nav-btn.active'
        );

    if (
        activeButton &&
        activePill &&
        window.innerWidth > 768
    ) {

        updateActivePill(
            activeButton,
            false
        );
    }
}

setTimeout(
    initializeActivePill,
    50
);


// ================================
// Desktop Navigation Click
// ================================

navButtons.forEach(button => {

    button.addEventListener(
        'click',
        () => {

            navButtons.forEach(btn => {

                btn.classList.remove(
                    'active'
                );

            });

            button.classList.add(
                'active'
            );


            if (
                window.innerWidth > 768
            ) {

                updateActivePill(
                    button,
                    true
                );
            }


            // Get target section

            const targetSelector =
                button.dataset.target ||
                button.getAttribute('href');


            if (targetSelector) {

                const target =
                    document.querySelector(
                        targetSelector
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

        }
    );

});


// ================================
// Mobile Menu
// ================================

const menuToggle =
    document.getElementById(
        'menuToggle'
    );

const mobileNav =
    document.getElementById(
        'mobileNav'
    );


if (
    menuToggle &&
    mobileNav
) {

    // Open / Close Mobile Menu

    menuToggle.addEventListener(
        'click',
        () => {

            const isOpen =
                mobileNav.classList.toggle(
                    'active'
                );


            menuToggle.classList.toggle(
                'active',
                isOpen
            );


            menuToggle.setAttribute(
                'aria-expanded',
                isOpen
                    ? 'true'
                    : 'false'
            );
        }
    );


    // Mobile Navigation Links

    mobileNav
        .querySelectorAll(
            '.mobile-nav-link'
        )
        .forEach(link => {

            link.addEventListener(
                'click',
                () => {

                    const targetSelector =
                        link.getAttribute(
                            'data-target'
                        ) ||
                        link.getAttribute(
                            'href'
                        );


                    if (targetSelector) {

                        const target =
                            document.querySelector(
                                targetSelector
                            );

                        if (target) {

                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }


                    // Update active mobile link

                    mobileNav
                        .querySelectorAll(
                            '.mobile-nav-link'
                        )
                        .forEach(item => {

                            item.classList.remove(
                                'active'
                            );

                        });


                    link.classList.add(
                        'active'
                    );


                    // Close mobile menu

                    mobileNav.classList.remove(
                        'active'
                    );

                    menuToggle.classList.remove(
                        'active'
                    );

                    menuToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }
            );

        });

}


// ================================
// Theme Toggle
// ================================

if (themeToggle) {

    themeToggle.addEventListener(
        'click',
        () => {

            body.classList.toggle(
                'dark'
            );


            const isDark =
                body.classList.contains(
                    'dark'
                );


            localStorage.setItem(
                'theme_v2',
                isDark
                    ? 'dark'
                    : 'light'
            );


            updateThemeIcons();


            const activeButton =
                document.querySelector(
                    '.nav-btn.active'
                );


            if (
                activeButton &&
                window.innerWidth > 768
            ) {

                updateActivePill(
                    activeButton,
                    true
                );
            }

        }
    );

}


// ================================
// Mouse-following Liquid Glare
// ================================

if (
    navbar &&
    navGlare
) {

    navbar.addEventListener(
        'mousemove',
        event => {

            const rect =
                navbar.getBoundingClientRect();


            navGlare.style.setProperty(
                '--x',
                `${event.clientX - rect.left}px`
            );


            navGlare.style.setProperty(
                '--y',
                `${event.clientY - rect.top}px`
            );

        }
    );

}


// ================================
// Resize - Recalculate Active Pill
// ================================

window.addEventListener(
    'resize',
    () => {

        if (
            window.innerWidth <= 768
        ) {

            return;
        }


        const activeButton =
            document.querySelector(
                '.nav-btn.active'
            );


        if (activeButton) {

            updateActivePill(
                activeButton,
                false
            );
        }

    }
);


// ================================
// Active Navigation Link on Scroll
// ================================

const sections =
    document.querySelectorAll(
        'section[id]'
    );


function updateActiveNavigation() {

    let current = '';


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 140;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute(
                    'id'
                );
        }

    });


    if (!current) return;


    // ================================
    // Desktop Navigation
    // ================================

    navButtons.forEach(button => {

        const target =
            button.dataset.target ||
            button.getAttribute('href');


        const isActive =
            target === `#${current}`;


        button.classList.toggle(
            'active',
            isActive
        );


        if (
            isActive &&
            window.innerWidth > 768
        ) {

            updateActivePill(
                button,
                true
            );
        }

    });


    // ================================
    // Mobile Navigation
    // ================================

    if (mobileNav) {

        mobileNav
            .querySelectorAll(
                '.mobile-nav-link'
            )
            .forEach(link => {

                const target =
                    link.getAttribute(
                        'data-target'
                    ) ||
                    link.getAttribute(
                        'href'
                    );


                link.classList.toggle(
                    'active',
                    target === `#${current}`
                );

            });
    }

}


window.addEventListener(
    'scroll',
    updateActiveNavigation,
    {
        passive: true
    }
);


// ================================
// Smooth Scroll for Anchor Links
// ================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            'click',
            function (e) {

                e.preventDefault();


                const target =
                    document.querySelector(
                        this.getAttribute(
                            'href'
                        )
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

            }
        );

    });


// ================================
// Scroll Animations
// ================================

const observerOptions = {

    root: null,

    rootMargin: '0px',

    threshold: 0.1
};


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        'visible'
                    );


                    // Trigger skill bar animations

                    if (
                        entry.target.querySelector(
                            '.skill-bar-fill'
                        )
                    ) {

                        entry.target
                            .querySelectorAll(
                                '.skill-bar-fill'
                            )
                            .forEach(bar => {

                                bar.classList.add(
                                    'animate'
                                );
                            });
                    }
                }
            });
        },
        observerOptions
    );


// Observe all elements

document
    .querySelectorAll(
        '.animate-on-scroll'
    )
    .forEach(el => {

        observer.observe(el);
    });
// ================================
// Contact Form Handling
// ================================

const contactForm =
    document.getElementById(
        'contactForm'
    );

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();

            const submitBtn =
                this.querySelector(
                    'button[type="submit"]'
                );

            const originalText =
                submitBtn.innerHTML;

            submitBtn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

            submitBtn.disabled = true;


            try {

                const response =
                    await fetch(
                        this.action,
                        {
                            method: 'POST',
                            body: new FormData(this),
                            headers: {
                                'Accept':
                                    'application/json'
                            }
                        }
                    );


                if (response.ok) {

                    showToast(
                        'Message sent successfully! I\'ll get back to you soon.',
                        'success'
                    );

                    this.reset();

                } else {

                    throw new Error(
                        'Failed to send message'
                    );

                }

            } catch (error) {

                showToast(
                    'Failed to send message. Please try again.',
                    'error'
                );

            } finally {

                submitBtn.innerHTML =
                    originalText;

                submitBtn.disabled = false;

            }

        }
    );

}


// ================================
// Toast Notifications
// ================================

function showToast(
    message,
    type = 'success'
) {

    const existingToast =
        document.querySelector('.toast');

    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement('div');

    toast.className =
        `toast toast-${type}`;


    toast.innerHTML = `
        <i class="fas ${
            type === 'success'
                ? 'fa-check-circle'
                : 'fa-exclamation-circle'
        }"></i>

        <span>${message}</span>
    `;


    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${
            type === 'success'
                ? 'hsl(145, 80%, 40%)'
                : 'hsl(0, 84%, 60%)'
        };
        color: white;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.style.animation =
            'slideOut 0.3s ease-out forwards';

        setTimeout(
            () => toast.remove(),
            300
        );

    }, 4000);

}


// ================================
// Toast Animation Keyframes
// ================================

const style =
    document.createElement('style');

style.textContent = `

    @keyframes slideIn {

        from {
            opacity: 0;
            transform: translateX(100%);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }

    }

    @keyframes slideOut {

        from {
            opacity: 1;
            transform: translateX(0);
        }

        to {
            opacity: 0;
            transform: translateX(100%);
        }

    }

`;

document.head.appendChild(style);


// ================================
// Profile Image Fallback
// ================================

document
    .querySelectorAll(
        '.profile-img, .bio-image img'
    )
    .forEach(img => {

        img.addEventListener(
            'error',
            function () {

                this.style.display = 'none';

                const fallback =
                    this.parentElement.querySelector(
                        '.profile-fallback, .bio-fallback'
                    );

                if (fallback) {
                    fallback.style.display =
                        'flex';
                }

            }
        );


        img.addEventListener(
            'load',
            function () {

                this.style.display =
                    'block';

                const fallback =
                    this.parentElement.querySelector(
                        '.profile-fallback, .bio-fallback'
                    );

                if (fallback) {
                    fallback.style.display =
                        'none';
                }

            }
        );

    });


// ================================
// Initial Page Animation Check
// ================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        setTimeout(() => {

            document
                .querySelectorAll(
                    '.animate-on-scroll'
                )
                .forEach(el => {

                    const rect =
                        el.getBoundingClientRect();

                    if (
                        rect.top <
                        window.innerHeight
                    ) {

                        el.classList.add(
                            'visible'
                        );

                    }

                });

        }, 100);

    }
);


// ================================
// Certificates Viewer
// ================================

const certsKey =
    'certificatesData_v1';

const certGrid =
    document.getElementById(
        'certificatesGrid'
    );


// Modal elements

const certModal =
    document.getElementById(
        'certModal'
    );

const certModalImage =
    document.getElementById(
        'certModalImage'
    );

const certModalTitle =
    document.getElementById(
        'certModalTitle'
    );

const certModalIssuer =
    document.getElementById(
        'certModalIssuer'
    );

const certModalDate =
    document.getElementById(
        'certModalDate'
    );

const certModalClose =
    document.getElementById(
        'certModalClose'
    );


let certificates = [];


function openModal(modal) {

    if (modal) {

        modal.setAttribute(
            'aria-hidden',
            'false'
        );

    }

}


function closeModal(modal) {

    if (modal) {

        modal.setAttribute(
            'aria-hidden',
            'true'
        );

    }

}


// ================================
// Seed Certificates
// ================================

function seedCertificatesFromDOM() {

    const existing =
        JSON.parse(
            localStorage.getItem(
                certsKey
            ) || 'null'
        );


    if (
        existing &&
        Array.isArray(existing)
    ) {

        certificates =
            existing;

        return;

    }


    const seed = [];


    document
        .querySelectorAll(
            '#certificatesGrid .certificate-card'
        )
        .forEach(card => {

            const titleEl =
                card.querySelector(
                    '.cert-content h3'
                );

            const issuerEl =
                card.querySelector(
                    '.cert-content .cert-issuer'
                );

            const dateEl =
                card.querySelector(
                    '.cert-content .cert-date'
                );

            const imgEl =
                card.querySelector(
                    '.cert-image-placeholder img'
                );


            seed.push({

                title:
                    titleEl
                        ? titleEl.textContent.trim()
                        : 'Certificate',

                issuer:
                    issuerEl
                        ? issuerEl.textContent.trim()
                        : '',

                date:
                    dateEl
                        ? dateEl.textContent.trim()
                        : '',

                image:
                    imgEl
                        ? imgEl.getAttribute('src')
                        : '',

                featured:
                    card.classList.contains(
                        'featured'
                    )

            });

        });


    certificates = seed;

    saveCertificates();

}


// ================================
// Save Certificates
// ================================

function saveCertificates() {

    localStorage.setItem(
        certsKey,
        JSON.stringify(certificates)
    );

}


// ================================
// Render Certificates
// ================================

function renderCertificates() {

    if (!certGrid) return;

    certGrid.innerHTML = '';


    certificates.forEach(
        (c, idx) => {

            const card =
                document.createElement(
                    'div'
                );


            card.className =
                'certificate-card animate-on-scroll' +
                (
                    c.featured
                        ? ' featured'
                        : ''
                );


            card.dataset.index = idx;


            card.innerHTML = `

                <div class="cert-icon ${
                    c.featured
                        ? 'trophy'
                        : 'award'
                }">

                    <i class="fas ${
                        c.featured
                            ? 'fa-trophy'
                            : 'fa-award'
                    }"></i>

                </div>


                <div class="cert-content">

                    <h3>
                        ${escapeHtml(c.title)}
                    </h3>

                    <p class="cert-issuer">
                        ${escapeHtml(c.issuer)}
                    </p>

                    <p class="cert-date">
                        ${escapeHtml(c.date)}
                    </p>

                </div>


                ${
                    c.featured
                        ? '<span class="cert-badge">🏆 Featured Achievement</span>'
                        : ''
                }


                <div
                    class="cert-image-placeholder"
                    title="Click to view certificate"
                >

                    <div class="cert-thumb">
                        View Certificate
                    </div>

                </div>

            `;


            card.addEventListener(
                'click',
                () => openCertViewer(idx)
            );


            certGrid.appendChild(card);

        }
    );


    // Re-observe

    document
        .querySelectorAll(
            '.animate-on-scroll'
        )
        .forEach(el => {

            observer.observe(el);

        });

}


// ================================
// Open Certificate Viewer
// ================================

function openCertViewer(index) {

    const c =
        certificates[index];


    certModalImage.innerHTML =
        c && c.image

            ? `
                <img
                    src="${escapeHtml(c.image)}"
                    alt="${escapeHtml(c.title)}"
                    onerror="this.parentElement.innerHTML='<p>Add image: ${escapeHtml(c.image)}</p>'"
                >
            `

            : `
                <div
                    style="
                        padding:1rem;
                        color:var(--muted-foreground)
                    "
                >
                    No image provided
                </div>
            `;


    certModalTitle.textContent =
        c && c.title
            ? c.title
            : 'Certificate';


    certModalIssuer.textContent =
        c && c.issuer
            ? c.issuer
            : '';


    certModalDate.textContent =
        c && c.date
            ? c.date
            : '';


    openModal(certModal);

}


// Certificate modal close

if (certModalClose) {

    certModalClose.addEventListener(
        'click',
        () => closeModal(certModal)
    );

}


const certModalOverlay =
    document.getElementById(
        'certModalOverlay'
    );


if (certModalOverlay) {

    certModalOverlay.addEventListener(
        'click',
        () => closeModal(certModal)
    );

}


// ================================
// Escape HTML
// ================================

function escapeHtml(str) {

    if (!str) return '';

    return String(str).replace(
        /[&<>"']/g,
        function (s) {

            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": "&#39;"
            }[s];

        }
    );

}


// Seed then render

seedCertificatesFromDOM();
renderCertificates();


// ================================
// Profile Hover Image Swap
// ================================

const profileWrapper =
    document.querySelector(
        '.profile-wrapper'
    );

const profileCircle =
    document.querySelector(
        '.profile-circle'
    );

const profileImg =
    document.querySelector(
        '.profile-img-main'
    );


if (
    profileWrapper &&
    profileImg
) {

    const originalSrc =
        profileImg.getAttribute(
            'src'
        );

    const altSrc =
        profileImg.getAttribute(
            'data-alt-src'
        );


    profileWrapper.addEventListener(
        'mouseenter',
        () => {

            if (altSrc) {

                profileImg.src =
                    altSrc;

            }


            if (profileCircle) {

                profileCircle.classList.add(
                    'swap-image'
                );

            }

        }
    );


    profileWrapper.addEventListener(
        'mouseleave',
        () => {

            profileImg.src =
                originalSrc;


            if (profileCircle) {

                profileCircle.classList.remove(
                    'swap-image'
                );

            }

        }
    );


    // Touch friendly

    profileWrapper.addEventListener(
        'click',
        () => {

            if (
                window.innerWidth <= 768 &&
                profileImg.src.endsWith(
                    originalSrc
                )
            ) {

                if (altSrc) {

                    profileImg.src =
                        altSrc;

                }


                if (profileCircle) {

                    profileCircle.classList.add(
                        'swap-image'
                    );

                }

            } else {

                profileImg.src =
                    originalSrc;


                if (profileCircle) {

                    profileCircle.classList.remove(
                        'swap-image'
                    );

                }

            }

        }
    );

}


// ================================
// Enhanced Scroll Animations
// ================================

// Stagger parents

const staggerParents = [

    document.querySelector(
        '.highlights-grid'
    ),

    document.querySelector(
        '.certificates-grid'
    ),

    document.querySelector(
        '.contact-grid'
    )

];


staggerParents.forEach(p => {

    if (p) {

        p.classList.add(
            'stagger-in'
        );

    }

});


// ================================
// Hero Glow Parallax
// ================================

const glow1 =
    document.querySelector(
        '.hero-glow-1'
    );

const glow2 =
    document.querySelector(
        '.hero-glow-2'
    );

const navbarEl =
    document.querySelector(
        '.navbar'
    );


window.addEventListener(
    'scroll',
    () => {

        const sc =
            window.scrollY;


        if (glow1) {

            glow1.style.transform =
                `translateY(${sc * -0.03}px) translateX(${sc * -0.02}px)`;

        }


        if (glow2) {

            glow2.style.transform =
                `translateY(${sc * 0.02}px) translateX(${sc * 0.01}px)`;

        }


        if (navbarEl) {

            navbarEl.classList.toggle(
                'scrolled',
                sc > 10
            );

        }

    }
);


// ================================
// Enhanced Observer
// ================================

const enhancedObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        'visible'
                    );


                    if (
                        entry.target.classList.contains(
                            'stagger-in'
                        )
                    ) {

                        Array
                            .from(
                                entry.target.children
                            )
                            .forEach(
                                (
                                    child,
                                    i
                                ) => {

                                    setTimeout(
                                        () => {

                                            if (
                                                child.classList
                                            ) {

                                                child.classList.add(
                                                    'visible'
                                                );

                                            }

                                        },
                                        i * 80
                                    );

                                }
                            );

                    }


                    // Certificate 3D entrance

                    if (
                        entry.target.id ===
                        'certificatesGrid'
                    ) {

                        entry.target
                            .querySelectorAll(
                                '.certificate-card'
                            )
                            .forEach(
                                (
                                    card,
                                    i
                                ) => {

                                    card.style.opacity =
                                        0;

                                    card.style.transform =
                                        'translateY(24px) rotateX(6deg)';


                                    setTimeout(
                                        () => {

                                            card.style.transition =
                                                'transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease';

                                            card.style.opacity =
                                                1;

                                            card.style.transform =
                                                'translateY(0) rotateX(0)';

                                        },
                                        i * 80
                                    );

                                }
                            );

                    }

                }

            });

        },
        {
            root: null,
            threshold: 0.08
        }
    );


// Observe stagger parents

document
    .querySelectorAll(
        '.stagger-in, #certificatesGrid'
    )
    .forEach(el => {

        enhancedObserver.observe(el);

    });


// ================================
// Technical Skills Showcase
// ================================

const skillsCategoryOrder = [
    'languages',
    'web',
    'backend',
    'databases',
    'tools',
    'ai'
];


const skillsNavItems =
    document.querySelectorAll(
        '.skills-nav-item'
    );

const skillsPanels =
    document.querySelectorAll(
        '.skills-panel'
    );

const skillsOrbitNodes =
    document.querySelectorAll(
        '.skills-orbit-node'
    );

const skillsPrevBtn =
    document.getElementById(
        'skillsPrevBtn'
    );

const skillsNextBtn =
    document.getElementById(
        'skillsNextBtn'
    );


// ================================
// Skills Mobile Buttons
// ================================

function updateSkillsMobileButtons(
    currentIndex
) {

    if (
        !skillsPrevBtn ||
        !skillsNextBtn
    ) return;


    if (currentIndex <= 0) {

        skillsPrevBtn.disabled =
            true;

        skillsPrevBtn.classList.add(
            'disabled'
        );

    } else {

        skillsPrevBtn.disabled =
            false;

        skillsPrevBtn.classList.remove(
            'disabled'
        );

    }


    if (
        currentIndex >=
        skillsCategoryOrder.length - 1
    ) {

        skillsNextBtn.disabled =
            true;

        skillsNextBtn.classList.add(
            'disabled'
        );

    } else {

        skillsNextBtn.disabled =
            false;

        skillsNextBtn.classList.remove(
            'disabled'
        );

    }

}


// ================================
// Set Skills Category
// ================================

function setSkillsCategory(
    category
) {

    const index =
        skillsCategoryOrder.indexOf(
            category
        );


    if (index === -1) return;


    skillsNavItems.forEach(item => {

        const isActive =
            item.dataset.category ===
            category;


        item.classList.toggle(
            'active',
            isActive
        );


        item.setAttribute(
            'aria-selected',
            isActive
                ? 'true'
                : 'false'
        );


        if (isActive) {

            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });

        }

    });


    skillsPanels.forEach(panel => {

        const isActive =
            panel.dataset.category ===
            category;


        panel.classList.toggle(
            'active',
            isActive
        );


        panel.setAttribute(
            'aria-hidden',
            isActive
                ? 'false'
                : 'true'
        );

    });


    skillsOrbitNodes.forEach(node => {

        node.classList.toggle(
            'active',
            Number(
                node.dataset.orbit
            ) === index
        );

    });


    // Re-stagger chips

    const activePanel =
        document.querySelector(
            `.skills-panel[data-category="${category}"]`
        );


    if (activePanel) {

        activePanel
            .querySelectorAll(
                '.skill-chip'
            )
            .forEach(
                (
                    chip,
                    i
                ) => {

                    chip.style.transition =
                        'none';

                    chip.style.opacity =
                        '0';

                    chip.style.transform =
                        'translateY(10px)';


                    requestAnimationFrame(
                        () => {

                            chip.style.transition =
                                '';

                            chip.style.opacity =
                                '';

                            chip.style.transform =
                                '';

                            chip.style.transitionDelay =
                                `${0.05 + i * 0.05}s`;

                        }
                    );

                }
            );

    }


    updateSkillsMobileButtons(
        index
    );

}


// ================================
// Skills Navigation Events
// ================================

skillsNavItems.forEach(item => {

    item.addEventListener(
        'click',
        () =>
            setSkillsCategory(
                item.dataset.category
            )
    );


    item.addEventListener(
        'keydown',
        e => {

            if (
                e.key === 'Enter' ||
                e.key === ' '
            ) {

                e.preventDefault();

                setSkillsCategory(
                    item.dataset.category
                );

            }

        }
    );

});


// Previous

if (skillsPrevBtn) {

    skillsPrevBtn.addEventListener(
        'click',
        () => {

            const activeItem =
                document.querySelector(
                    '.skills-nav-item.active'
                );


            if (!activeItem) return;


            const currentCategory =
                activeItem.dataset.category;


            const currentIndex =
                skillsCategoryOrder.indexOf(
                    currentCategory
                );


            if (currentIndex > 0) {

                setSkillsCategory(
                    skillsCategoryOrder[
                        currentIndex - 1
                    ]
                );

            }

        }
    );

}


// Next

if (skillsNextBtn) {

    skillsNextBtn.addEventListener(
        'click',
        () => {

            const activeItem =
                document.querySelector(
                    '.skills-nav-item.active'
                );


            if (!activeItem) return;


            const currentCategory =
                activeItem.dataset.category;


            const currentIndex =
                skillsCategoryOrder.indexOf(
                    currentCategory
                );


            if (
                currentIndex <
                skillsCategoryOrder.length - 1
            ) {

                setSkillsCategory(
                    skillsCategoryOrder[
                        currentIndex + 1
                    ]
                );

            }

        }
    );

}


// Initialize orbit

if (skillsOrbitNodes.length) {

    skillsOrbitNodes[0]
        .classList.add('active');

}


// Initialize mobile buttons

const initialActiveTab =
    document.querySelector(
        '.skills-nav-item.active'
    );


if (initialActiveTab) {

    const initialIndex =
        skillsCategoryOrder.indexOf(
            initialActiveTab.dataset.category
        );


    updateSkillsMobileButtons(
        initialIndex !== -1
            ? initialIndex
            : 0
    );

}


// ================================
// Skills Showcase Observer
// ================================

const skillsShowcase =
    document.querySelector(
        '.skills-showcase'
    );


if (skillsShowcase) {

    const skillsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'visible'
                            );


                            const activePanel =
                                entry.target.querySelector(
                                    '.skills-panel.active'
                                );


                            if (activePanel) {

                                activePanel
                                    .querySelectorAll(
                                        '.skill-chip'
                                    )
                                    .forEach(
                                        (
                                            chip,
                                            i
                                        ) => {

                                            chip.style.transitionDelay =
                                                `${0.05 + i * 0.05}s`;

                                        }
                                    );

                            }

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    skillsShowcase.classList.add(
        'animate-on-scroll'
    );


    skillsObserver.observe(
        skillsShowcase
    );


    document
        .querySelectorAll(
            '.skills-header'
        )
        .forEach(el => {

            skillsObserver.observe(el);

        });

}


// ================================
// Projects Overlay
// ================================

const projectData = [

    {
        num: '01',
        category: 'Web Application',
        title: 'Bridge 2 Alumni (B2A)',
        desc: 'An alumni networking platform that bridges the gap between students and graduates. Built to foster real-time connections, mentorship, and career opportunities within the college community using Firebase as the backend.',
        features: [
            'Real-time Firebase database for live data sync',
            'Alumni directory with searchable profiles',
            'Mentorship connect & request system',
            'Responsive design across all screen sizes',
            'Secure authentication & user management',
            'Event announcements & community board'
        ],
        stack: [
            'HTML',
            'CSS',
            'JavaScript',
            'Firebase'
        ],
        liveUrl:
            'https://nct-bca.github.io/Alumini-connect/'
    },


    {
        num: '02',
        category: 'Prototype / Team Project',
        title: 'SafeOffice 3.0',
        desc: 'A team-based prototype exploring a digital approach to workplace safety management, designed to demonstrate safety awareness, reporting, monitoring, and practical workplace workflows through an interactive web experience.',
        features: [
            'Safety incident reporting and awareness workflows',
            'Interactive workplace monitoring dashboard demo',
            'Safety management and checklist features',
            'Team-built collaborative prototype',
            'Responsive design across all devices'
        ],
        stack: [
            'HTML',
            'CSS',
            'JavaScript',
            'Prototype'
        ],
        liveUrl:
            'https://rilwankhan.github.io/Safeoffice-3.0/'
    },


    {
        num: '03',
        category: 'E-Commerce',
        title: 'E-Commerce Website',
        desc: 'A modern full-featured e-commerce platform with a polished responsive UI, seamless product browsing, WhatsApp-based order integration, payment functionality, and complete data management for a smooth shopping experience.',
        features: [
            'Responsive product catalog with filters',
            'WhatsApp API order integration',
            'Payment gateway support',
            'Dynamic product data management',
            'Cart & checkout flow',
            'Mobile-first responsive design'
        ],
        stack: [
            'HTML',
            'CSS',
            'JavaScript',
            'WhatsApp API'
        ],
        liveUrl: null
    },


    {
        num: '04',
        category: 'Startup / Business Website',
        title: 'Bottle Media',
        desc: 'A professional digital solutions website created for the Bottle Media startup, showcasing its services, brand identity, business process, achievements, and client-focused digital solutions.',
        features: [
            'Professional startup-focused website design',
            'Responsive and modern user interface',
            'Service showcase for Website Development, Digital Marketing, Chatbots, and Personal Branding',
            'Interactive sections for company process, achievements, clients, and testimonials',
            'Contact and inquiry section',
            'Mobile-friendly design across all devices'
        ],
        stack: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'Responsive UI',
            'UI/UX'
        ],
        liveUrl:
            'https://rilwankhan.github.io/bottlemedia/'
    },


    {
        num: '05',
        category: 'Freelance Project',
        title: 'Fruit House',
        desc: 'A vibrant wellness website for Fruit House, showcasing its premium fruit bowls, smoothies, and naturally nourishing menu through an inviting digital experience designed to turn healthy living into an everyday ritual.',
        features: [
            'Curated menu with wellness-focused categories',
            'Product details with ingredients and calorie information',
            'Health benefits and visual gallery sections',
            'WhatsApp, Google Maps, and Instagram contact integration',
            'Responsive design across desktop and mobile devices'
        ],
        stack: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'Responsive UI',
            'WhatsApp Integration'
        ],
        liveUrl:
            'https://rilwankhan.github.io/Fruithouse/'
    }

];


// ================================
// Open Project Overlay
// ================================

function openProjectOverlay(index) {

    const overlay =
        document.getElementById(
            'projectOverlay'
        );

    const content =
        document.getElementById(
            'projectOverlayContent'
        );


    const p =
        projectData[index];


    const liveBtn =
        p.liveUrl

            ? `
                <a
                    href="${p.liveUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-live-demo"
                >
                    Live Demo
                    <span class="demo-arrow">
                        ↗
                    </span>
                </a>
            `

            : '';


    content.innerHTML = `

        <p class="overlay-eyebrow">
            ${p.num} &mdash; ${p.category}
        </p>

        <h2 class="overlay-title">
            ${p.title}
        </h2>

        <p class="overlay-desc">
            ${p.desc}
        </p>

        <div class="overlay-divider"></div>

        <p class="overlay-section-label">
            Key Features
        </p>

        <div class="overlay-features">

            ${p.features
                .map(
                    f => `
                        <div class="overlay-feature">
                            <i class="fas fa-circle-dot"></i>
                            ${f}
                        </div>
                    `
                )
                .join('')}

        </div>

        <p class="overlay-section-label">
            Tech Stack
        </p>

        <div class="overlay-stack">

            ${p.stack
                .map(
                    s => `
                        <span class="stack-tag">
                            ${s}
                        </span>
                    `
                )
                .join('')}

        </div>

        <div class="overlay-actions">
            ${liveBtn}
        </div>

    `;


    overlay.setAttribute(
        'aria-hidden',
        'false'
    );


    document.body.style.overflow =
        'hidden';

}


// ================================
// Close Project Overlay
// ================================

function closeProjectOverlay() {

    const overlay =
        document.getElementById(
            'projectOverlay'
        );


    if (!overlay) return;


    overlay.setAttribute(
        'aria-hidden',
        'true'
    );


    document.body.style.overflow =
        '';

}


// Escape key

document.addEventListener(
    'keydown',
    e => {

        if (e.key === 'Escape') {

            closeProjectOverlay();

        }

    }
);


// Observe project rows

document
    .querySelectorAll(
        '.project-row'
    )
    .forEach(row => {

        observer.observe(row);

    });


// ================================
// Certificate Modal Functionality
// ================================

function openCertificate(
    certType
) {

    const modal =
        document.getElementById(
            'certificateModal'
        );

    const img =
        document.getElementById(
            'certificateImage'
        );

    const title =
        document.getElementById(
            'certificateTitle'
        );


    const certificates = {

        'iot': {
            image:
                'Rilwankhan IOT Software Analyst.png',
            title:
                'IoT Software Analyst Certification'
        },

        'tri': {
            image:
                'Rilwankhan Tri Stone intern.png',
            title:
                'Digital Marketing Internship Certification'
        },

        'web-dev': {
            image:
                'full.jpg',
            title:
                'Full Stack Development Certification'
        },

        'ui-ux': {
            image:
                'ui.jpg',
            title:
                'UI/UX Design Certification'
        },

        'Ai-full': {
            image:
                'fullai.jpg',
            title:
                'AI Full-Stack Development Certification'
        },

        'B2A': {
            image:
                'fullai.jpg',
            title:
                'B2A Project Completion Certification'
        },

        'hackathon': {
            image:
                'JET.jpg',
            title:
                'Jet Hackathon Runner UP Certification'
        },

        'jmc': {
            image:
                'Rilwankhan JMC second.png',
            title:
                'Prompt-X Runner Up Certification'
        },

        'sih': {
            image:
                'Rilwankhan SIH.png',
            title:
                'Smart India Hackathon 2025 – Innovation Project'
        },

        'ibm': {
            image:
                'Rilwankhan IBM 1st.png',
            title:
                'IBM SkillsBuild – Innovation Project'
        }

    };


    if (
        certificates[certType]
    ) {

        img.src =
            certificates[
                certType
            ].image;


        img.alt =
            certificates[
                certType
            ].title;


        title.textContent =
            certificates[
                certType
            ].title;


        modal.classList.add(
            'active'
        );

    }

}


// ================================
// Close Certificate Modal
// ================================

function closeCertificate() {

    const modal =
        document.getElementById(
            'certificateModal'
        );


    if (modal) {

        modal.classList.remove(
            'active'
        );

    }

}


// ================================
// Certificate Modal Events
// ================================

const certificateModal =
    document.getElementById(
        'certificateModal'
    );


const closeBtn =
    document.querySelector(
        '.close'
    );


if (closeBtn) {

    closeBtn.addEventListener(
        'click',
        closeCertificate
    );

}


if (certificateModal) {

    window.addEventListener(
        'click',
        e => {

            if (
                e.target ===
                certificateModal
            ) {

                closeCertificate();

            }

        }
    );

}
