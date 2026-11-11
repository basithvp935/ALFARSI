/**
 * AL FARSI PHYSIOTHERAPY & REHABILITATION CENTER
 * مركز الفارسي للعلاج الطبيعي والتأهيل
 * Enhanced Interactive JavaScript (Vanilla JS)
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

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
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
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .nav-cta-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // --- 3. Hero typewriter is started by applySiteLanguage() (i18n section) ---

  // --- 4. Scroll Reveal Animations with IntersectionObserver ---
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
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- 5. Animated Stats Counters ---
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

  // --- 6. Active Navigation Link Highlighting On Scroll ---
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

  // --- 7. Treatments Interactive Category Filter ---
  const filterButtons = document.querySelectorAll('.filter-tab-btn');
  const treatmentItems = document.querySelectorAll('.treatment-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFilter = btn.getAttribute('data-filter');

      treatmentItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedFilter === 'all' || itemCategory === selectedFilter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Support filter trigger from dropdown or cards
  document.querySelectorAll('[data-filter]').forEach(trigger => {
    if (!trigger.classList.contains('filter-tab-btn')) {
      trigger.addEventListener('click', (e) => {
        const filterVal = trigger.getAttribute('data-filter');
        const targetTab = document.querySelector(`.filter-tab-btn[data-filter="${filterVal}"]`);
        if (targetTab) {
          targetTab.click();
        }
      });
    }
  });

  // --- 8. Comprehensive Service & Treatment Dynamic Modal ---
  const treatmentDetails = {
    stroke: {
      title: 'Stroke Treatment & Neurological Rehabilitation',
      arabic: 'علاج وتأهيل مرضى السكتة الدماغية والشلل',
      description: 'Ayurvedic & evidence-based neurological rehabilitation for stroke recovery, hemiplegia, paralysis, and mobility restoration using daily supervised neuromuscular facilitation and gait re-education.',
      highlights: [
        'Neuromuscular facilitation & motor re-learning therapy',
        'Gait retraining, balance restoration, and fall prevention',
        'Upper and lower limb spasticity & contracture management',
        'Cognitive and functional daily living independence protocols'
      ]
    },
    backpain: {
      title: 'Chronic Back Pain & Sciatica Treatment',
      arabic: 'علاج آلام الظهر والعمود الفقري وعرق النسا',
      description: 'Natural, surgery-free relief for sciatica, lumbar disc herniation, cervical spondylosis, and chronic back pain using specialized spinal decompression, core strengthening, and manual therapy.',
      highlights: [
        'Non-surgical mechanical & manual spinal decompression',
        'Targeted sciatic nerve mobilization and inflammation relief',
        'Deep postural stabilizing exercises and ergonomic retraining',
        'Long-term pain relief without dependence on strong painkillers'
      ]
    },
    cervical: {
      title: 'Cervical Spondylosis & Neck Care',
      arabic: 'علاج تآكل الفقرات العنقية وآلام الرقبة',
      description: 'Comprehensive rehabilitation for cervical spondylosis, neck stiffness, radiating nerve pain into arms, and tension headaches caused by modern posture stress.',
      highlights: [
        'Gentle cervical spine mobilization and traction techniques',
        'Trigger point release for trapezius and shoulder girdle muscles',
        'Postural re-alignment and forward head posture correction',
        'Customized ergonomic workstation adjustment plans'
      ]
    },
    cerebralpalsy: {
      title: 'Cerebral Palsy & Pediatric Care',
      arabic: 'تأهيل حالات الشلل الدماغي للأطفال',
      description: 'Specialized childhood neuro-rehabilitation addressing developmental delay, muscle spasticity, coordination, and functional motor milestones in a caring, playful environment.',
      highlights: [
        'Individualized sensory-motor and neuro-developmental therapy',
        'Muscle tone normalization and joint contracture prevention',
        'Balance, crawling, sitting, and walking assistive training',
        'Comprehensive family and caregiver home routine guidance'
      ]
    },
    sports: {
      title: 'Sports Injury & Ligament Recovery',
      arabic: 'تأهيل الإصابات الرياضية والتمزقات العضلية',
      description: 'High-performance recovery protocols for ACL tears, ankle sprains, meniscus injuries, and muscle strains to safely restore athletic peak conditioning.',
      highlights: [
        'Phased return-to-sport functional movement screening',
        'Dry needling, kinesiology taping, and targeted tissue release',
        'Eccentric muscle re-strengthening and agility training',
        'Injury re-occurrence prevention protocols'
      ]
    },
    orthopedic: {
      title: 'Orthopedic Rehabilitation & Joint Care',
      arabic: 'علاج أمراض العظام والمفاصل والخشونة',
      description: 'Specialized management for osteoarthritis, joint stiffness, ligament strains, and degenerative cartilage issues to restore smooth, pain-free daily motion.',
      highlights: [
        'Targeted manual joint mobilization and soft tissue release',
        'Hydro-collator therapy, electro-stimulation, and joint lubrication',
        'Biomechanical alignment and load-bearing correction',
        'Strengthening surrounding musculature to protect vulnerable joints'
      ]
    },
    postop: {
      title: 'Post-Surgical Joint & Spine Rehabilitation',
      arabic: 'التأهيل الطبي بعد العمليات الجراحية',
      description: 'Structured phased rehabilitation following knee/hip replacements, ACL reconstruction, arthroscopy, and spinal surgeries for rapid, safe functional recovery.',
      highlights: [
        'Early post-operative swelling reduction and scar tissue management',
        'Gradual passive and active range-of-motion restoration',
        'Progressive weight-bearing and functional gait retraining',
        'Minimizing surgical recovery time with certified clinical care'
      ]
    },
    parkinsons: {
      title: "Parkinson's Disease Movement Therapy",
      arabic: 'تأهيل مرضى باركنسون واضطرابات الحركة',
      description: 'Evidence-based physical therapy enhancing postural stability, overcoming freezing episodes, reducing stiffness, and maintaining independent mobility.',
      highlights: [
        'Large-amplitude movement training (LSVT BIG inspired protocols)',
        'Rhythmic auditory and visual cueing for smoother gait',
        'Dynamic balance challenges to prevent dangerous falls',
        'Daily flexibility and coordination maintenance exercises'
      ]
    },
    joint: {
      title: 'Frozen Shoulder & Joint Mobility',
      arabic: 'علاج تيبس الكتف والمفاصل الحركية',
      description: 'Dedicated clinical protocols for adhesive capsulitis (frozen shoulder), rotator cuff tendonitis, and severe joint stiffness to unlock full range of motion.',
      highlights: [
        'Gentle joint capsule stretching and capsular distraction',
        'Myofascial release for shoulder girdle and scapular stabilizers',
        'Progressive active-assisted pulley and resistance exercises',
        'Restoring pain-free overhead reach and sleep comfort'
      ]
    },
    hijama: {
      title: 'Hijama (Medical Cupping Therapy)',
      arabic: 'الحجامة الطبية والعلاج الطبيعي التكميلي',
      description: 'Sterile medical cupping performed by certified practitioners to improve micro-circulation, relieve deep muscular tension, and promote natural cellular recovery.',
      highlights: [
        '100% sterile, single-use medical grade equipment and protocols',
        'Decompression of stiff fascia and trapped cellular metabolites',
        'Significant relief for chronic back, neck, and shoulder soreness',
        'Synergistic complement to active physiotherapy and rehabilitation'
      ]
    },
    reflexology: {
      title: 'Therapeutic Reflexology & Dry Needling',
      arabic: 'العلاج بالضغط الانعكاسي والإبر الجافة',
      description: 'Targeted pressure point activation and dry needling therapy to alleviate neuropathic pain, release stubborn myofascial trigger points, and restore circulation.',
      highlights: [
        'Dry needling for deep myofascial trigger point deactivation',
        'Reflex point stimulation to alleviate chronic stress and stiffness',
        'Sensory re-education and neuropathic pain reduction',
        'Improves local blood supply to chronically tight muscle bands'
      ]
    },
    electrotherapy: {
      title: 'Electrotherapy & Therapeutic Ultrasound',
      arabic: 'العلاج الكهربائي والموجات فوق الصوتية',
      description: 'Modern clinical modalities including TENS, Interferential Current (IFT), NMES, and deep thermal ultrasound to accelerate tissue healing and block pain pathways.',
      highlights: [
        'TENS & IFT for non-invasive neuro-stimulation and pain blocking',
        'Neuromuscular electrical stimulation (NMES) for muscle activation',
        'Therapeutic ultrasound to break down scar tissue and enhance collagen',
        'Safe, painless, and highly effective for acute and chronic pain'
      ]
    }
  };

  const serviceModal = document.getElementById('serviceDetailModal');
  if (serviceModal) {
    serviceModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;
      const serviceKey = button.getAttribute('data-service');
      const data = treatmentDetails[serviceKey];

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

        // Pre-set select in contact form if user clicks book button in modal
        const modalBookBtn = document.getElementById('modalBookBtn');
        if (modalBookBtn) {
          modalBookBtn.onclick = () => {
            const selectEl = document.getElementById('serviceSelect');
            if (selectEl) {
              for (let i = 0; i < selectEl.options.length; i++) {
                if (selectEl.options[i].text.toLowerCase().includes(data.title.toLowerCase().substring(0, 8))) {
                  selectEl.selectedIndex = i;
                  break;
                }
              }
            }
          };
        }
      }
    });
  }

  // --- 9. Blog / Health Insights Reader Modal ---
  const blogArticles = {
    'backpain-article': {
      title: 'How Specialized Physical Therapy Helps Relieve Chronic Back Pain Naturally',
      badge: 'Spine Health',
      content: `
        <p class="mb-3">Chronic back pain and sciatica affect millions of people worldwide. While painkillers offer temporary relief, they rarely address the underlying biomechanical breakdown causing nerve impingement and spinal disc compression.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">1. The Role of Non-Surgical Decompression</h6>
        <p class="mb-3">Through precision manual traction and spinal decompression techniques, we relieve mechanical pressure on irritated nerve roots (such as the sciatic nerve), allowing bulging disc material to retract and nutrient-rich fluids to rehydrate spinal discs.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">2. Deep Core Stabilization</h6>
        <p class="mb-3">Activating deep stabilizers like the transversus abdominis and multifidus creates a natural internal corset that shields your lower spine during bending, lifting, and prolonged sitting.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">3. Postural Ergonomics</h6>
        <p class="mb-0">Combining clinic treatments with personalized ergonomic guidance ensures lasting comfort and completely eliminates the risk of recurrent injury.</p>
      `
    },
    'neuro-article': {
      title: 'Best Clinical Protocols for Neurological Rehabilitation & Stroke Recovery',
      badge: 'Neuro Rehab',
      content: `
        <p class="mb-3">Following a stroke or neurological incident, the central nervous system possesses a remarkable capacity known as <strong>neuroplasticity</strong>—the ability to form new neural connections and bypass damaged brain areas.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">1. Intensive Repetitive Task Training</h6>
        <p class="mb-3">Practicing functional, goal-oriented movements (such as grasping, balance shifting, and step training) stimulates motor cortex reorganization faster than passive rest.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">2. Gait Retraining & Balance Safety</h6>
        <p class="mb-3">Utilizing body-weight supported treadmill training and neuromuscular stimulation helps restore natural heel-to-toe gait mechanics and builds immense confidence.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">3. Multi-Disciplinary Care</h6>
        <p class="mb-0">Combining physical therapy with holistic methods such as reflexology and circulation therapies provides the optimal environment for motor recovery.</p>
      `
    },
    'posture-article': {
      title: 'Complete Mind & Body Rejuvenation: Ergonomics, Joint Flexibility and Vitality',
      badge: 'Sports & Posture',
      content: `
        <p class="mb-3">Modern desk work and smartphone usage place tremendous forward strain on the cervical spine—amounting to up to 27kg of extra gravitational load on neck vertebrae.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">1. The 30-Minute Posture Reset</h6>
        <p class="mb-3">Taking simple 60-second micro-breaks every 30 minutes to perform scapular retractions and chin tucks prevents muscular spasms before they settle into chronic pain.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">2. Total Body Mobility Routine</h6>
        <p class="mb-3">Targeted hip flexor stretches and thoracic spine rotations restore free breathing, reduce lower back compression, and boost everyday energy levels.</p>
        <h6 class="fw-bold text-dark mt-3 mb-2">3. Professional Alignment Sessions</h6>
        <p class="mb-0">Regular clinical assessments ensure minor muscle imbalances are corrected before they develop into joint wear or degenerative spondylosis.</p>
      `
    }
  };

  const blogModal = document.getElementById('blogModal');
  if (blogModal) {
    blogModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;
      const articleKey = button.getAttribute('data-article');
      const article = blogArticles[articleKey];

      if (article) {
        document.getElementById('modalBlogBadge').textContent = article.badge;
        document.getElementById('modalBlogTitle').textContent = article.title;
        document.getElementById('modalBlogContent').innerHTML = article.content;
      }
    });
  }

  // Pre-select doctor when clicking "Book With Dr." buttons
  document.querySelectorAll('.doctor-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctorName = btn.getAttribute('data-doctor');
      const doctorSelect = document.getElementById('doctorSelect');
      if (doctorSelect && doctorName) {
        for (let i = 0; i < doctorSelect.options.length; i++) {
          if (doctorSelect.options[i].text.includes(doctorName)) {
            doctorSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // --- 10. Interactive Service Booking Form Validation & WhatsApp Integration ---
  const appointmentForm = document.getElementById('appointmentForm');
  const formAlert = document.getElementById('formAlert');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const email = document.getElementById('email');
      const service = document.getElementById('serviceSelect');
      const doctor = document.getElementById('doctorSelect');
      const preferredDate = document.getElementById('preferredDate');
      const timeSlot = document.getElementById('timeSlotSelect');
      const patientType = document.getElementById('patientTypeSelect');
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
        setInvalid(service, 'Please select the treatment or service needed.');
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
        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processing & Connecting to WhatsApp...';

        // Prepare WhatsApp message payload with all fields
        const waNumber = '96871704990';
        let waMessage = `*New Service Booking - Al Farsi Physiotherapy Center*\n`;
        waMessage += `━━━━━━━━━━━━━━━━━━━━━\n`;
        waMessage += `👤 *Patient Name:* ${fullName.value.trim()}\n`;
        waMessage += `📞 *Phone Number:* ${phoneNumber.value.trim()}\n`;
        waMessage += `✉️ *Email:* ${email.value.trim()}\n`;
        waMessage += `🩺 *Treatment Needed:* ${service.options[service.selectedIndex].text}\n`;
        waMessage += `👨‍⚕️ *Preferred Specialist:* ${doctor ? doctor.value : 'Any Specialist'}\n`;
        waMessage += `📅 *Preferred Date:* ${preferredDate.value}\n`;
        waMessage += `⏰ *Time Slot:* ${timeSlot ? timeSlot.value : 'Morning'}\n`;
        waMessage += `📋 *Patient Category:* ${patientType ? patientType.value : 'New Consultation'}\n`;
        if (message.value.trim()) {
          waMessage += `📝 *Symptoms / Notes:* ${message.value.trim()}\n`;
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
              Your appointment request for <em>${service.options[service.selectedIndex].text}</em> on <strong>${preferredDate.value}</strong> has been prepared. Opening WhatsApp (<strong>+968 7170 4990</strong>) to confirm your consultation directly with our clinic team...
              <div class="mt-2">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success rounded-pill px-3 py-1 fw-bold">
                  <i class="bi bi-whatsapp me-1"></i> Open WhatsApp Chat
                </a>
              </div>
            </div>
          `;
          formAlert.classList.add('show-success');
          formAlert.style.display = 'flex';

          // Open WhatsApp directly in new tab/window
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
});

/* ==========================================================================
   BILINGUAL LANGUAGE SWITCHER LOGIC (ENGLISH <-> ARABIC)
   Uses data-i18n / data-i18n-html / data-i18n-placeholder attributes
   ========================================================================== */
