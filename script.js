// ================================
// Theme Toggle
// ================================
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcons();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcons();
});

function updateThemeIcons() {
    const isDark = body.classList.contains('dark');
    sunIcon.style.display = isDark ? 'block' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'block';
}

// ================================
// Mobile Menu Toggle
// ================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ================================
// Scroll Animations
// ================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations
            if (entry.target.querySelector('.skill-bar-fill')) {
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.classList.add('animate');
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ================================
// Active Navigation Link
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ================================
// Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// Contact Form Handling
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ================================
// Toast Notifications
// ================================
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'hsl(145, 80%, 40%)' : 'hsl(0, 84%, 60%)'};
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
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add animation keyframes
const style = document.createElement('style');
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
// Navbar Background on Scroll
// ================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ================================
// Profile Image Fallback
// ================================
document.querySelectorAll('.profile-img, .bio-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.parentElement.querySelector('.profile-fallback, .bio-fallback');
        if (fallback) {
            fallback.style.display = 'flex';
        }
    });
    
    img.addEventListener('load', function() {
        this.style.display = 'block';
        const fallback = this.parentElement.querySelector('.profile-fallback, .bio-fallback');
        if (fallback) {
            fallback.style.display = 'none';
        }
    });
});

// Initialize - check if images exist
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animation check
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// ================================
// Certificates CRUD + Modals (client-side, password-protected)
// ================================
const CERT_PASSWORD = 'RILWANKHAN@200507';
const certsKey = 'certificatesData_v1';
const certGrid = document.getElementById('certificatesGrid');
const manageBtn = document.getElementById('manageCertsBtn');

// Modal elements
const certModal = document.getElementById('certModal');
const certModalImage = document.getElementById('certModalImage');
const certModalTitle = document.getElementById('certModalTitle');
const certModalIssuer = document.getElementById('certModalIssuer');
const certModalDate = document.getElementById('certModalDate');
const certModalClose = document.getElementById('certModalClose');

const certAdminModal = document.getElementById('certAdminModal');
const certAdminClose = document.getElementById('certAdminClose');
const certAdminUnlock = document.getElementById('certAdminUnlock');
const certAdminPassword = document.getElementById('certAdminPassword');
const certAdminAuth = document.getElementById('certAdminAuth');
const certAdminPanel = document.getElementById('certAdminPanel');
const certForm = document.getElementById('certForm');
const certAdminList = document.getElementById('certAdminList');
const certFormCancel = document.getElementById('certFormCancel');

let certificates = [];
let adminUnlocked = false;
let editIndex = -1;

function openModal(modal) { modal.setAttribute('aria-hidden', 'false'); }
function closeModal(modal) { modal.setAttribute('aria-hidden', 'true'); }

// Seed certificates from DOM if localStorage empty
function seedCertificatesFromDOM() {
    const existing = JSON.parse(localStorage.getItem(certsKey) || 'null');
    if (existing && Array.isArray(existing)) { certificates = existing; return; }

    const seed = [];
    document.querySelectorAll('#certificatesGrid .certificate-card').forEach(card => {
        const titleEl = card.querySelector('.cert-content h3');
        const issuerEl = card.querySelector('.cert-content .cert-issuer');
        const dateEl = card.querySelector('.cert-content .cert-date');
        const imgEl = card.querySelector('.cert-image-placeholder img');
        seed.push({
            title: titleEl ? titleEl.textContent.trim() : 'Certificate',
            issuer: issuerEl ? issuerEl.textContent.trim() : '',
            date: dateEl ? dateEl.textContent.trim() : '',
            image: imgEl ? imgEl.getAttribute('src') : '',
            featured: card.classList.contains('featured')
        });
    });
    certificates = seed;
    saveCertificates();
}

function saveCertificates() {
    localStorage.setItem(certsKey, JSON.stringify(certificates));
}

