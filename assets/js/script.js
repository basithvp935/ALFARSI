/**
 * AL FARSI PHYSIOTHERAPY CENTER
 * مركز الفارسي للعلاج الطبيعي
 * Main JavaScript File (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Sticky Navigation & Scroll Effects ---
  const navbar = document.querySelector('.site-navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 2. Mobile Menu Auto-close On Navigation Link Click ---
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
  // --- 2b. Hero Heading Typewriter Writing Effect ---
  const typewriterTarget = document.getElementById('typewriterTarget');
  if (typewriterTarget) {
    const phrases = [
      'Live Better.',
      'Heal Faster.',
      'Move Confidently.',
      'Feel Stronger.',
      'Restore Mobility.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Start with blank to demonstrate live writing type animation
    typewriterTarget.textContent = '';

    const typeSpeed = 85;
    const deleteSpeed = 40;
    const pauseDelay = 1800;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex);
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = 300;
      }

      setTimeout(typeLoop, timeout);
    };

    // Begin typing shortly after page render
    setTimeout(typeLoop, 350);
  }

  // --- 3. Scroll Reveal Animations with IntersectionObserver ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- 4. Animated Counters ---
  const counterElements = document.querySelectorAll('.counter-value');
  let countersTriggered = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      let current = 0;
      const duration = 1800; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.hero-trust-bar');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersTriggered) {
        countersTriggered = true;
        animateCounters();
      }
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // --- 5. Active Navigation Link Highlighting On Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      const correspondingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (correspondingNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingNavLink.classList.add('active');
        } else {
          correspondingNavLink.classList.remove('active');
        }
      }
    });
  });

  // --- 6. Interactive Appointment Form Validation & Feedback ---
  const appointmentForm = document.getElementById('appointmentForm');
  const formAlert = document.getElementById('formAlert');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const email = document.getElementById('email');
      const service = document.getElementById('serviceSelect');
      const preferredDate = document.getElementById('preferredDate');
      const message = document.getElementById('message');

      let isValid = true;

      // Validate Full Name
      if (!fullName.value.trim() || fullName.value.trim().length < 3) {
        setInvalid(fullName, 'Please enter your full name (at least 3 characters).');
        isValid = false;
      } else {
        setValid(fullName);
      }

      // Validate Phone Number
      const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phoneNumber.value.trim())) {
        setInvalid(phoneNumber, 'Please enter a valid contact phone number.');
        isValid = false;
      } else {
        setValid(phoneNumber);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        setInvalid(email, 'Please enter a valid email address.');
        isValid = false;
      } else {
        setValid(email);
      }

      // Validate Service
      if (!service.value) {
        setInvalid(service, 'Please select the physiotherapy service you need.');
        isValid = false;
      } else {
        setValid(service);
      }

      // Validate Preferred Date
      if (!preferredDate.value) {
        setInvalid(preferredDate, 'Please select your preferred appointment date.');
        isValid = false;
      } else {
        setValid(preferredDate);
      }

      if (isValid) {
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Connecting to WhatsApp...';

        // Prepare WhatsApp message payload
        const waNumber = '96871704990';
        let waMessage = `*New Appointment Request - Al Farsi Physiotherapy Center*\n`;
        waMessage += `━━━━━━━━━━━━━━━━━━━━━\n`;
        waMessage += `👤 *Patient Name:* ${fullName.value.trim()}\n`;
        waMessage += `📞 *Phone Number:* ${phoneNumber.value.trim()}\n`;
        waMessage += `✉️ *Email:* ${email.value.trim()}\n`;
        waMessage += `🩺 *Service Needed:* ${service.options[service.selectedIndex].text}\n`;
        waMessage += `📅 *Preferred Date:* ${preferredDate.value}\n`;
        if (message.value.trim()) {
          waMessage += `📝 *Notes / Symptoms:* ${message.value.trim()}\n`;
        }
        waMessage += `━━━━━━━━━━━━━━━━━━━━━\n`;
        waMessage += `_Requested via Al Farsi Website_`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          // Show friendly success confirmation alert
          formAlert.innerHTML = `
            <i class="bi bi-whatsapp text-success fs-3"></i>
            <div>
              <strong>Thank you, ${fullName.value.trim()}!</strong><br>
              Your appointment details for <em>${service.options[service.selectedIndex].text}</em> have been prepared. Opening WhatsApp (<strong>+968 7170 4990</strong>) to confirm your booking directly with our team...
              <div class="mt-2">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-pill px-3 py-1 fw-bold">
                  <i class="bi bi-whatsapp me-1"></i> Open WhatsApp Chat
                </a>
              </div>
            </div>
          `;
          formAlert.classList.add('show-success');
          formAlert.style.display = 'flex';

          // Open WhatsApp directly in new window/tab
          window.open(waUrl, '_blank');

          // Reset Form
          appointmentForm.reset();
          document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

          // Scroll smoothly to confirmation message
          formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 700);
      }
    });

    function setInvalid(input, message) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
      }
    }

    function setValid(input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }

    // Clear feedback on input change
    appointmentForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  // --- 7. Service Modal Details Dynamic Loader ---
  const serviceDetails = {
    orthopedic: {
      title: 'Orthopedic Physiotherapy',
      arabic: 'علاج العظام والمفاصل الطبيعي',
      icon: 'bi-activity',
      description: 'Comprehensive physical therapy aimed at restoring musculoskeletal function, relieving chronic joint and spinal pain, and restoring mobility after acute injuries or degenerative conditions.',
      highlights: [
        'Targeted manual joint mobilization and soft tissue therapy',
        'Specific muscle re-education and spinal alignment',
        'Postural correction and biomechanical optimization',
        'Evidence-based exercise programs for osteoarthritis and tendonitis'
      ]
    },
    neurological: {
      title: 'Neurological Rehabilitation',
      arabic: 'إعادة التأهيل العصبي والحركي',
      icon: 'bi-heart-pulse',
      description: 'Specialized neuro-rehab protocols focused on retrain neuromuscular pathways, improving balance, coordination, and functional independence for patients with neurological conditions.',
      highlights: [
        'Stroke recovery and motor re-learning therapies',
        'Gait retraining, balance and fall prevention strategies',
        'Spasticity management and functional electrical stimulation',
        'Personalized daily living mobility restoration programs'
      ]
    },
    sports: {
      title: 'Sports Injury Rehabilitation',
      arabic: 'تأهيل الإصابات الرياضية والرياضيين',
      icon: 'bi-trophy',
      description: 'Advanced sports medicine physiotherapy designed to accelerate recovery from athletic injuries, rebuild peak conditioning, and prevent recurrent injuries.',
      highlights: [
        'ACL, ligament, meniscus, and muscle tear recovery',
        'High-performance functional movement screening',
        'Dry needling, kinesiology taping, and targeted tissue release',
        'Safe, step-by-step Return-to-Play protocols'
      ]
    },
    spine: {
      title: 'Back & Neck Pain Management',
      arabic: 'علاج آلام الظهر والرقبة والعمود الفقري',
      icon: 'bi-person-arms-up',
      description: 'Dedicated spinal wellness and pain relief therapy for disc herniations, sciatica, cervical stiffness, and chronic lower back pain.',
      highlights: [
        'Spinal decompression exercises and manual therapy',
        'Deep core stabilization and postural retraining',
        'Ergonomic workstation and lifestyle counseling',
        'Non-invasive, lasting chronic pain relief techniques'
      ]
    },
    postop: {
      title: 'Post-Surgical Rehabilitation',
      arabic: 'التأهيل بعد العمليات الجراحية',
      icon: 'bi-bandaid',
      description: 'Structured post-operative care ensuring safe tissue healing, joint range of motion recovery, and muscle strengthening following orthopedic surgery.',
      highlights: [
        'Care following total knee, hip, and shoulder replacements',
        'Post-arthroscopy and spinal surgery phased protocols',
        'Edema/swelling reduction and scar tissue management',
        'Safe progressive load management for complete recovery'
      ]
    },
    joint: {
      title: 'Joint & Muscle Rehabilitation',
      arabic: 'إعادة تأهيل العضلات والمفاصل الحركية',
      icon: 'bi-universal-access',
      description: 'Holistic rehabilitation focused on resolving muscle imbalances, frozen shoulder, chronic tendon issues, and restoring smooth everyday movement.',
      highlights: [
        'Comprehensive flexibility and strength rebuilding',
        'Trigger point therapy and myofascial release',
        'Custom home exercise regimens and stretching plans',
        'Long-term prevention of repetitive strain injuries'
      ]
    }
  };

  const serviceModal = document.getElementById('serviceDetailModal');
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      const serviceKey = button.getAttribute('data-service');
      const data = serviceDetails[serviceKey];

      if (data) {
        document.getElementById('modalServiceTitle').textContent = data.title;
        document.getElementById('modalServiceArabic').textContent = data.arabic;
        document.getElementById('modalServiceDesc').textContent = data.description;

        const listContainer = document.getElementById('modalServiceHighlights');
        listContainer.innerHTML = '';
        data.highlights.forEach(item => {
          const li = document.createElement('li');
          li.className = 'd-flex align-items-center gap-2 mb-2 text-dark font-weight-500';
          li.innerHTML = `<i class="bi bi-check-circle-fill text-success fs-5"></i> <span>${item}</span>`;
          listContainer.appendChild(li);
        });
      }
    });
  }
});
