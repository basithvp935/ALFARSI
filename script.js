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

  // --- 3. Hero Heading Dynamic Typewriter Writing Effect ---
  const typewriterTarget = document.getElementById('typewriterTarget');
  if (typewriterTarget) {
    const phrases = [
      'Live Better.',
      'Heal Faster.',
      'Move Confidently.',
      'Relieve Pain.',
      'Restore Mobility.'
    ];
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

      setTimeout(typeLoop, timeout);
    };

    setTimeout(typeLoop, 350);
  }

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