let currentLang = localStorage.getItem('alfarsi_lang') || 'en';
let typewriterTimer = null;

const TYPEWRITER_PHRASES = {
  en: ['Live Better.', 'Heal Faster.', 'Move Confidently.', 'Relieve Pain.', 'Restore Mobility.'],
  ar: ['عش بصحة أفضل.', 'تعافَ أسرع.', 'تحرك بثقة.', 'تخلص من الألم.', 'استعد حركتك.']
};

function startTypewriter(lang) {
  const typewriterTarget = document.getElementById('typewriterTarget');
  if (!typewriterTarget) return;

  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }

  const phrases = TYPEWRITER_PHRASES[lang] || TYPEWRITER_PHRASES.en;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
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

    typewriterTimer = setTimeout(typeLoop, timeout);
  };

  typewriterTimer = setTimeout(typeLoop, 350);
}

window.toggleSiteLanguage = function () {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('alfarsi_lang', currentLang);
  applySiteLanguage(currentLang);
};

function applySiteLanguage(lang) {
  const htmlEl = document.documentElement;
  const enPill = document.getElementById('langEnPill');
  const arPill = document.getElementById('langArPill');

  if (lang === 'ar') {
    htmlEl.setAttribute('dir', 'rtl');
    htmlEl.setAttribute('lang', 'ar');
    htmlEl.classList.add('lang-ar');
    if (enPill) enPill.classList.remove('active');
    if (arPill) arPill.classList.add('active');
  } else {
    htmlEl.setAttribute('dir', 'ltr');
    htmlEl.setAttribute('lang', 'en');
    htmlEl.classList.remove('lang-ar');
    if (arPill) arPill.classList.remove('active');
    if (enPill) enPill.classList.add('active');
  }

  mergeExtraI18n();
  translateElements(lang);
  startTypewriter(lang);
}