function renderCertificates() {
    certGrid.innerHTML = '';
    certificates.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'certificate-card animate-on-scroll' + (c.featured ? ' featured' : '');
        card.dataset.index = idx;
        card.innerHTML = `
            <div class="cert-icon ${c.featured ? 'trophy' : 'award'}">
                <i class="fas ${c.featured ? 'fa-trophy' : 'fa-award'}"></i>
            </div>
            <div class="cert-content">
                <h3>${escapeHtml(c.title)}</h3>
                <p class="cert-issuer">${escapeHtml(c.issuer)}</p>
                <p class="cert-date">${escapeHtml(c.date)}</p>
            </div>
            ${c.featured ? '<span class="cert-badge">🏆 Featured Achievement</span>' : ''}
            <div class="cert-image-placeholder" title="Click to view certificate">
                <div class="cert-thumb">View Certificate</div>
            </div>
        `;

        // click to open viewer
        card.addEventListener('click', (e) => {
            // if clicked on admin controls, ignore
            if (e.target.closest('.admin-actions')) return;
            openCertViewer(idx);
        });

        certGrid.appendChild(card);
    });

    // Re-observe animate on scroll classes for new elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function openCertViewer(index) {
    const c = certificates[index];
    certModalImage.innerHTML = c.image ? `<img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}" onerror="this.parentElement.innerHTML='<p>Add image: ${escapeHtml(c.image)}</p>'">` : '<div style="padding:1rem;color:var(--muted-foreground)">No image provided</div>';
    certModalTitle.textContent = c.title || 'Certificate';
    certModalIssuer.textContent = c.issuer || '';
    certModalDate.textContent = c.date || '';
    openModal(certModal);
}

certModalClose.addEventListener('click', () => closeModal(certModal));
document.getElementById('certModalOverlay').addEventListener('click', () => closeModal(certModal));

// Admin panel
manageBtn.addEventListener('click', () => { openModal(certAdminModal); });
certAdminClose.addEventListener('click', () => { closeAdmin(); });
document.getElementById('certAdminOverlay').addEventListener('click', () => { closeAdmin(); });

function closeAdmin() {
    closeModal(certAdminModal);
    adminUnlocked = false;
    certAdminAuth.style.display = 'flex';
    certAdminPanel.style.display = 'none';
    certAdminPassword.value = '';
}

certAdminUnlock.addEventListener('click', () => {
    const val = certAdminPassword.value || '';
    if (val === CERT_PASSWORD) {
        adminUnlocked = true;
        certAdminAuth.style.display = 'none';
        certAdminPanel.style.display = 'block';
        refreshAdminList();
    } else {
        showToast('Incorrect password', 'error');
    }
});

// Password visibility toggle and cancel
const certPasswordToggle = document.getElementById('certPasswordToggle');
const certAdminCancel = document.getElementById('certAdminCancel');
if (certPasswordToggle) {
    certPasswordToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (certAdminPassword.type === 'password') {
            certAdminPassword.type = 'text';
            certPasswordToggle.textContent = 'Hide';
        } else {
            certAdminPassword.type = 'password';
            certPasswordToggle.textContent = 'Show';
        }
    });
}
if (certAdminCancel) {
    certAdminCancel.addEventListener('click', () => closeAdmin());
}

