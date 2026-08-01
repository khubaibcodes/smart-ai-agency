/* ============================================
  Smart AI Solutions — Main JavaScript
  ============================================ */

// ---- Performance Monitoring ----
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    console.log(`⚡ Performance Metrics:
      Total Load: ${pageLoadTime}ms
      Connection: ${connectTime}ms
      DOM Rendering: ${renderTime}ms`);

    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log(`📊 LCP: ${entry.renderTime || entry.loadTime}ms`);
            }
          });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {}
    }
  });
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ---- Scroll-triggered animations (AOS-lite) ----
const animatedEls = document.querySelectorAll('[data-aos]');
if (animatedEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));
}

// ---- Counter animation for stats ----
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    // Keep suffix (+ or %)
    const suffix = el.dataset.suffix || '';
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        el.dataset.suffix = suffix;
        animateCounter(el, num);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));
}

// ---- Email Service Config ----
let emailConfig = {
  supabase: { url: '', key: '' },
  emailjs: { serviceId: '', templateId: '', publicKey: '' }
};

// Load config from config.js if available
if (typeof CONFIG !== 'undefined') {
  CONFIG.then(config => {
    emailConfig.supabase = {
      url: config.VITE_SUPABASE_URL || '',
      key: config.VITE_SUPABASE_ANON_KEY || ''
    };
    emailConfig.emailjs = {
      serviceId: config.VITE_EMAILJS_SERVICE_ID || '',
      templateId: config.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: config.VITE_EMAILJS_PUBLIC_KEY || ''
    };
    if (emailConfig.emailjs.publicKey && window.emailjs) {
      window.emailjs.init(emailConfig.emailjs.publicKey);
    }
  }).catch(err => console.warn('Config load failed:', err));
}

// Fallback: Supabase direct credentials (for existing setup)
const SUPABASE_URL = 'https://mygwzigxuaoxzslkblks.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z3d6aWd4dWFveHpzbGtibGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTEyMTMsImV4cCI6MjA5MDM2NzIxM30.ZDb6NhE5BjKaVvOBRXuqOytKeOiDDFhH8DiiEyFt_zc';

function getSupabaseClient() {
  const url = emailConfig.supabase.url || SUPABASE_URL;
  const key = emailConfig.supabase.key || SUPABASE_ANON_KEY;
  if (window.supabase && window.supabase.createClient && url && key) {
    return window.supabase.createClient(url, key);
  }
  return null;
}

// ---- Contact form validation helpers ----
const formValidators = {
  firstName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'First name is required';
    if (trimmed.length < 2) return 'First name must be at least 2 characters';
    if (trimmed.length > 50) return 'First name must be under 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'First name contains invalid characters';
    return null;
  },
  lastName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Last name is required';
    if (trimmed.length < 2) return 'Last name must be at least 2 characters';
    if (trimmed.length > 50) return 'Last name must be under 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return 'Last name contains invalid characters';
    return null;
  },
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
    if (trimmed.length > 100) return 'Email is too long';
    return null;
  },
  service: (value) => {
    if (!value) return 'Please select a service';
    return null;
  },
  message: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Please describe your project';
    if (trimmed.length < 10) return 'Message must be at least 10 characters';
    if (trimmed.length > 2000) return 'Message must be under 2000 characters';
    return null;
  }
};