const i18n = {
  en: {
    'nav.home': 'Home',
    'nav.treatments': 'Treatments',
    'nav.about': 'About Us',
    'nav.ayurveda': 'Ayurveda',
    'nav.specialists': 'Specialists',
    'nav.contact': 'Contact',
    'nav.book': 'Book Appointment',
    'nav.dd.stroke': 'Stroke & Neurological Rehab',
    'nav.dd.backpain': 'Back Pain & Sciatica',
    'nav.dd.sports': 'Sports Injury Rehab',
    'nav.dd.postop': 'Post-Surgical Recovery',
    'nav.dd.hijama': 'Hijama & Reflexology',
    'nav.dd.ayurveda': 'Ayurvedic & Panchakarma',
    'nav.dd.explore': 'Explore All Treatments',

    'hero.badge': 'CENTER OF EXCELLENCE IN ADVANCED REHABILITATION',
    'hero.title': 'Move Better.',
    'hero.sub': 'Comprehensive Physiotherapy, Neurological Stroke Rehab & Holistic Pain Recovery',
    'hero.desc': 'Personalized evidence-based rehabilitation protocols combining modern physical medicine and proven therapeutic techniques to restore mobility, eliminate pain, and rebuild vitality naturally.',
    'hero.cta.book': 'Make Appointment',
    'hero.cta.explore': 'Explore Treatments',

    'cta.badge': 'START YOUR HEALING TODAY',
    'cta.heading': 'Ready to Reclaim Your Movement & Vitality?',
    'cta.text': 'Take the first step toward pain-free living with an individualized consultation and comprehensive assessment at Al Farsi Center.',
    'cta.book': 'Book an Appointment',
    'cta.call': 'Call Helpline',

    'cta.contact.badge': 'START YOUR RECOVERY TODAY',
    'cta.contact.heading': 'Need Urgent Assistance or Same-Day Consultation?',
    'cta.contact.text': 'Our medical reception desk is active on WhatsApp and phone for priority bookings and emergency mobility support.',
    'cta.whatsapp': 'WhatsApp Helpline',

    'footer.desc': "Al Farsi Physiotherapy & Rehabilitation Center is Oman's premier clinical facility dedicated to neurological stroke recovery, spine decompression, orthopedic care, and authentic Ayurvedic wellness.",
    'footer.quickLinks': 'Quick Links',
    'footer.aboutCenter': 'About Center',
    'footer.ayurvedicCare': 'Ayurvedic Care',
    'footer.contactUs': 'Contact Us',
    'footer.treatments': 'Treatments',
    'footer.t.stroke': 'Stroke Rehabilitation',
    'footer.t.backpain': 'Back Pain & Sciatica',
    'footer.t.sports': 'Sports Rehabilitation',
    'footer.t.elakizhi': 'Elakizhi Herbal Poultice',
    'footer.t.shirodhara': 'Shirodhara Stress Relief',
    'footer.t.hijama': 'Hijama Medical Cupping',
    'footer.contactInfo': 'Contact Info',
    'footer.address': 'Al Mudhaibi, North Al-Sharqiyah, Sultanate of Oman (P.O. Box 235, PC 420)',
    'footer.hours': 'Sat–Thu: 8am–9pm | Fri: 2pm–9pm',
    'footer.copyright': '© 2026 Al Farsi Physiotherapy Center. All Rights Reserved.',
    'footer.whatsapp': '+968 7170 4990 (WhatsApp)',

    'contact.hero.badge': 'SULTANATE OF OMAN • AL MUDHAIBI',
    'contact.hero.title': 'Get in Touch &',
    'contact.hero.titleAccent': 'Visit Our Clinic',
    'contact.hero.sub': 'We are dedicated to helping you reclaim pain-free movement, optimal vitality, and long-term wellbeing. Contact our clinical reception or schedule your assessment today.',
    'contact.crumb.home': 'Home',
    'contact.crumb.current': 'Contact & Location',

    'contact.card.visit': 'Visit Clinic',
    'contact.card.visitDesc': 'AL FARSI PHYSIOTHERAPY CENTRE<br>KHALFAN NASSER AMUR AL FARSI TRAD<br>P.O. Box: 235, PC: 420, Al Mudhaibi, North Al-Sharqiyah, Sultanate of Oman.',
    'contact.card.map': 'View On Map',
    'contact.card.phone': 'Phone Helpline',
    'contact.card.phoneDesc': 'Direct line for general inquiries, insurance approvals, and desk appointments.',
    'contact.card.wa': 'WhatsApp Support',
    'contact.card.waDesc': 'Quick consultations, MRI/X-Ray report sharing, and instant appointment booking.',
    'contact.card.hours': 'Working Hours',
    'contact.card.hoursDesc': 'Sat – Thu: 8:00 AM – 9:00 PM<br>Friday: 2:00 PM – 9:00 PM',
    'contact.card.bookSlot': 'Book Priority Slot',

    'contact.form.title': 'Schedule an Appointment',
    'contact.form.sub': 'Please provide your contact information and treatment requirements. Our clinical coordinator will respond promptly to confirm your session.',
    'contact.form.name': 'Full Name',
    'contact.form.phone': 'Phone / WhatsApp Number',
    'contact.form.email': 'Email Address',
    'contact.form.dept': 'Treatment Department',
    'contact.form.date': 'Preferred Date',
    'contact.form.time': 'Preferred Time Window',
    'contact.form.message': 'Brief Description of Symptoms / Medical History (Optional)',
    'contact.form.submit': 'Confirm & Send Booking Request',
    'contact.form.privacy': 'Your medical information is kept strictly confidential.',
    'contact.form.ph.name': 'e.g. Salim Al-Harthy',
    'contact.form.ph.phone': 'e.g. +968 9123 4567',
    'contact.form.ph.email': 'e.g. name@example.com',
    'contact.form.ph.message': 'Mention your pain area, previous surgeries, or symptoms...',
    'contact.form.select': 'Select Department / Therapy',
    'contact.form.morning': 'Morning (8:00 AM – 12:00 PM)',
    'contact.form.afternoon': 'Afternoon (12:00 PM – 4:00 PM)',
    'contact.form.evening': 'Evening (4:00 PM – 9:00 PM)',

    'contact.faq.badge': 'FREQUENT QUESTIONS',
    'contact.faq.title': 'Before Your',
    'contact.faq.titleAccent': 'First Visit',
    'contact.faq.sub': 'Common questions regarding our appointment procedures, insurance coverage, and clinical protocols in Oman.',
    'contact.faq.q1': "Do I need a doctor's referral to visit Al Farsi?",
    'contact.faq.a1': 'No, you can directly book an appointment with our specialist physiotherapists and Ayurvedic practitioners without a medical referral. If you have prior MRI, X-Ray reports, or doctor recommendations, please bring them along for your assessment.',
    'contact.faq.q2': 'Are sessions covered by health insurance in Oman?',
    'contact.faq.a2': 'Yes, we provide official medical invoices, diagnostic reports, and stamped documentation for reimbursement across major private insurance providers in Oman (e.g., Oman Insurance, NextCare, Bupa, MedNet). Contact our reception for verification.',
    'contact.faq.q3': 'Are there dedicated male and female therapists?',
    'contact.faq.a3': 'Yes, in full accordance with GCC and Omani cultural values, we provide completely private suites with certified male therapists for gentlemen and certified female therapists for ladies.',
    'contact.faq.q4': 'What should I wear to my initial physiotherapy consultation?',
    'contact.faq.a4': 'Please wear loose, comfortable athletic or casual clothing that allows easy physical movement and convenient access to the affected joint, spine, or muscle area.',

    'common.chatWhatsapp': 'Chat with us on WhatsApp',
    'about.badge': 'ABOUT AL FARSI CLINIC',
    'treatments.badge': 'OUR CLINICAL TREATMENTS',
    'treatments.title': 'Comprehensive',
    'treatments.titleAccent': 'Rehabilitation Treatments'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.treatments': 'العلاجات',
    'nav.about': 'من نحن',
    'nav.ayurveda': 'الأيورفيدا',
    'nav.specialists': 'الأخصائيون',
    'nav.contact': 'تواصل معنا',
    'nav.book': 'احجز موعد',
    'nav.dd.stroke': 'تأهيل السكتة والأعصاب',
    'nav.dd.backpain': 'آلام الظهر وعرق النسا',
    'nav.dd.sports': 'تأهيل الإصابات الرياضية',
    'nav.dd.postop': 'التأهيل بعد العمليات',
    'nav.dd.hijama': 'الحجامة والعلاج الانعكاسي',
    'nav.dd.ayurveda': 'الأيورفيدا والبanchaكارما',
    'nav.dd.explore': 'استعرض جميع العلاجات',

    'hero.badge': 'مركز التميز في التأهيل الطبي المتقدم',
    'hero.title': 'تحرك بشكل أفضل.',
    'hero.sub': 'علاج طبيعي شامل، تأهيل السكتة الدماغية، والتعافي الشامل من الألم',
    'hero.desc': 'بروتوكولات تأهيل مخصصة قائمة على الأدلة تجمع بين الطب الطبيعي الحديث والتقنيات العلاجية المثبتة لاستعادة الحركة، وإزالة الألم، وبناء الحيوية بشكل طبيعي.',
    'hero.cta.book': 'احجز موعد',
    'hero.cta.explore': 'استكشف العلاجات',

    'cta.badge': 'ابدأ رحلة الشفاء اليوم',
    'cta.heading': 'هل أنت مستعد لاستعادة حركتك وحيويتك؟',
    'cta.text': 'اتخذ الخطوة الأولى نحو حياة خالية من الألم مع استشارة مخصصة وتقييم شامل في مركز الفارسي.',
    'cta.book': 'احجز موعد',
    'cta.call': 'اتصل بالخط الساخن',

    'cta.contact.badge': 'ابدأ تعافيك اليوم',
    'cta.contact.heading': 'هل تحتاج مساعدة عاجلة أو استشارة في نفس اليوم؟',
    'cta.contact.text': 'مكتب الاستقبال الطبي متاح عبر واتساب والهاتف للحجوزات ذات الأولوية ودعم الحركة الطارئة.',
    'cta.whatsapp': 'واتساب الطوارئ',

    'footer.desc': 'مركز الفارسي للعلاج الطبيعي والتأهيل هو المنشأة السريرية الرائدة في عُمان والمتخصصة في تعافي السكتة الدماغية، وعلاج العمود الفقري، والرعاية العظمية، والعافية الأيورفيدية الأصيلة.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.aboutCenter': 'عن المركز',
    'footer.ayurvedicCare': 'الرعاية الأيورفيدية',
    'footer.contactUs': 'تواصل معنا',
    'footer.treatments': 'العلاجات',
    'footer.t.stroke': 'تأهيل السكتة الدماغية',
    'footer.t.backpain': 'آلام الظهر وعرق النسا',
    'footer.t.sports': 'التأهيل الرياضي',
    'footer.t.elakizhi': 'إيلاكيزهي — الكمادات العشبية',
    'footer.t.shirodhara': 'شيرودهARA لتخفيف التوتر',
    'footer.t.hijama': 'الحجامة الطبية',
    'footer.contactInfo': 'معلومات التواصل',
    'footer.address': 'المضيبي، شمال الشرقية، سلطنة عُمان (ص.ب 235، الرمز البريدي 420)',
    'footer.hours': 'السبت–الخميس: 8ص–9م | الجمعة: 2م–9م',
    'footer.copyright': '© 2026 مركز الفارسي للعلاج الطبيعي. جميع الحقوق محفوظة.',
    'footer.whatsapp': '+968 7170 4990 (واتساب)',

    'contact.hero.badge': 'سلطنة عُمان • المضيبي',
    'contact.hero.title': 'تواصل معنا و',
    'contact.hero.titleAccent': 'زر عيادتنا',
    'contact.hero.sub': 'نكرّس جهودنا لمساعدتك على استعادة الحركة الخالية من الألم والحيوية المثلى والعافية طويلة الأمد. تواصل مع الاستقبال الطبي أو احجز تقييمك اليوم.',
    'contact.crumb.home': 'الرئيسية',
    'contact.crumb.current': 'التواصل والموقع',

    'contact.card.visit': 'زيارة العيادة',
    'contact.card.visitDesc': 'مركز الفارسي للعلاج الطبيعي<br>خلفان ناصر عامر الفارسي للتجارة<br>صندوق بريد: 235، الرمز البريدي: 420<br>المضيبي، شمال الشرقية، سلطنة عُمان.',
    'contact.card.map': 'عرض على الخريطة',
    'contact.card.phone': 'الخط الساخن',
    'contact.card.phoneDesc': 'خط مباشر للاستفسارات العامة وموافقات التأمين ومواعيد الاستقبال.',
    'contact.card.wa': 'دعم واتساب',
    'contact.card.waDesc': 'استشارات سريعة، مشاركة تقارير الرنين والأشعة، وحجز المواعيد فوراً.',
    'contact.card.hours': 'ساعات العمل',
    'contact.card.hoursDesc': 'السبت – الخميس: 8:00 ص – 9:00 م<br>الجمعة: 2:00 م – 9:00 م',
    'contact.card.bookSlot': 'احجز موعداً بأولوية',

    'contact.form.title': 'حجز موعد',
    'contact.form.sub': 'يرجى تزويدنا ببيانات التواصل ومتطلبات العلاج. سيتواصل منسق العيادة معك سريعاً لتأكيد الجلسة.',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.phone': 'رقم الهاتف / واتساب',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.dept': 'قسم العلاج',
    'contact.form.date': 'التاريخ المفضل',
    'contact.form.time': 'الفترة الزمنية المفضلة',
    'contact.form.message': 'وصف موجز للأعراض / التاريخ الطبي (اختياري)',
    'contact.form.submit': 'تأكيد وإرسال طلب الحجز',
    'contact.form.privacy': 'يتم الحفاظ على سرية معلوماتك الطبية بشكل تام.',
    'contact.form.ph.name': 'مثال: سالم الحارثي',
    'contact.form.ph.phone': 'مثال: +968 9123 4567',
    'contact.form.ph.email': 'مثال: name@example.com',
    'contact.form.ph.message': 'اذكر منطقة الألم أو العمليات السابقة أو الأعراض...',
    'contact.form.select': 'اختر القسم / العلاج',
    'contact.form.morning': 'صباحاً (8:00 ص – 12:00 م)',
    'contact.form.afternoon': 'ظهراً (12:00 م – 4:00 م)',
    'contact.form.evening': 'مساءً (4:00 م – 9:00 م)',

    'contact.faq.badge': 'الأسئلة الشائعة',
    'contact.faq.title': 'قبل',
    'contact.faq.titleAccent': 'زيارتك الأولى',
    'contact.faq.sub': 'أسئلة شائعة حول إجراءات المواعيد والتأمين والبروتوكولات السريرية في عُمان.',
    'contact.faq.q1': 'هل أحتاج إحالة طبية لزيارة مركز الفارسي؟',
    'contact.faq.a1': 'لا، يمكنك حجز موعد مباشرة مع أخصائيي العلاج الطبيعي وممارسي الأيورفيدا دون إحالة طبية. إذا كانت لديك تقارير رنين أو أشعة أو توصيات طبية سابقة، يُرجى إحضارها معك للتقييم.',
    'contact.faq.q2': 'هل تُغطى الجلسات بالتأمين الصحي في عُمان؟',
    'contact.faq.a2': 'نعم، نوفر فواتير طبية رسمية وتقارير وتشخيصات مختومة لشركات التأمين الخاصة الرئيسية في عُمان. تواصل مع الاستقبال للتحقق.',
    'contact.faq.q3': 'هل يوجد معالجون ذكور وإناث؟',
    'contact.faq.a3': 'نعم، وفق القيم الثقافية الخليجية والعُمانية نوفر عيادات خاصة بالكامل مع معالجين ذكور للرجال ومعالجات إناث للسيدات.',
    'contact.faq.q4': 'ماذا أرتدي في استشارة العلاج الطبيعي الأولى؟',
    'contact.faq.a4': 'يُرجى ارتداء ملابس رياضية أو مريحة فضفاضة تتيح الحركة السهلة والوصول المريح للمنطقة المصابة.',

    'common.chatWhatsapp': 'تحدث معنا عبر واتساب',
    'about.badge': 'عن عيادة الفارسي',
    'treatments.badge': 'علاجاتنا السريرية',
    'treatments.title': 'علاجات تأهيل',
    'treatments.titleAccent': 'شاملة ومتكاملة'
  }
};