function refreshAdminList() {
    certAdminList.innerHTML = '';
    certificates.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="meta">
                <strong>${escapeHtml(c.title)}</strong>
                <div style="font-size:0.85rem;color:var(--muted-foreground);">${escapeHtml(c.issuer)} • ${escapeHtml(c.date)}</div>
            </div>
            <div class="admin-actions">
                <button class="btn btn-outline" data-edit="${idx}">Edit</button>
                <button class="btn btn-outline" data-delete="${idx}">Delete</button>
            </div>
        `;

        item.querySelector('[data-edit]') .addEventListener('click', (e) => {
            e.stopPropagation();
            openEditForm(parseInt(e.target.dataset.edit, 10));
        });
        item.querySelector('[data-delete]').addEventListener('click', (e) => {
            e.stopPropagation();
            attemptDelete(parseInt(e.target.dataset.delete, 10));
        });

        certAdminList.appendChild(item);
    });
}

function openEditForm(index) {
    editIndex = index;
    const c = certificates[index];
    document.getElementById('certTitle').value = c.title || '';
    document.getElementById('certIssuer').value = c.issuer || '';
    document.getElementById('certDate').value = c.date || '';
    document.getElementById('certImageUrl').value = c.image || '';
    document.getElementById('certFeatured').checked = !!c.featured;
}

function attemptDelete(index) {
    const pw = prompt('Enter password to delete certificate:');
    if (pw === CERT_PASSWORD) {
        certificates.splice(index, 1);
        saveCertificates();
        renderCertificates();
        refreshAdminList();
        showToast('Certificate deleted', 'success');
    } else {
        showToast('Incorrect password', 'error');
    }
}

certFormCancel.addEventListener('click', (e) => {
    e.preventDefault();
    certForm.reset();
    editIndex = -1;
});

certForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!adminUnlocked) { showToast('Unlock admin first', 'error'); return; }
    const title = document.getElementById('certTitle').value.trim();
    const issuer = document.getElementById('certIssuer').value.trim();
    const date = document.getElementById('certDate').value.trim();
    const image = document.getElementById('certImageUrl').value.trim();
    const featured = document.getElementById('certFeatured').checked;

    const payload = { title, issuer, date, image, featured };
    if (editIndex >= 0) {
        certificates[editIndex] = payload;
        showToast('Certificate updated', 'success');
    } else {
        certificates.unshift(payload); // newest first
        showToast('Certificate added', 'success');
    }
    saveCertificates();
    renderCertificates();
    refreshAdminList();
    certForm.reset();
    editIndex = -1;
});

// Escape helper to avoid inserting raw HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (s) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s];
    });
}

// Seed then render
seedCertificatesFromDOM();
renderCertificates();

// Profile hover: swap to second image on hover and add animation
const profileWrapper = document.querySelector('.profile-wrapper');
const profileCircle = document.querySelector('.profile-circle');
const profileImg = document.querySelector('.profile-img-main');
if (profileWrapper && profileImg) {
    const originalSrc = profileImg.getAttribute('src');
    const altSrc = profileImg.getAttribute('data-alt-src');
    profileWrapper.addEventListener('mouseenter', () => {
        if (altSrc) {
            profileImg.src = altSrc;
        }
        if (profileCircle) profileCircle.classList.add('swap-image');
    });
    profileWrapper.addEventListener('mouseleave', () => {
        profileImg.src = originalSrc;
        if (profileCircle) profileCircle.classList.remove('swap-image');
    });
    // touch friendly: tap to toggle on small devices
    profileWrapper.addEventListener('click', () => {
        if (window.innerWidth <= 768 && profileImg.src.endsWith(originalSrc)) {
            if (altSrc) profileImg.src = altSrc;
            if (profileCircle) profileCircle.classList.add('swap-image');
        } else {
            profileImg.src = originalSrc;
            if (profileCircle) profileCircle.classList.remove('swap-image');
        }
    });
}

// ================================
// Enhanced Scroll Animations (stagger + parallax subtle)
// ================================
// make certificates grid children stagger-in
const staggerParents = [document.querySelector('.highlights-grid'), document.querySelector('.certificates-grid'), document.querySelector('.contact-grid')];
staggerParents.forEach(p => { if (p) p.classList.add('stagger-in'); });

// Slight parallax for hero glows
const glow1 = document.querySelector('.hero-glow-1');
const glow2 = document.querySelector('.hero-glow-2');
window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if (glow1) glow1.style.transform = `translateY(${sc * -0.03}px) translateX(${sc * -0.02}px)`;
    if (glow2) glow2.style.transform = `translateY(${sc * 0.02}px) translateX(${sc * 0.01}px)`;
});

// When observer makes an element visible, add stagger class handling
const prevObserverCallback = observer.callback;
// We can't directly override the IntersectionObserver's callback; instead re-create a new observer
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stagger-in')) {
                // add tiny transform/timing to children
                Array.from(entry.target.children).forEach((child, i) => {
                    setTimeout(() => child.classList && child.classList.add('visible'), i * 80);
                });
            }

            // special handling for certificates grid: animate each card with 3D tilt entrance
            if (entry.target.id === 'certificatesGrid') {
                entry.target.querySelectorAll('.certificate-card').forEach((card, i) => {
                    card.style.opacity = 0;
                    card.style.transform = 'translateY(24px) rotateX(6deg)';
                    setTimeout(() => {
                        card.style.transition = 'transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease';
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0) rotateX(0)';
                    }, i * 80);
                });
            }
        }
    });
}, { root: null, threshold: 0.08 });

// observe stagger parents and certificates grid
document.querySelectorAll('.stagger-in, #certificatesGrid').forEach(el => enhancedObserver.observe(el));