// ---- Contact form handling ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function displayFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.setAttribute('aria-invalid', 'true');
  field.style.borderColor = '#ef4444';
  field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';

  let errorEl = field.parentElement.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error';
    errorEl.style.cssText = 'color:#ef4444;font-size:0.85rem;margin-top:6px;margin-bottom:0;';
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.removeAttribute('aria-invalid');
  field.style.borderColor = '';
  field.style.boxShadow = '';

  const errorEl = field.parentElement.querySelector('.field-error');
  if (errorEl) errorEl.style.display = 'none';
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (formError) formError.style.display = 'none';

    const fields = ['firstName', 'lastName', 'email', 'service', 'message'];
    let hasErrors = false;

    fields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      const validator = formValidators[fieldId];
      if (!validator) return;

      const error = validator(field.value);
      if (error) {
        displayFieldError(fieldId, error);
        hasErrors = true;
      } else {
        clearFieldError(fieldId);
      }
    });

    if (hasErrors) return;

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const formData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      company: document.getElementById('company').value.trim() || 'Not specified',
      service: document.getElementById('service').value,
      budget: document.getElementById('budget').value || 'Not specified',
      message: document.getElementById('message').value.trim()
    };

    try {
      let emailSent = false;
      let emailError = null;

      // Try EmailJS first (preferred method)
      if (window.emailjs && emailConfig.emailjs.serviceId && emailConfig.emailjs.templateId) {
        try {
          await window.emailjs.send(
            emailConfig.emailjs.serviceId,
            emailConfig.emailjs.templateId,
            {
              to_email: 'smrtaisolutions@gmail.com',
              from_name: `${formData.firstName} ${formData.lastName}`,
              from_email: formData.email,
              company_name: formData.company,
              service_type: formData.service,
              budget_range: formData.budget,
              message: formData.message,
              reply_to: formData.email
            }
          );
          emailSent = true;
        } catch (emailErr) {
          emailError = emailErr;
          console.warn('EmailJS send failed, trying Supabase...', emailErr);
        }
      }

      // Fallback: Try Supabase for data storage
      const db = getSupabaseClient();
      if (db && !emailSent) {
        const { error } = await db.from('contact_submissions').insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company === 'Not specified' ? null : formData.company,
          service: formData.service,
          budget: formData.budget === 'Not specified' ? null : formData.budget,
          message: formData.message
        });
        if (error) throw error;
        emailSent = true;
      }

      // If nothing worked, throw error
      if (!emailSent) {
        throw emailError || new Error('No email service configured');
      }

      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        if (formSuccess) formSuccess.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        fields.forEach(fieldId => clearFieldError(fieldId));
      }, 5000);

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      if (formError) {
        formError.textContent = 'Unable to send message. Please try again or email us directly.';
        formError.style.display = 'block';
      }
      console.error('Form submission error:', err);
    }
  });

  // Real-time field validation on blur
  const validatedFields = ['firstName', 'lastName', 'email', 'service', 'message'];
  validatedFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.addEventListener('blur', () => {
      const validator = formValidators[fieldId];
      if (!validator) return;

      const error = validator(field.value);
      if (error) {
        displayFieldError(fieldId, error);
      } else {
        clearFieldError(fieldId);
      }
    });

    field.addEventListener('input', () => {
      clearFieldError(fieldId);
    });
  });
}

// ---- FAQ accordion ----
function toggleFaq(item) {
  const answer = item.querySelector('p');
  const icon = item.querySelector('i');
  const isOpen = answer.style.display === 'block';

  // Close all
  document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.faq-item i').forEach(i => i.style.transform = '');

  if (!isOpen) {
    answer.style.display = 'block';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

// ---- 3D hero visual (constellation network) ----
(function initHero3D() {
  const canvas = document.getElementById('hero3d');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 420) return;

  let renderer;
  try {
    const webglContext = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!webglContext) {
      console.warn('WebGL not supported, skipping 3D hero');
      return;
    }
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL initialization failed:', e);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 7;

  function setSize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const group = new THREE.Group();
  scene.add(group);

  // Constellation network — nodes distributed on a sphere, linked when close
  const NODE_COUNT = window.innerWidth < 768 ? 34 : 60;
  const RADIUS = 3.4;
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
    const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
    const r = RADIUS * (0.7 + Math.random() * 0.3);
    nodes.push(new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    ));
  }

  const pointsGeo = new THREE.BufferGeometry().setFromPoints(nodes);
  const pointsMat = new THREE.PointsMaterial({
    color: 0x67e8f9,
    size: 0.09,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  group.add(new THREE.Points(pointsGeo, pointsMat));

  const linePositions = [];
  const LINK_DIST = 1.7;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x2563eb,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  // Inner wireframe icosahedron for structure
  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.18 })
  );
  group.add(ico);

  setSize();
  window.addEventListener('resize', setSize);

  let targetTiltX = 0, targetTiltY = 0;
  let tiltX = 0, tiltY = 0, autoY = 0;
  window.addEventListener('mousemove', (e) => {
    targetTiltY = (e.clientX / window.innerWidth - 0.5) * 0.5;
    targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.35;
  });

  let running = true;
  let frameId = null;

  const handleVisibilityChange = () => {
    running = !document.hidden;
    if (running && !frameId) animate();
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  const handleBeforeUnload = () => {
    running = false;
    if (frameId) cancelAnimationFrame(frameId);
    renderer.dispose();
    pointsGeo.dispose();
    pointsMat.dispose();
    lineGeo.dispose();
    lineMat.dispose();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  function animate() {
    if (!running) { frameId = null; return; }
    frameId = requestAnimationFrame(animate);
    autoY += 0.0025;
    tiltX += (targetTiltX - tiltX) * 0.03;
    tiltY += (targetTiltY - tiltY) * 0.03;
    group.rotation.x = tiltX;
    group.rotation.y = autoY + tiltY;
    ico.rotation.y -= 0.0015;
    ico.rotation.x += 0.0011;
    renderer.render(scene, camera);
  }
  animate();
})();