// Fix accidental latin characters in Arabic string
i18n.ar['nav.dd.ayurveda'] = 'الأيورفيدا والبانشاكارما';
i18n.ar['footer.t.shirodhara'] = 'شيرودهارا لتخفيف التوتر';

// Extended dictionary (also available via i18n-data.js for caching/debug)
/* Auto-generated Al Farsi i18n dictionary — EN / AR */
window.ALFARSI_I18N_EXTRA = {
  "en": {
    "top.location": "Al Mudhaibi, North Al-Sharqiyah, Sultanate of Oman",
    "trust.years": "Years Experience",
    "trust.yearsSub": "UK & International Certified Experts",
    "trust.recovered": "Recovered",
    "trust.recoveredSub": "Successfully treated patient cases",
    "trust.rate": "Recovery Rate",
    "trust.rateSub": "Non-invasive & surgery-free results",
    "trust.helpline": "24/7 Helpline",
    "trust.helplineSub": "Ongoing clinical follow-up care",
    "about.title": "Helping You Move With",
    "about.titleAccent": "Freedom & Vitality",
    "about.lead": "Al Farsi Physiotherapy Center is a premier specialized medical rehabilitation facility in Muscat, dedicated to restoring mobility, eliminating chronic discomfort, and fostering long-term physical independence.",
    "about.body": "Our evidence-based clinical model combines comprehensive biomechanical analysis with personalized treatment protocols—spanning orthopedic physical therapy, neurological stroke rehabilitation, spinal decompression, and complementary natural therapies.",
    "about.f1": "Comprehensive Biomechanical & Dosha Movement Assessment",
    "about.f2": "Multi-Disciplinary Personalized Treatment Protocols",
    "about.f3": "Dedicated Neurological, Post-Stroke & Spine Decompression",
    "about.f4": "Safe, Non-Invasive, Non-Surgical Rehabilitation Care",
    "about.ctaTreatments": "View Our Treatments",
    "about.ctaConsult": "Consult Our Doctors",
    "about.mission": "Our Mission",
    "about.missionTag": "Care • Recovery • Movement",
    "offer.badge": "WHAT WE OFFER",
    "offer.title": "Our Comprehensive",
    "offer.titleAccent": "Holistic & Clinical Offerings",
    "offer.sub": "From acute sports recovery and spinal care to neurological rehabilitation and natural therapies, we provide integrative physical medicine tailored to your life.",
    "offer.explore": "Explore Category",
    "offer.1.t": "Advanced Physiotherapy",
    "offer.1.d": "Daily evidence-based manual therapy, targeted therapeutic exercise, and electro-physical modalities to heal joints and restore optimal biomechanics.",
    "offer.2.t": "Stroke & Neuro Rehab",
    "offer.2.d": "Specialized neurological rehabilitation for stroke recovery, hemiplegia, paralysis, and balance restoration using intensive neuromuscular retraining.",
    "offer.3.t": "Spine & Chronic Pain",
    "offer.3.d": "Natural, surgery-free relief for sciatica, cervical spondylosis, lumbar disc herniation, and postural syndromes through non-invasive decompression.",
    "offer.4.t": "Holistic Complementary Care",
    "offer.4.d": "Medical cupping (Hijama), therapeutic reflexology, dry needling, and therapeutic relaxation for total body circulation and natural pain relief.",
    "treatments.sub": "Experience holistic healing with personalized therapies that restore balance, reduce pain, and rebuild vital movement.",
    "filter.all": "All Treatments",
    "filter.neuro": "Neurological & Stroke",
    "filter.spine": "Spine & Pain Care",
    "filter.ortho": "Orthopedic & Sports",
    "filter.holistic": "Specialized & Holistic",
    "common.discover": "Discover More",
    "tx.stroke.badge": "Neurological",
    "tx.stroke.title": "Stroke Rehabilitation",
    "tx.stroke.desc": "Neurological rehabilitation for stroke recovery, paralysis, gait retraining, and motor restoration using advanced neuro-facilitation.",
    "tx.stroke.tag1": "Paralysis Care",
    "tx.stroke.tag2": "Gait Training",
    "tx.stroke.tag3": "Neuroplasticity",
    "tx.backpain.badge": "Spine Care",
    "tx.backpain.title": "Back Pain & Sciatica",
    "tx.backpain.desc": "Natural, surgery-free relief for sciatica, lumbar disc herniation, spinal stenosis, and chronic lower back pain.",
    "tx.backpain.tag1": "Disc Herniation",
    "tx.backpain.tag2": "Sciatic Nerve",
    "tx.backpain.tag3": "Decompression",
    "tx.cervical.badge": "Neck & Spine",
    "tx.cervical.title": "Cervical Spondylosis",
    "tx.cervical.desc": "Comprehensive relief from neck stiffness, radiating arm numbness, posture strain, and degenerative cervical disc issues.",
    "tx.cervical.tag1": "Neck Stiffness",
    "tx.cervical.tag2": "Posture Correction",
    "tx.cervical.tag3": "Manual Therapy",
    "tx.cp.badge": "Pediatric Neuro",
    "tx.cp.title": "Cerebral Palsy Care",
    "tx.cp.desc": "Compassionate developmental physiotherapy and neuromuscular retraining supporting childhood mobility, motor skills, and independence.",
    "tx.cp.tag1": "Motor Skills",
    "tx.cp.tag2": "Spasticity Control",
    "tx.cp.tag3": "Child Rehab",
    "tx.sports.badge": "Sports Care",
    "tx.sports.title": "Sports Injury Recovery",
    "tx.sports.desc": "High-performance recovery for ACL sprains, rotator cuff tears, ankle trauma, and return-to-play functional conditioning.",
    "tx.sports.tag1": "ACL / Meniscus",
    "tx.sports.tag2": "Tendonitis",
    "tx.sports.tag3": "Return-to-Play",
    "tx.ortho.badge": "Orthopedic",
    "tx.ortho.title": "Orthopedic Rehabilitation",
    "tx.ortho.desc": "Specialized management for bone, joint, ligament, and cartilage disorders, easing chronic stiffness and arthritis.",
    "tx.ortho.tag1": "Osteoarthritis",
    "tx.ortho.tag2": "Joint Pain",
    "tx.ortho.tag3": "Biomechanical Alignment",
    "tx.postop.badge": "Post-Surgery",
    "tx.postop.title": "Post-Surgical Rehabilitation",
    "tx.postop.desc": "Structured recovery following joint replacement, spinal surgery, and arthroscopy to regain complete strength safely.",
    "tx.postop.tag1": "Knee / Hip Replacement",
    "tx.postop.tag2": "Scar Management",
    "tx.postop.tag3": "Rapid Mobility",
    "tx.parkinson.badge": "Movement Disorders",
    "tx.parkinson.title": "Parkinson's Movement Care",
    "tx.parkinson.desc": "Targeted exercise therapy enhancing postural stability, reducing tremors, overcoming freezing episodes, and preventing falls.",
    "tx.parkinson.tag1": "Balance Training",
    "tx.parkinson.tag2": "Tremor Control",
    "tx.parkinson.tag3": "Coordination",
    "tx.frozen.badge": "Joint Mobility",
    "tx.frozen.title": "Joint & Muscle Mobility",
    "tx.frozen.desc": "Dedicated therapeutic protocols for adhesive capsulitis (frozen shoulder), tendon stiffness, and myofascial restrictions.",
    "tx.frozen.tag1": "Frozen Shoulder",
    "tx.frozen.tag2": "Trigger Point",
    "tx.frozen.tag3": "Range of Motion",
    "tx.hijama.badge": "Holistic Therapy",
    "tx.hijama.title": "Hijama (Medical Cupping)",
    "tx.hijama.desc": "Sterile medical cupping and dry cupping to stimulate micro-circulation, relieve deep muscle spasm, and promote natural tissue detox.",
    "tx.hijama.tag1": "Circulation Boost",
    "tx.hijama.tag2": "Pain Decompression",
    "tx.hijama.tag3": "Natural Healing",
    "tx.reflex.badge": "Complementary Care",
    "tx.reflex.title": "Therapeutic Reflexology",
    "tx.reflex.desc": "Precision pressure point activation and dry needling targeting neuropathic discomfort, stress release, and sensory re-education.",
    "tx.reflex.tag1": "Dry Needling",
    "tx.reflex.tag2": "Acupressure",
    "tx.reflex.tag3": "Stress Relief",
    "tx.electro.badge": "Modern Modality",
    "tx.electro.title": "Electrotherapy & Ultrasound",
    "tx.electro.desc": "TENS, neuromuscular electrical stimulation (NMES), and therapeutic deep ultrasound to accelerate cellular repair and block pain signals.",
    "tx.electro.tag1": "TENS / NMES",
    "tx.electro.tag2": "Deep Ultrasound",
    "tx.electro.tag3": "Cellular Repair",
    "ayur.badge": "ANCIENT WISDOM & BOTANICAL HEALING",
    "ayur.title": "Traditional Ayurvedic Therapies & Herbal Wellness",
    "ayur.sub": "Immerse yourself in authentic Kerala Ayurvedic healing, customized medicated oils, and time-honored botanical protocols designed to eliminate chronic pain, restore vital energy, and balance your body’s natural doshas.",
    "ayur.gcc": "100% Authentic Kerala Ayurveda • GCC Standard",
    "ayur.sideTitle": "Personalized Botanical Healing for Spine, Joints & Vitality",
    "ayur.sideBody": "Every therapy at Al Farsi combines pure herbal extractions, warm cold-pressed botanical oils, and skilled Kerala master therapists. Private luxury treatment suites dedicated for gentlemen and ladies with full privacy and sterile comfort.",
    "ayur.f1t": "Pure Medicated Tailams",
    "ayur.f1d": "Neem, Bala, Dhanwantharam & Ashwagandha oils",
    "ayur.f2t": "Private Suites for Men & Women",
    "ayur.f2d": "Dedicated male & female certified therapists",
    "ayur.f3t": "Spine & Disc Natural Relief",
    "ayur.f3d": "Deep herbal penetration for sciatica & lumbar care",
    "ayur.f4t": "MOH Oman Certified Standard",
    "ayur.f4d": "Authentic Kerala wooden Droni tables & calm aroma",
    "ayur.years": "Years of Time-Tested Botanical Healing",
    "ayur.discover": "Discover Protocol",
    "ayur.p1": "<strong>100% Organically Sourced:</strong> Certified wild herbs with no chemical additives",
    "ayur.p2": "<strong>Integrated Care:</strong> Harmonized with modern clinical physiotherapy protocols",
    "ayur.p3": "<strong>Private Luxury Rooms:</strong> Dedicated serene wellness suites in Muscat, Oman",
    "ayur.elakizhi.badge": "Herbal Poultice",
    "ayur.elakizhi.title": "Elakizhi & Podikizhi",
    "ayur.elakizhi.desc": "Steamed bundles of wild medicinal leaves and herbal powders soaked in warm medicated oils to relieve acute joint pain, arthritis, sciatica, and chronic stiffness.",
    "ayur.shiro.badge": "Medicated Oil Stream",
    "ayur.shiro.title": "Shirodhara & Nasyam",
    "ayur.shiro.desc": "Continuous rhythmic stream of warm herbal oil over the forehead to soothe the nervous system, alleviate deep stress, chronic migraines, sleep disorders, and anxiety.",
    "ayur.basti.badge": "Localized Oil Dam",
    "ayur.basti.title": "Kati & Janu Basti",
    "ayur.basti.desc": "Herbal dough reservoirs retaining warm medicinal oil over the lumbar spine or knee joints to penetrate deep tissues, healing slipped discs and knee cartilage degeneration.",
    "ayur.abhyanga.badge": "Full Body Detox",
    "ayur.abhyanga.title": "Abhyanga & Detox",
    "ayur.abhyanga.desc": "Synchronized full-body massage using warm medicinal oils along biological energy pathways to stimulate lymphatic drainage, purge toxins, and nourish vital organs.",
    "how.badge": "HOW IT WORKS",
    "how.title": "Simple and Effective",
    "how.titleAccent": "3-Step Healing Process",
    "how.sub": "A structured, supportive clinical pathway designed to identify the true root causes of your symptoms and guide you back to pain-free mobility.",
    "how.s1.step": "STEP 01",
    "how.s1.title": "01 — In-Depth Clinical Consultation",
    "how.s1.desc": "Comprehensive assessment to understand your body constitution, movement biomechanics, nerve conduction, and the precise root causes of pain.",
    "how.s1.m1": "Biomechanical Range Analysis",
    "how.s1.m2": "Neurological & Postural Test",
    "how.s1.m3": "Medical History Review",
    "how.s1.phase": "Phase 1: Diagnostics & Assessment",
    "how.s1.stage": "Stage 1 of 3",
    "how.s2.step": "STEP 02",
    "how.s2.title": "02 — Personalized Treatment Plan",
    "how.s2.desc": "Customized combination of evidence-based physical therapy, manual mobilization, spinal decompression, and specialized holistic treatments.",
    "how.s2.m1": "Targeted Manual Therapy",
    "how.s2.m2": "Electro-Physical Modalities",
    "how.s2.m3": "Customized Exercise Regimen",
    "how.s2.phase": "Phase 2: Active Recovery & Strength",
    "how.s2.stage": "Stage 2 of 3",
    "how.s3.step": "STEP 03",
    "how.s3.title": "03 — Therapy, Recovery & Follow-Up",
    "how.s3.desc": "Regular guided sessions with expert doctor follow-ups, continuous milestone measurement, and lifelong ergonomic coaching to prevent relapse.",
    "how.s3.m1": "Daily Supervised Sessions",
    "how.s3.m2": "Functional Independence Test",
    "how.s3.m3": "Lifelong Home Guidance",
    "how.s3.phase": "Phase 3: Long-Term Independence",
    "how.s3.stage": "Stage 3 of 3",
    "why.badge": "WHY CHOOSE AL FARSI",
    "why.title": "Experience True Wellness",
    "why.titleAccent": "With Clinical Excellence",
    "why.sub": "We combine world-class medical standards with compassionate, personalized attention to ensure every patient experiences genuine recovery and lasting vitality.",
    "why.1.t": "Expertise in Evidence-Based Therapy",
    "why.1.d": "Benefit from authentic physical medicine protocols and certified practitioners using time-tested and modern healing techniques.",
    "why.2.t": "Personalized Holistic Care",
    "why.2.d": "Receive customized therapies tailored to your unique anatomical condition for long-lasting health, balance, and freedom of motion.",
    "why.3.t": "Natural & Safe Non-Surgical Treatments",
    "why.3.d": "Enjoy safe, non-invasive therapies combining manual decompression, specialized exercises, and complementary modalities without relying on heavy pharmaceuticals.",
    "why.4.t": "Modern Facilities & Serene Ambience",
    "why.4.d": "Modern clinical private treatment suites, electrotherapy technology, and a soothing atmosphere designed to make every session comfortable.",
    "why.cert": "100% Certified Care",
    "why.certSub": "Licensed Medical Standards (MOH / ISO)",
    "doc.badge": "OUR MEDICAL SPECIALISTS",
    "doc.title": "Meet Our Expert",
    "doc.titleAccent": "Physiotherapy Doctors",
    "doc.sub": "Board-certified rehabilitation consultants and therapists dedicated to your personalized healing and mobility recovery.",
    "doc.tariq.exp": "16+ Yrs Exp • UK Certified",
    "doc.tariq.role": "Clinical Director & Consultant",
    "doc.tariq.bio": "Senior specialist with over 16 years of clinical excellence in advanced joint biomechanics, complex spinal alignment, and personalized recovery.",
    "doc.tariq.s1": "Orthopedic Rehab",
    "doc.tariq.s2": "Spine Care",
    "doc.tariq.s3": "Manual Therapy",
    "doc.tariq.cases": "1,200+ Cases",
    "doc.tariq.book": "Book With Dr. Tariq",
    "doc.layla.exp": "12+ Yrs Exp • Neuro Specialist",
    "doc.layla.role": "Lead Neurological Specialist",
    "doc.layla.bio": "Lead neuro specialist dedicated to neuromuscular retraining, stroke rehabilitation, cerebral palsy support, and chronic spinal pain recovery.",
    "doc.layla.s1": "Neuro Rehab",
    "doc.layla.s2": "Stroke Recovery",
    "doc.layla.s3": "Cerebral Palsy",
    "doc.layla.cases": "980+ Cases",
    "doc.layla.book": "Book With Dr. Layla",
    "doc.marcus.exp": "14+ Yrs Exp • CMPT Certified",
    "doc.marcus.role": "Senior Sports Recovery Consultant",
    "doc.marcus.bio": "Certified manual physical therapist specializing in sports trauma recovery, ACL and rotator cuff re-strengthening, and post-operative joint mobility.",
    "doc.marcus.s1": "Sports Trauma",
    "doc.marcus.s2": "Post-Op Rehab",
    "doc.marcus.s3": "Return-to-Play",
    "doc.marcus.cases": "1,150+ Cases",
    "doc.marcus.book": "Book With Dr. Marcus",
    "test.badge": "TESTIMONIALS",
    "test.title": "Healing Stories from",
    "test.sub": "A smooth and results-driven healing journey that feels natural, comfortable, and truly transformative.",
    "test.verified": "Verified",
    "test.1.q": "\"Absolutely life changing experience—I couldn't be more grateful for the doctors and clinical team. I am a different person from when I walked in. The personalized rehabilitation protocols and compassionate care are world-class.\"",
    "test.1.role": "Stroke & Neuro Rehabilitation",
    "test.2.q": "\"I went for treatment for severe lower backache and sciatica leg pain that other treatments couldn't resolve. We were treated by highly trained specialists. We both are now completely pain-free. Their hospitality and care is five stars!\"",
    "test.2.role": "Back Pain & Sciatica Recovery",
    "test.3.q": "\"I completed a 16-day program for lower back pain, numbness, and spine stiffness. Highly cooperative doctors and staff. Daily follow-ups, modern electro-physical sessions, and clear home exercises. Highly recommend for all neuro and ortho conditions!\"",
    "test.3.role": "Spine & Nerve Decompression",
    "art.badge": "HEALTH ARTICLES & INSIGHTS",
    "art.title": "Physiotherapy & Wellness",
    "art.sub": "Expert knowledge and clinical advice on maintaining spinal wellness, speeding recovery, and enhancing your daily movement.",
    "art.read": "Read Article",
    "art.1.cat": "Spine Health",
    "art.1.meta": "Sep 2026  •  5 Min Read",
    "art.1.t": "How Specialized Physical Therapy Helps Relieve Chronic Back Pain Naturally",
    "art.1.d": "Discover evidence-based non-surgical decompression strategies, deep core stabilization, and postural alignments to treat sciatica without surgery.",
    "art.2.cat": "Neuro Rehab",
    "art.2.meta": "Aug 2026  •  6 Min Read",
    "art.2.t": "Best Clinical Protocols for Neurological Rehabilitation & Stroke Recovery",
    "art.2.d": "Exploring neuroplasticity, gait re-education, and functional electrical stimulation techniques that accelerate paralysis recovery.",
    "art.3.cat": "Sports & Posture",
    "art.3.meta": "Jul 2026  •  4 Min Read",
    "art.3.t": "Complete Mind & Body Rejuvenation: Ergonomics, Joint Flexibility and Vitality",
    "art.3.d": "Simple daily routines and posture correction habits to protect your cervical spine and maintain pain-free flexibility at work and home.",
    "idx.contact.badge": "GET IN TOUCH",
    "idx.contact.title": "Let's Talk About",
    "idx.contact.titleAccent": "Your Recovery",
    "idx.contact.sub": "Our compassionate medical team is ready to answer your inquiries, review diagnostic reports, and schedule your appointment.",
    "idx.contact.phone": "Phone Helplines",
    "idx.contact.wa": "WhatsApp Direct Booking",
    "idx.contact.waDetail": "+968 7170 4990 (Instant Response)",
    "idx.contact.email": "Email Inquiries",
    "idx.contact.loc": "Center Location",
    "idx.contact.locDetail": "AL FARSI PHYSIOTHERAPY CENTRE<br>KHALFAN NASSER AMUR AL FARSI TRAD<br>Post Box No: 235, Postal Code: 420<br>Al Mudhaibi, North Al-Sharqiyah, Sultanate of Oman",
    "idx.contact.hours": "Opening Hours",
    "idx.contact.hoursDetail": "Saturday – Thursday: 8:00 AM – 9:00 PM<br>24/7 Patient On-Call Support",
    "idx.form.title": "Service Booking Form",
    "idx.form.fast": "Fast Response",
    "idx.form.sub": "Fill in your details below and our clinical team will get back to you promptly to confirm your consultation.",
    "idx.form.name": "Full Name",
    "idx.form.phone": "Phone / WhatsApp Number",
    "idx.form.email": "Email Address",
    "idx.form.service": "Treatment / Service Needed",
    "idx.form.select": "Select Treatment or Department",
    "idx.form.doctor": "Preferred Specialist (Optional)",
    "idx.form.anyDoc": "Any Available Specialist",
    "idx.form.date": "Preferred Date",
    "idx.form.time": "Preferred Time Slot",
    "idx.form.patient": "Patient Type",
    "idx.form.newPatient": "New Patient Consultation",
    "idx.form.followup": "Follow-up Treatment Session",
    "idx.form.second": "Second Opinion / Diagnostic Review",
    "idx.form.message": "Brief Description of Condition / Symptoms (Optional)",
    "idx.form.ph.name": "e.g. Salim Al-Harthy",
    "idx.form.ph.phone": "e.g. +968 9123 4567",
    "idx.form.ph.email": "e.g. name@example.com",
    "idx.form.ph.message": "Tell us about your pain duration, previous surgeries, or recovery goals...",
    "idx.form.submit": "Submit Appointment Request",
    "idx.form.morning": "Morning (8:00 AM – 12:00 PM)",
    "idx.form.afternoon": "Afternoon (12:00 PM – 4:00 PM)",
    "idx.form.evening": "Evening (4:00 PM – 9:00 PM)",
    "test.titleAccent": "Our Patients",
    "art.titleAccent": "Insights",
    "ayur.book": "Book Ayurvedic Consultation",
    "ayur.whatsapp": "WhatsApp Doctor",
    "ayur.kizhiLabel": "Herbal Kizhi & Panchakarma",
    "ayur.tag.joint": "#JointPain",
    "ayur.tag.steam": "#HerbalSteam",
    "ayur.tag.spine": "#SpineRelief",
    "ayur.tag.stress": "#StressRelief",
    "ayur.tag.sleep": "#SleepHarmony",
    "ayur.tag.nervous": "#NervousSystem",
    "ayur.tag.disc": "#DiscHerniation",
    "ayur.tag.knee": "#KneeCare",
    "ayur.tag.lumbar": "#LumbarSpine",
    "ayur.tag.detox": "#Detoxification",
    "ayur.tag.lymph": "#LymphaticFlow",
    "ayur.tag.immunity": "#VitalImmunity",
    "footer.iso": "ISO 9001:2015",
    "footer.moh": "MOH Licensed",
    "art.1.date": "Sep 2026",
    "art.1.read": "5 Min Read",
    "art.2.date": "Aug 2026",
    "art.2.read": "6 Min Read",
    "art.3.date": "Jul 2026",
    "art.3.read": "4 Min Read"
  },
  "ar": {
    "top.location": "المضيبي، شمال الشرقية، سلطنة عُمان",
    "trust.years": "سنوات خبرة",
    "trust.yearsSub": "خبراء معتمدون من المملكة المتحدة ودولياً",
    "trust.recovered": "تعافوا معنا",
    "trust.recoveredSub": "حالات مرضى عولجت بنجاح",
    "trust.rate": "نسبة التعافي",
    "trust.rateSub": "نتائج غير جراحية وآمنة",
    "trust.helpline": "خط مساعدة على مدار الساعة",
    "trust.helplineSub": "متابعة سريرية مستمرة",
    "about.title": "نساعدك على التحرك بـ",
    "about.titleAccent": "حرية وحيوية",
    "about.lead": "مركز الفارسي للعلاج الطبيعي هو منشأة طبية متخصصة رائدة في مسقط، مكرسة لاستعادة الحركة، وإزالة الألم المزمن، وتعزيز الاستقلالية الجسدية طويلة الأمد.",
    "about.body": "يجمع نموذجنا السريري القائم على الأدلة بين التحليل الميكانيكي الحيوي الشامل وبروتوكولات العلاج المخصصة — من العلاج الطبيعي العظمي، وتأهيل السكتة الدماغية، وتخفيف ضغط العمود الفقري، إلى العلاجات الطبيعية التكميلية.",
    "about.f1": "تقييم شامل للحركة الميكانيكية الحيوية والدوشا",
    "about.f2": "بروتوكولات علاج متعددة التخصصات ومخصصة",
    "about.f3": "تأهيل عصبي متخصص وتخفيف ضغط العمود الفقري",
    "about.f4": "رعاية تأهيلية آمنة وغير جراحية",
    "about.ctaTreatments": "اطلع على علاجاتنا",
    "about.ctaConsult": "استشر أطباءنا",
    "about.mission": "مهمتنا",
    "about.missionTag": "رعاية • تعافٍ • حركة",
    "offer.badge": "ما نقدمه",
    "offer.title": "عروضنا الشاملة",
    "offer.titleAccent": "السريرية والتكاملية",
    "offer.sub": "من التعافي الرياضي الحاد ورعاية العمود الفقري إلى التأهيل العصبي والعلاجات الطبيعية، نقدم طبّاً فيزيائياً متكاملاً مصمماً لحياتك.",
    "offer.explore": "استكشف الفئة",
    "offer.1.t": "علاج طبيعي متقدم",
    "offer.1.d": "علاج يدوي يومي قائم على الأدلة، وتمارين علاجية مستهدفة، ووسائل كهروفزيائية لشفاء المفاصل واستعادة الميكانيكا الحيوية المثلى.",
    "offer.2.t": "تأهيل السكتة والأعصاب",
    "offer.2.d": "تأهيل عصبي متخصص لتعافي السكتة والشلل النصفي والشلل واستعادة التوازن عبر إعادة تدريب عضلي عصبي مكثف.",
    "offer.3.t": "العمود الفقري والألم المزمن",
    "offer.3.d": "تخفيف طبيعي وغير جراحي لعرق النسا وتآكل الفقرات العنقية وانزلاق القرص القطني ومتلازمات القوام عبر تخفيف ضغط غير جراحي.",
    "offer.4.t": "رعاية تكميلية شاملة",
    "offer.4.d": "الحجامة الطبية، والعلاج الانعكاسي، والإبر الجافة، والاسترخاء العلاجي لتحسين الدورة الدموية وتخفيف الألم طبيعياً.",
    "treatments.sub": "اختبر الشفاء الشامل مع علاجات مخصصة تعيد التوازن وتقلل الألم وتعيد بناء الحركة الحيوية.",
    "filter.all": "جميع العلاجات",
    "filter.neuro": "عصبي والسكتة",
    "filter.spine": "العمود الفقري والألم",
    "filter.ortho": "عظمي ورياضي",
    "filter.holistic": "متخصص وتكاملي",
    "common.discover": "اكتشف المزيد",
    "tx.stroke.badge": "عصبي",
    "tx.stroke.title": "تأهيل السكتة الدماغية",
    "tx.stroke.desc": "تأهيل عصبي لتعافي السكتة والشلل وإعادة تدريب المشي واستعادة الحركة باستخدام تسهيل عصبي متقدم.",
    "tx.stroke.tag1": "رعاية الشلل",
    "tx.stroke.tag2": "تدريب المشي",
    "tx.stroke.tag3": "المرونة العصبية",
    "tx.backpain.badge": "رعاية العمود الفقري",
    "tx.backpain.title": "آلام الظهر وعرق النسا",
    "tx.backpain.desc": "تخفيف طبيعي وغير جراحي لعرق النسا وانزلاق القرص القطني وتضيق القناة الشوكية وآلام أسفل الظهر المزمنة.",
    "tx.backpain.tag1": "انزلاق القرص",
    "tx.backpain.tag2": "العصب الوركي",
    "tx.backpain.tag3": "تخفيف الضغط",
    "tx.cervical.badge": "الرقبة والعمود الفقري",
    "tx.cervical.title": "تآكل الفقرات العنقية",
    "tx.cervical.desc": "تخفيف شامل لتيبس الرقبة والتنميل في الذراع وإجهاد القوام ومشاكل القرص العنقي التنكسية.",
    "tx.cervical.tag1": "تيبس الرقبة",
    "tx.cervical.tag2": "تصحيح القوام",
    "tx.cervical.tag3": "علاج يدوي",
    "tx.cp.badge": "أعصاب الأطفال",
    "tx.cp.title": "رعاية الشلل الدماغي",
    "tx.cp.desc": "علاج طبيعي تنموي رحيم وإعادة تدريب عضلي عصبي لدعم حركة الأطفال والمهارات الحركية والاستقلالية.",
    "tx.cp.tag1": "المهارات الحركية",
    "tx.cp.tag2": "التحكم بالتشنج",
    "tx.cp.tag3": "تأهيل الأطفال",
    "tx.sports.badge": "رعاية رياضية",
    "tx.sports.title": "تعافي الإصابات الرياضية",
    "tx.sports.desc": "تعافٍ عالي الأداء لالتواءات الرباط الصليبي وتمزقات الكفة المدورة وإصابات الكاحل والعودة للمنافسة.",
    "tx.sports.tag1": "الرباط الصليبي / الغضروف",
    "tx.sports.tag2": "التهاب الأوتار",
    "tx.sports.tag3": "العودة للعب",
    "tx.ortho.badge": "عظمي",
    "tx.ortho.title": "التأهيل العظمي",
    "tx.ortho.desc": "إدارة متخصصة لاضطرابات العظام والمفاصل والأربطة والغضاريف، مع تخفيف التيبس المزمن والتهاب المفاصل.",
    "tx.ortho.tag1": "خشونة المفاصل",
    "tx.ortho.tag2": "ألم المفاصل",
    "tx.ortho.tag3": "محاذاة ميكانيكية",
    "tx.postop.badge": "بعد الجراحة",
    "tx.postop.title": "التأهيل بعد العمليات",
    "tx.postop.desc": "تعافٍ منظم بعد استبدال المفاصل وجراحة العمود الفقري والمنظار لاستعادة القوة الكاملة بأمان.",
    "tx.postop.tag1": "استبدال الركبة / الورك",
    "tx.postop.tag2": "إدارة الندبات",
    "tx.postop.tag3": "حركة سريعة",
    "tx.parkinson.badge": "اضطرابات الحركة",
    "tx.parkinson.title": "رعاية حركة باركنسون",
    "tx.parkinson.desc": "علاج تمارين مستهدف يعزز ثبات القوام ويقلل الرعاش ويتغلب على نوبات التجمد ويمنع السقوط.",
    "tx.parkinson.tag1": "تدريب التوازن",
    "tx.parkinson.tag2": "التحكم بالرعاش",
    "tx.parkinson.tag3": "التنسيق",
    "tx.frozen.badge": "حركة المفاصل",
    "tx.frozen.title": "حركة المفاصل والعضلات",
    "tx.frozen.desc": "بروتوكولات علاجية مخصصة لتيبس الكتف (الكتف المتجمد) وتيبس الأوتار والقيود اللفافية العضلية.",
    "tx.frozen.tag1": "الكتف المتجمد",
    "tx.frozen.tag2": "نقاط الزناد",
    "tx.frozen.tag3": "مدى الحركة",
    "tx.hijama.badge": "علاج تكاملي",
    "tx.hijama.title": "الحجامة الطبية",
    "tx.hijama.desc": "حجامة طبية معقمة وحجامة جافة لتحفيز الدورة الدموية الدقيقة وتخفيف تشنج العضلات العميق وتعزيز إزالة السموم طبيعياً.",
    "tx.hijama.tag1": "تعزيز الدورة",
    "tx.hijama.tag2": "تخفيف الألم",
    "tx.hijama.tag3": "شفاء طبيعي",
    "tx.reflex.badge": "رعاية تكميلية",
    "tx.reflex.title": "العلاج الانعكاسي",
    "tx.reflex.desc": "تنشيط دقيق لنقاط الضغط والإبر الجافة لاستهداف الألم العصبي وإطلاق التوتر وإعادة التثقيف الحسي.",
    "tx.reflex.tag1": "الإبر الجافة",
    "tx.reflex.tag2": "ضغط النقاط",
    "tx.reflex.tag3": "تخفيف التوتر",
    "tx.electro.badge": "تقنية حديثة",
    "tx.electro.title": "العلاج الكهربائي والموجات فوق الصوتية",
    "tx.electro.desc": "تحفيز كهربائي عصبي عضلي وموجات فوق صوتية علاجية عميقة لتسريع إصلاح الخلايا وحجب إشارات الألم.",
    "tx.electro.tag1": "TENS / NMES",
    "tx.electro.tag2": "موجات عميقة",
    "tx.electro.tag3": "إصلاح خلوي",
    "ayur.badge": "حكمة قديمة وعلاج عشبي",
    "ayur.title": "علاجات أيورفيدية تقليدية وعافية عشبية",
    "ayur.sub": "انغمس في العلاج الأيورفيدي الأصيل من كيرالا والزيوت الطبية المخصصة والبروتوكولات النباتية العريقة المصممة لإزالة الألم المزمن واستعادة الطاقة الحيوية وموازنة الدوشا الطبيعية.",
    "ayur.gcc": "أيورفيدا كيرالا الأصيلة 100٪ • معيار الخليج",
    "ayur.sideTitle": "علاج عشبي مخصص للعمود الفقري والمفاصل والحيوية",
    "ayur.sideBody": "كل علاج في الفارسي يجمع مستخلصات عشبية نقية وزيوتاً نباتية دافئة ومعالجين مهرة من كيرالا. أجنحة علاجية فاخرة خاصة للرجال والسيدات بخصوصية كاملة.",
    "ayur.f1t": "زيوت طبية نقية",
    "ayur.f1d": "زيوت النيم وبالا ودهانوانثارام والأشواغاندا",
    "ayur.f2t": "أجنحة خاصة للرجال والسيدات",
    "ayur.f2d": "معالجون ومعالجات معتمدون",
    "ayur.f3t": "تخفيف طبيعي للعمود الفقري",
    "ayur.f3d": "اختراق عشبي عميق لعرق النسا والقطني",
    "ayur.f4t": "معيار وزارة الصحة في عُمان",
    "ayur.f4d": "طاولات دروني خشبية أصيلة وأجواء هادئة",
    "ayur.years": "سنوات من العلاج العشبي المثبت",
    "ayur.discover": "اكتشف البروتوكول",
    "ayur.p1": "<strong>مصادر عضوية 100٪:</strong> أعشاب برية معتمدة بلا إضافات كيميائية",
    "ayur.p2": "<strong>رعاية متكاملة:</strong> منسجمة مع بروتوكولات العلاج الطبيعي الحديثة",
    "ayur.p3": "<strong>غرف فاخرة خاصة:</strong> أجنحة عافية هادئة في مسقط، عُمان",
    "ayur.elakizhi.badge": "كمادات عشبية",
    "ayur.elakizhi.title": "إيلاكيزهي وبوديكيزهي",
    "ayur.elakizhi.desc": "حزم مطهوة من أوراق طبية برية ومساحيق عشبية منقوعة في زيوت طبية دافئة لتخفيف آلام المفاصل والتهابها وعرق النسا والتيبس المزمن.",
    "ayur.shiro.badge": "تيار الزيت الطبي",
    "ayur.shiro.title": "شيرودهارا وناسيام",
    "ayur.shiro.desc": "تيار إيقاعي مستمر من الزيت العشبي الدافئ على الجبهة لتهدئة الجهاز العصبي وتخفيف التوتر العميق والصداع النصفي واضطرابات النوم والقلق.",
    "ayur.basti.badge": "خزان الزيت الموضعي",
    "ayur.basti.title": "كاتي وجانو باستي",
    "ayur.basti.desc": "خزانات عجين عشبي تحتفظ بالزيت الطبي الدافئ على العمود الفقري القطني أو الركبة لاختراق الأنسجة العميقة وعلاج الانزلاق وغضروف الركبة.",
    "ayur.abhyanga.badge": "إزالة سموم للجسم",
    "ayur.abhyanga.title": "أبهيانغا وإزالة السموم",
    "ayur.abhyanga.desc": "تدليك كامل للجسم متزامن بزيوت طبية دافئة على مسارات الطاقة لتحفيز التصريف اللمفاوي وتنقية السموم وتغذية الأعضاء الحيوية.",
    "how.badge": "كيف نعمل",
    "how.title": "عملية شفاء بسيطة",
    "how.titleAccent": "وفعّالة من 3 خطوات",
    "how.sub": "مسار سريري منظم وداعم مصمم لتحديد الأسباب الجذرية لأعراضك وإعادتك إلى حركة خالية من الألم.",
    "how.s1.step": "الخطوة 01",
    "how.s1.title": "01 — استشارة سريرية معمقة",
    "how.s1.desc": "تقييم شامل لفهم تكوين جسمك وميكانيكا الحركة وتوصيل الأعصاب والأسباب الجذرية الدقيقة للألم.",
    "how.s1.m1": "تحليل المدى الميكانيكي الحيوي",
    "how.s1.m2": "اختبار عصبي وقوامي",
    "how.s1.m3": "مراجعة التاريخ الطبي",
    "how.s1.phase": "المرحلة 1: التشخيص والتقييم",
    "how.s1.stage": "المرحلة 1 من 3",
    "how.s2.step": "الخطوة 02",
    "how.s2.title": "02 — خطة علاج مخصصة",
    "how.s2.desc": "مزيج مخصص من العلاج الطبيعي القائم على الأدلة والتعبئة اليدوية وتخفيف ضغط العمود الفقري والعلاجات التكاملية المتخصصة.",
    "how.s2.m1": "علاج يدوي مستهدف",
    "how.s2.m2": "وسائل كهروفزيائية",
    "how.s2.m3": "نظام تمارين مخصص",
    "how.s2.phase": "المرحلة 2: التعافي النشط والقوة",
    "how.s2.stage": "المرحلة 2 من 3",
    "how.s3.step": "الخطوة 03",
    "how.s3.title": "03 — العلاج والتعافي والمتابعة",
    "how.s3.desc": "جلسات موجهة منتظمة مع متابعة طبية خبيرة وقياس مستمر للمعالم وإرشاد هندسي مدى الحياة لمنع الانتكاس.",
    "how.s3.m1": "جلسات يومية بإشراف",
    "how.s3.m2": "اختبار الاستقلالية الوظيفية",
    "how.s3.m3": "إرشاد منزلي مستمر",
    "how.s3.phase": "المرحلة 3: الاستقلالية طويلة الأمد",
    "how.s3.stage": "المرحلة 3 من 3",
    "why.badge": "لماذا تختار الفارسي",
    "why.title": "اختبر العافية الحقيقية",
    "why.titleAccent": "مع التميز السريري",
    "why.sub": "نجمع بين المعايير الطبية العالمية والاهتمام الرحيم المخصص لضمان تجربة تعافٍ حقيقي وحيوية دائمة لكل مريض.",
    "why.1.t": "خبرة في العلاج القائم على الأدلة",
    "why.1.d": "استفد من بروتوكولات الطب الطبيعي الأصيلة وممارسين معتمدين يستخدمون تقنيات شفاء مثبتة وحديثة.",
    "why.2.t": "رعاية شاملة مخصصة",
    "why.2.d": "احصل على علاجات مصممة لحالتك التشريحية الفريدة لصحة وتوازن وحرية حركة طويلة الأمد.",
    "why.3.t": "علاجات طبيعية وآمنة غير جراحية",
    "why.3.d": "استمتع بعلاجات آمنة غير جراحية تجمع تخفيف الضغط اليدوي والتمارين المتخصصة والوسائل التكميلية دون الاعتماد على أدوية ثقيلة.",
    "why.4.t": "مرافق حديثة وأجواء هادئة",
    "why.4.d": "أجنحة علاجية سريرية خاصة حديثة وتقنية كهربائية وأجواء مهدئة مصممة لجعل كل جلسة مريحة.",
    "why.cert": "رعاية معتمدة 100٪",
    "why.certSub": "معايير طبية مرخصة (وزارة الصحة / ISO)",
    "doc.badge": "أخصائيونا الطبيون",
    "doc.title": "تعرف على خبرائنا في",
    "doc.titleAccent": "العلاج الطبيعي",
    "doc.sub": "استشاريو تأهيل ومعالجون معتمدون مكرسون لشفائك المخصص واستعادة حركتك.",
    "doc.tariq.exp": "16+ سنة خبرة • معتمد من المملكة المتحدة",
    "doc.tariq.role": "المدير السريري والاستشاري",
    "doc.tariq.bio": "أخصائي أول بأكثر من 16 عاماً من التميز السريري في ميكانيكا المفاصل ومحاذاة العمود الفقري والتعافي المخصص.",
    "doc.tariq.s1": "تأهيل عظمي",
    "doc.tariq.s2": "رعاية العمود الفقري",
    "doc.tariq.s3": "علاج يدوي",
    "doc.tariq.cases": "1,200+ حالة",
    "doc.tariq.book": "احجز مع د. طارق",
    "doc.layla.exp": "12+ سنة خبرة • أخصائية أعصاب",
    "doc.layla.role": "الأخصائية العصبية الرئيسية",
    "doc.layla.bio": "أخصائية أعصاب رئيسية مكرسة لإعادة التدريب العضلي العصبي وتأهيل السكتة ودعم الشلل الدماغي وتعافي آلام العمود الفقري المزمنة.",
    "doc.layla.s1": "تأهيل عصبي",
    "doc.layla.s2": "تعافي السكتة",
    "doc.layla.s3": "الشلل الدماغي",
    "doc.layla.cases": "980+ حالة",
    "doc.layla.book": "احجز مع د. ليلى",
    "doc.marcus.exp": "14+ سنة خبرة • معتمد CMPT",
    "doc.marcus.role": "استشاري التعافي الرياضي الأول",
    "doc.marcus.bio": "معالج طبيعي يدوي معتمد متخصص في تعافي الإصابات الرياضية وتقوية الرباط الصليبي والكفة المدورة وحركة المفاصل بعد العمليات.",
    "doc.marcus.s1": "إصابات رياضية",
    "doc.marcus.s2": "تأهيل بعد العملية",
    "doc.marcus.s3": "العودة للعب",
    "doc.marcus.cases": "1,150+ حالة",
    "doc.marcus.book": "احجز مع د. ماركوس",
    "test.badge": "آراء المرضى",
    "test.title": "قصص شفاء من",
    "test.sub": "رحلة شفاء سلسة ومبنية على النتائج تشعر بأنها طبيعية ومريحة وتحولية حقاً.",
    "test.verified": "موثّق",
    "test.1.q": "\"تجربة غيّرت حياتي تماماً — لا يمكنني أن أكون أكثر امتناناً للأطباء والفريق السريري. أنا شخص مختلف عما كنت عليه عند دخولي. بروتوكولات التأهيل المخصصة والرعاية الرحيمة عالمية المستوى.\"",
    "test.1.role": "تأهيل السكتة والأعصاب",
    "test.2.q": "\"ذهبت للعلاج من آلام شديدة في أسفل الظهر وعرق النسا لم تستطع علاجات أخرى حلها. عالجنا أخصائيون مدربون للغاية. أصبحنا الآن خاليين تماماً من الألم. ضيافتهم ورعايتهم خمس نجوم!\"",
    "test.2.role": "تعافي آلام الظهر وعرق النسا",
    "test.3.q": "\"أكملت برنامجاً لمدة 16 يوماً لآلام أسفل الظهر والتنميل وتيبس العمود الفقري. أطباء وموظفون متعاونون للغاية. متابعات يومية وجلسات كهروفزيائية حديثة وتمارين منزلية واضحة. أنصح بشدة لجميع الحالات العصبية والعظمية!\"",
    "test.3.role": "تخفيف ضغط العمود الفقري والأعصاب",
    "art.badge": "مقالات ورؤى صحية",
    "art.title": "رؤى العلاج الطبيعي و",
    "art.sub": "معرفة خبيرة ونصائح سريرية للحفاظ على صحة العمود الفقري وتسريع التعافي وتعزيز حركتك اليومية.",
    "art.read": "اقرأ المقال",
    "art.1.cat": "صحة العمود الفقري",
    "art.1.meta": "سبتمبر 2026  •  5 دقائق قراءة",
    "art.1.t": "كيف يساعد العلاج الطبيعي المتخصص في تخفيف آلام الظهر المزمنة طبيعياً",
    "art.1.d": "اكتشف استراتيجيات تخفيف الضغط غير الجراحية القائمة على الأدلة وتثبيت الجذع ومحاذاة القوام لعلاج عرق النسا دون جراحة.",
    "art.2.cat": "تأهيل عصبي",
    "art.2.meta": "أغسطس 2026  •  6 دقائق قراءة",
    "art.2.t": "أفضل البروتوكولات السريرية للتأهيل العصبي وتعافي السكتة",
    "art.2.d": "استكشاف المرونة العصبية وإعادة تعليم المشي وتقنيات التحفيز الكهربائي الوظيفي التي تسرّع تعافي الشلل.",
    "art.3.cat": "رياضة وقوام",
    "art.3.meta": "يوليو 2026  •  4 دقائق قراءة",
    "art.3.t": "تجديد كامل للعقل والجسم: الهندسة البشرية ومرونة المفاصل والحيوية",
    "art.3.d": "روتين يومي بسيط وعادات تصحيح القوام لحماية العمود العنقي والحفاظ على مرونة خالية من الألم في العمل والمنزل.",
    "idx.contact.badge": "تواصل معنا",
    "idx.contact.title": "لنتحدث عن",
    "idx.contact.titleAccent": "تعافيك",
    "idx.contact.sub": "فريقنا الطبي الرحيم مستعد للإجابة على استفساراتك ومراجعة التقارير التشخيصية وجدولة موعدك.",
    "idx.contact.phone": "خطوط الهاتف",
    "idx.contact.wa": "حجز واتساب مباشر",
    "idx.contact.waDetail": "+968 7170 4990 (رد فوري)",
    "idx.contact.email": "استفسارات البريد",
    "idx.contact.loc": "موقع المركز",
    "idx.contact.locDetail": "مركز الفارسي للعلاج الطبيعي<br>خلفان ناصر عامر الفارسي للتجارة<br>صندوق بريد: 235، الرمز البريدي: 420<br>المضيبي، شمال الشرقية، سلطنة عُمان",
    "idx.contact.hours": "ساعات العمل",
    "idx.contact.hoursDetail": "السبت – الخميس: 8:00 ص – 9:00 م<br>دعم المرضى على مدار الساعة",
    "idx.form.title": "نموذج حجز الخدمة",
    "idx.form.fast": "استجابة سريعة",
    "idx.form.sub": "املأ بياناتك أدناه وسيتواصل معك فريقنا السريري سريعاً لتأكيد استشارتك.",
    "idx.form.name": "الاسم الكامل",
    "idx.form.phone": "رقم الهاتف / واتساب",
    "idx.form.email": "البريد الإلكتروني",
    "idx.form.service": "العلاج / الخدمة المطلوبة",
    "idx.form.select": "اختر العلاج أو القسم",
    "idx.form.doctor": "الأخصائي المفضل (اختياري)",
    "idx.form.anyDoc": "أي أخصائي متاح",
    "idx.form.date": "التاريخ المفضل",
    "idx.form.time": "الفترة الزمنية المفضلة",
    "idx.form.patient": "نوع المريض",
    "idx.form.newPatient": "استشارة مريض جديد",
    "idx.form.followup": "جلسة متابعة علاجية",
    "idx.form.second": "رأي ثانٍ / مراجعة تشخيصية",
    "idx.form.message": "وصف موجز للحالة / الأعراض (اختياري)",
    "idx.form.ph.name": "مثال: سالم الحارثي",
    "idx.form.ph.phone": "مثال: +968 9123 4567",
    "idx.form.ph.email": "مثال: name@example.com",
    "idx.form.ph.message": "أخبرنا عن مدة الألم أو العمليات السابقة أو أهداف التعافي...",
    "idx.form.submit": "إرسال طلب الموعد",
    "idx.form.morning": "صباحاً (8:00 ص – 12:00 م)",
    "idx.form.afternoon": "ظهراً (12:00 م – 4:00 م)",
    "idx.form.evening": "مساءً (4:00 م – 9:00 م)",
    "test.titleAccent": "مرضانا",
    "art.titleAccent": "العافية",
    "ayur.book": "احجز استشارة أيورفيدية",
    "ayur.whatsapp": "واتساب الطبيب",
    "ayur.kizhiLabel": "كيزي العشبي والبانشاكارما",
    "ayur.tag.joint": "#ألم_المفاصل",
    "ayur.tag.steam": "#بخار_عشبي",
    "ayur.tag.spine": "#تخفيف_العمود",
    "ayur.tag.stress": "#تخفيف_التوتر",
    "ayur.tag.sleep": "#نوم_مريح",
    "ayur.tag.nervous": "#الجهاز_العصبي",
    "ayur.tag.disc": "#انزلاق_القرص",
    "ayur.tag.knee": "#رعاية_الركبة",
    "ayur.tag.lumbar": "#القطني",
    "ayur.tag.detox": "#إزالة_سموم",
    "ayur.tag.lymph": "#التصريف_اللمفاوي",
    "ayur.tag.immunity": "#مناعة_حيوية",
    "footer.iso": "ISO 9001:2015",
    "footer.moh": "مرخّص من وزارة الصحة",
    "art.1.date": "سبتمبر 2026",
    "art.1.read": "5 دقائق قراءة",
    "art.2.date": "أغسطس 2026",
    "art.2.read": "6 دقائق قراءة",
    "art.3.date": "يوليو 2026",
    "art.3.read": "4 دقائق قراءة"
  }
};

function mergeExtraI18n() {
  const extraDict = window.ALFARSI_I18N_EXTRA;
  if (!extraDict) return;
  Object.assign(i18n.en, extraDict.en || {});
  Object.assign(i18n.ar, extraDict.ar || {});
}
mergeExtraI18n();

function t(lang, key) {
  return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || '';
}

function translateElements(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(lang, key);
    if (!value) return;
    el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const value = t(lang, key);
    if (!value) return;
    el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = t(lang, key);
    if (!value) return;
    el.setAttribute('placeholder', value);
  });
}

// Ensure saved language is applied on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => applySiteLanguage(currentLang));
} else {
  applySiteLanguage(currentLang);
}


// --- Treatment Gallery: category filter + lightbox ---
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('galGrid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.gal-item'));
  const filters = Array.from(document.querySelectorAll('.gal-filter'));
  const lb = document.getElementById('galLightbox');
  const lbImg = document.getElementById('galLbImg');
  const lbCap = document.getElementById('galLbCaption');
  const lbCat = document.getElementById('galLbCat');
  const lbCounter = document.getElementById('galLbCounter');
  let current = 0;
  let lastFocus = null;

  filters.forEach(btn => {
    const cat = btn.dataset.galCat;
    const count = cat === 'all' ? items.length : items.filter(i => i.dataset.galCat === cat).length;
    const badge = btn.querySelector('.gal-count');
    if (badge) badge.textContent = count;

    btn.addEventListener('click', () => {
      filters.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      let n = 0;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.galCat === cat;
        item.hidden = !show;
        item.classList.remove('gal-in');
        if (show) {
          void item.offsetWidth;
          item.style.animationDelay = (Math.min(n++, 8) * 40) + 'ms';
          item.classList.add('gal-in');
        }
      });
    });
  });

  const visible = () => items.filter(i => !i.hidden);

  function show(index) {
    const list = visible();
    if (!list.length) return;
    current = (index + list.length) % list.length;
    const item = list[current];
    const img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = item.querySelector('.gal-caption').textContent;
    lbCat.textContent = item.querySelector('.gal-cat-tag').textContent;
    lbCounter.textContent = (current + 1) + ' / ' + list.length;
  }

  function open(item) {
    lastFocus = document.activeElement;
    show(visible().indexOf(item));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.gal-lb-close').focus();
  }

  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  const isRtl = () => document.documentElement.getAttribute('dir') === 'rtl';

  items.forEach(item => item.querySelector('.gal-open').addEventListener('click', () => open(item)));
  lb.querySelector('.gal-lb-close').addEventListener('click', close);
  lb.querySelector('.gal-lb-prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.gal-lb-next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(current + (isRtl() ? -1 : 1));
    else if (e.key === 'ArrowLeft') show(current + (isRtl() ? 1 : -1));
  });

  let touchX = null;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
});

// --- Smart navbar: hide on scroll down, show on scroll up ---
(function () {
  function initSmartNav() {
    const bar = document.querySelector('header') || document.querySelector('.tp-nav');
    if (!bar) return;
    const menu = bar.querySelector('.navbar-collapse');
    let lastY = window.scrollY;

    function update() {
      const y = window.scrollY;
      const delta = y - lastY;
      const menuOpen = menu && menu.classList.contains('show');
      const dropdownOpen = bar.querySelector('.dropdown-menu.show');

      if (y <= bar.offsetHeight + 60 || menuOpen || dropdownOpen) {
        bar.classList.remove('nav-hidden');
      } else if (delta > 6) {
        bar.classList.add('nav-hidden');
      } else if (delta < -6) {
        bar.classList.remove('nav-hidden');
      }
      if (Math.abs(delta) > 6) lastY = y;
    }

    // scroll events already fire at most once per frame; the work here is a few class toggles
    window.addEventListener('scroll', update, { passive: true });

    // keyboard users tabbing into the nav should always see it
    bar.addEventListener('focusin', () => bar.classList.remove('nav-hidden'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSmartNav);
  else initSmartNav();
})();
