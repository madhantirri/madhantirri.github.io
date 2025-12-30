document.addEventListener('DOMContentLoaded', function() {
  // Update certificateData to include all 9 certificates
  const certificateData = {
    'blixathon-participation.png': {
      description: 'Participated in the national-level hackathon organized by IIT Bombay focusing on innovative tech solutions and problem-solving.',
      date: 'October 2024',
      issuer: 'IIT Bombay & Blix Tech',
      duration: '48 Hours',
      skills: ['Team Collaboration', 'Problem Solving', 'Prototyping', 'UI/UX Design', 'Presentation'],
      link: 'https://drive.google.com/file/d/14bKXw8NS0h3MLyK7yrQtVQXC8HOwcirJ/view?usp=drive_link'
    },
    'blixathon-runner-up.png': {
      title: 'Blixathon IIT Bombay Runner Up',
      badge: 'Hackathon',
      badgeClass: 'hackathon-badge',
      category: 'hackathon',
      description: 'Achieved runner-up position in Blixathon IIT Bombay by developing an innovative solution that impressed the judges.',
      date: 'October 2024',
      issuer: 'IIT Bombay & Blix Tech',
      duration: '48 Hours',
      skills: ['Innovation', 'Technical Execution', 'Pitching', 'Team Leadership', 'Product Development'],
      link: 'https://example.com/blixathon-runner-up'
    },
    'bluestock-internship.png': {
      title: 'Bluestock Internship Certificate',
      badge: 'Internship',
      badgeClass: 'internship-badge',
      category: 'internship',
      description: 'Successfully completed internship at Bluestock Tech, contributing to real-world projects and gaining industry experience.',
      date: 'Summer 2024',
      issuer: 'Bluestock Technologies',
      duration: '3 Months',
      skills: ['Professional Development', 'Project Management', 'Industry Tools', 'Teamwork', 'Corporate Communication'],
      link: 'https://example.com/bluestock-internship'
    },
    'bluestock-offer-letter.png': {
      title: 'Bluestock Internship Offer Letter',
      badge: 'Internship',
      badgeClass: 'internship-badge',
      category: 'internship',
      description: 'Official offer letter for internship position at Bluestock Technologies, recognizing skills and potential for contribution.',
      date: 'May 2024',
      issuer: 'Bluestock Technologies HR',
      duration: '3 Months',
      skills: ['Professional Recognition', 'Career Opportunity', 'Technical Assessment', 'Interview Success'],
      link: 'https://example.com/bluestock-offer'
    },
    'dau-hackathon.png': {
      title: 'DAU Hackathon Participation',
      badge: 'Hackathon',
      badgeClass: 'hackathon-badge',
      category: 'hackathon',
      description: 'Participated in DAU Hackathon focusing on developing solutions for educational technology and digital learning.',
      date: 'March 2024',
      issuer: 'Digital Accelerator University',
      duration: '36 Hours',
      skills: ['EdTech', 'Rapid Prototyping', 'User Research', 'Minimum Viable Product', 'Pitching'],
      link: 'https://example.com/dau-hackathon'
    },
    'isro-hackathon.png': {
      title: 'ISRO Space Hackathon',
      badge: 'Hackathon',
      badgeClass: 'hackathon-badge',
      category: 'hackathon',
      description: 'Participated in ISRO organized hackathon focusing on space technology applications and satellite data utilization.',
      date: 'February 2024',
      issuer: 'Indian Space Research Organisation',
      duration: '72 Hours',
      skills: ['Space Tech', 'Data Analysis', 'Satellite Imagery', 'Innovation', 'Technical Writing'],
      link: 'https://example.com/isro-hackathon'
    },
    'masai-hackathon.png': {
      title: 'Masai School Hackathon',
      badge: 'Hackathon',
      badgeClass: 'hackathon-badge',
      category: 'hackathon',
      description: 'Participated in Masai School hackathon focusing on full-stack development and coding challenges.',
      date: 'January 2024',
      issuer: 'Masai School',
      duration: '24 Hours',
      skills: ['Full-Stack Development', 'Coding Challenges', 'Time Management', 'Debugging', 'Code Optimization'],
      link: 'https://example.com/masai-hackathon'
    },
    'bridge-design.png': {
      title: 'Bridge Design Competition',
      badge: 'Competition',
      badgeClass: 'competition-badge',
      category: 'competition',
      description: 'Won first place in national bridge building competition demonstrating excellence in structural engineering and design.',
      date: 'March 2024',
      issuer: 'National Engineering Association',
      duration: '6 Months',
      skills: ['Structural Engineering', 'CAD Design', 'Material Science', 'Project Management', 'Team Leadership'],
      link: 'https://example.com/bridge-competition'
    },
    'dsa-iitg.png': {
      title: 'DSA Course - IIT Guwahati',
      badge: 'Course',
      badgeClass: 'course-badge',
      category: 'course',
      description: 'Enrolled in Data Structures & Algorithms course offered by IIT Guwahati, covering advanced algorithms and problem-solving techniques.',
      date: '2023-2024',
      issuer: 'IIT Guwahati',
      duration: '6 Months',
      skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Time Complexity', 'Competitive Programming'],
      link: 'https://example.com/dsa-iitg'
    }
  };

  // === FIXED CURSOR LOGIC ===
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');

  if (cursorDot && cursorOutline) {
    // Check if device supports hover (not mobile)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
      // Only show custom cursor on non-touch devices
      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;

      // Cursor follow speed (0.1 = slow/smooth, 0.5 = fast)
      const speed = 0.2; 

      // 1. Move the DOT instantly (for accurate clicking)
      window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      });

      // 2. Animate the OUTLINE with a smooth delay
      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * speed;
        cursorY += dy * speed;

        cursorOutline.style.left = `${cursorX}px`;
        cursorOutline.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
      }

      // Start animation
      animateCursor();

      // Ensure system cursor is hidden
      document.body.style.cursor = 'none';
      
      // Ensure elements are visible
      cursorDot.style.display = 'block';
      cursorOutline.style.display = 'block';

    } else {
      // Hide custom cursor on mobile
      cursorDot.style.display = 'none';
      cursorOutline.style.display = 'none';
      document.body.style.cursor = 'auto';
    }
  }

  // === MOBILE NAVIGATION ===
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileNavToggle && mobileNavMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileNavClose.addEventListener('click', () => {
      mobileNavMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    mobileNavMenu.addEventListener('click', (e) => {
      if (e.target === mobileNavMenu) {
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // === SIMPLE TYPING WELCOME ANIMATION ===
  const welcomeAnimation = document.getElementById('welcome-animation');
  const typedText = document.getElementById('typed-text');

  function showWelcomeAnimation() {
    if (!welcomeAnimation || !typedText) return;

    const message = "Welcome to my Portfolio";
    let index = 0;
    const typingSpeed = 100;
    const totalTime = 2500;

    const typingDuration = message.length * typingSpeed;
    const displayAfterTyping = Math.max(totalTime - typingDuration, 300);

    function typeCharacter() {
      if (index < message.length) {
        typedText.textContent += message.charAt(index);
        index++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        setTimeout(() => {
          welcomeAnimation.style.opacity = '0';
          welcomeAnimation.style.transition = 'opacity 0.5s ease';

          setTimeout(() => {
            if (welcomeAnimation.parentNode) {
              welcomeAnimation.parentNode.removeChild(welcomeAnimation);
            }
          }, 500);
        }, displayAfterTyping);
      }
    }

    typeCharacter();
  }

  showWelcomeAnimation();

  // === AUTO-HIDE NAVIGATION ON SCROLL ===
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const profilePhoto = document.querySelector('.profile-photo');
  const settingsContainer = document.querySelector('.settings-container');
  const socialLinks = document.querySelector('.social-links');

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = header ? header.offsetHeight : 0;

    // Only hide/show when scrolling past header
    if (scrollTop > headerHeight) {
      // Scrolling down - hide elements
      if (scrollTop > lastScrollTop) {
        if (profilePhoto) profilePhoto.style.opacity = '0';
        if (settingsContainer) settingsContainer.style.opacity = '0';
        if (socialLinks && scrollTop > headerHeight + 100) {
          socialLinks.style.opacity = '0';
        }
      }
      // Scrolling up - show elements
      else {
        if (profilePhoto) profilePhoto.style.opacity = '1';
        if (settingsContainer) settingsContainer.style.opacity = '1';
        if (socialLinks) socialLinks.style.opacity = '1';
      }
    }
    // At top of page - always show everything
    else {
      if (profilePhoto) profilePhoto.style.opacity = '1';
      if (settingsContainer) settingsContainer.style.opacity = '1';
      if (socialLinks) socialLinks.style.opacity = '1';
    }

    lastScrollTop = scrollTop;
  }

  // Add smooth transitions
  if (profilePhoto) profilePhoto.style.transition = 'opacity 0.3s ease';
  if (settingsContainer) settingsContainer.style.transition = 'opacity 0.3s ease';
  if (socialLinks) socialLinks.style.transition = 'opacity 0.3s ease';

  window.addEventListener('scroll', handleScroll);

  // --- VARIABLES ---
  const body = document.body;
  const settingsTrigger = document.getElementById('settings-trigger');
  const settingsMenu = document.getElementById('settings-dropdown');
  const themeToggle = document.getElementById('theme-toggle');
  const modeBtn = document.getElementById('mode-cycle-btn');

  // --- 1. SETTINGS MENU TOGGLE ---
  if (settingsTrigger && settingsMenu) {
    settingsTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      settingsMenu.classList.toggle('menu-open');
      const icon = settingsTrigger.querySelector('i');
      if (settingsMenu.classList.contains('menu-open')) {
        icon.classList.replace('fa-ellipsis-vertical', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-ellipsis-vertical');
      }
    });

    document.addEventListener('click', (e) => {
      if (!settingsMenu.contains(e.target) && !settingsTrigger.contains(e.target)) {
        settingsMenu.classList.remove('menu-open');
        const icon = settingsTrigger.querySelector('i');
        icon.classList.replace('fa-xmark', 'fa-ellipsis-vertical');
      }
    });
  }

  // --- 2. LIGHT / DARK THEME TOGGLE ---
  function updateThemeText() {
    if (themeToggle) {
      themeToggle.textContent = body.classList.contains('light-theme') ? 'Dark Mode' : 'Light Mode';
    }
  }

  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
    updateThemeText();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }

  // === CERTIFICATE INTERACTION ===
  const certItems = document.querySelectorAll('.cert-item');

  certItems.forEach(item => {
    const card = item.querySelector('.cert-card-3d');

    if (card) {
      // Check if device is mobile
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        // Desktop: Fast hover effect only
        item.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Fast, subtle tilt
          const xRotate = -((y - rect.height / 2) / rect.height) * 8;
          const yRotate = ((x - rect.width / 2) / rect.width) * 8;

          card.style.transform = `
            perspective(1000px) 
            rotateX(${xRotate}deg) 
            rotateY(${yRotate}deg) 
            scale3d(1.03, 1.03, 1.03)
          `;
          card.style.transition = 'transform 0.15s ease-out';
        });

        item.addEventListener('mouseleave', () => {
          card.style.transform = `
            perspective(1000px) 
            rotateX(0deg) 
            rotateY(0deg) 
            scale3d(1, 1, 1)
          `;
          card.style.transition = 'transform 0.2s ease-out';
        });
      }

      // Remove flip functionality - only open modal
      item.addEventListener('click', function(e) {
        const index = Array.from(certItems).indexOf(item);
        const certFilenames = [
          'blixathon-participation.png',
          'blixathon-runner-up.png',
          'bluestock-internship.png',
          'bluestock-offer-letter.png',
          'dau-hackathon.png',
          'isro-hackathon.png',
          'masai-hackathon.png',
          'bridge-design.png',
          'dsa-iitg.png'
        ];
        if (index < certFilenames.length) {
          const filename = certFilenames[index];
          openCertificateModal(filename);
        }
      });

      // Touch feedback for mobile
      if (isMobile) {
        item.addEventListener('touchstart', () => {
          card.style.transform = 'scale(0.98)';
          card.style.transition = 'transform 0.1s ease';
        });

        item.addEventListener('touchend', () => {
          card.style.transform = 'scale(1)';
          card.style.transition = 'transform 0.2s ease';
        });
      }
    }
  });

  // === ENHANCED GLOW EFFECT FOR CERTIFICATES ===
  const allCertItems = document.querySelectorAll('.cert-item');

  allCertItems.forEach(item => {
    const glow = item.querySelector('.cert-glow');
    const card = item.querySelector('.cert-card-3d');

    if (glow && card) {
      item.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        glow.style.setProperty('--mouse-x', `${x}%`);
        glow.style.setProperty('--mouse-y', `${y}%`);
        glow.style.opacity = '1';
        glow.style.transition = 'opacity 0.1s ease';
      });

      item.addEventListener('mouseleave', () => {
        glow.style.setProperty('--mouse-x', '50%');
        glow.style.setProperty('--mouse-y', '50%');
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 0.3s ease';
      });
    }
  });

  // === CERTIFICATE MODAL FUNCTIONALITY ===
  const certModal = document.getElementById('cert-modal');
  const modalCloseBtn = document.querySelector('.cert-modal-close');

  // Function to open modal with certificate details
  function openCertificateModal(certSrc) {
    const certData = certificateData[certSrc];

    if (!certData) return;

    // Populate modal with data
    document.getElementById('modal-cert-img').src = certSrc;
    document.getElementById('modal-cert-title').textContent = certData.title;
    document.getElementById('modal-cert-description').textContent = certData.description;
    document.getElementById('modal-cert-date').textContent = certData.date;
    document.getElementById('modal-cert-issuer').textContent = certData.issuer;
    document.getElementById('modal-cert-duration').textContent = certData.duration;
    document.getElementById('modal-cert-link').href = certData.link;

    // Set badge
    const modalBadge = document.getElementById('modal-cert-badge');
    modalBadge.textContent = certData.badge;
    modalBadge.className = `cert-modal-badge ${certData.badgeClass}`;

    // Populate skills
    const skillsContainer = document.getElementById('modal-cert-skills');
    skillsContainer.innerHTML = '';
    certData.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'skill-tag';
      skillTag.textContent = skill;
      skillsContainer.appendChild(skillTag);
    });

    // Show modal
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Function to close modal
  function closeCertificateModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }

  // Make ENTIRE certificate items clickable for modal
  certItems.forEach((item, index) => {
    // Add click for modal (with visual feedback)
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const certFilenames = [
        'blixathon-participation.png',
        'blixathon-runner-up.png',
        'bluestock-internship.png',
        'bluestock-offer-letter.png',
        'dau-hackathon.png',
        'isro-hackathon.png',
        'masai-hackathon.png',
        'bridge-design.png',
        'dsa-iitg.png'
      ];
      if (index < certFilenames.length) {
        const filename = certFilenames[index];
        openCertificateModal(filename);
      }
    });

    // Long press for mobile modal
    let pressTimer;
    item.addEventListener('touchstart', (e) => {
      pressTimer = setTimeout(() => {
        // Long press opens modal on mobile
        const certFilenames = [
          'blixathon-participation.png',
          'blixathon-runner-up.png',
          'bluestock-internship.png',
          'bluestock-offer-letter.png',
          'dau-hackathon.png',
          'isro-hackathon.png',
          'masai-hackathon.png',
          'bridge-design.png',
          'dsa-iitg.png'
        ];
        if (index < certFilenames.length) {
          const filename = certFilenames[index];
          openCertificateModal(filename);
        }
      }, 500);
    });

    item.addEventListener('touchend', () => {
      clearTimeout(pressTimer);
    });

    item.addEventListener('touchmove', () => {
      clearTimeout(pressTimer);
    });
  });

  // Close modal events
  modalCloseBtn.addEventListener('click', closeCertificateModal);

  // Close modal when clicking outside content
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeCertificateModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      closeCertificateModal();
    }
  });

  // --- 3. UI MODE CYCLE (5 Modes) ---
  const modes = ['normal', 'theme-glass', 'theme-cyberpunk', 'theme-retro', 'theme-origami'];
  const labels = ['🎨 Normal UI', '🔮 Glass UI', '⚡ Cyberpunk', '📟 Terminal', '✈️ Origami'];
  let currentModeIndex = parseInt(localStorage.getItem('modeIndex')) || 0;

  function applyMode(index) {
    body.classList.remove('theme-glass', 'theme-cyberpunk', 'theme-retro', 'theme-origami');

    const modeClass = modes[index];
    if (modeClass !== 'normal') {
      body.classList.add(modeClass);
    }

    if (modeBtn) {
      modeBtn.textContent = labels[index];
    }

    localStorage.setItem('modeIndex', index);
    currentModeIndex = index;
  }

  applyMode(currentModeIndex);

  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      let nextIndex = (currentModeIndex + 1) % modes.length;
      applyMode(nextIndex);
    });
  }

  // --- 4. SKILLS AUTO SCROLL ---
  const skillsContainer = document.querySelector('.skills-container');
  const skillsTrack = document.querySelector('.skills-track');
  const prevSkillBtn = document.querySelector('.skill-nav-btn.prev-btn');
  const nextSkillBtn = document.querySelector('.skill-nav-btn.next-btn');

  if (skillsContainer && skillsTrack) {
    const originalTrackContent = skillsTrack.innerHTML;
    skillsTrack.innerHTML = originalTrackContent + originalTrackContent;

    let currentPosition = 0;
    let autoScrollInterval;
    const scrollSpeed = 1.5; // Increased scroll speed

    function scrollNext() {
      currentPosition += scrollSpeed;
      const trackWidth = skillsTrack.scrollWidth / 2;

      if (currentPosition >= trackWidth) {
        currentPosition = 0;
      }

      skillsTrack.style.transform = `translateX(-${currentPosition}px)`;
    }

    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(scrollNext, 16); // ~60fps
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    startAutoScroll();
    skillsContainer.addEventListener('mouseenter', stopAutoScroll);
    skillsContainer.addEventListener('mouseleave', startAutoScroll);

    if (nextSkillBtn) {
      nextSkillBtn.addEventListener('click', () => {
        currentPosition += 300; // Increased jump
        const trackWidth = skillsTrack.scrollWidth / 2;
        if (currentPosition >= trackWidth) {
          currentPosition = 0;
        }
        skillsTrack.style.transform = `translateX(-${currentPosition}px)`;
      });
    }

    if (prevSkillBtn) {
      prevSkillBtn.addEventListener('click', () => {
        currentPosition -= 300; // Increased jump
        if (currentPosition < 0) {
          currentPosition = 0;
        }
        skillsTrack.style.transform = `translateX(-${currentPosition}px)`;
      });
    }
  }

  // --- 5. SMOOTH SCROLL FOR NAVIGATION LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // === MOBILE-SPECIFIC OPTIMIZATIONS ===
  function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Disable custom cursor on mobile
      if (cursorDot) cursorDot.style.display = 'none';
      if (cursorOutline) cursorOutline.style.display = 'none';
      document.body.style.cursor = 'auto';

      // Hide desktop navigation on mobile
      const topNav = document.querySelector('.top-nav');
      if (topNav) {
        topNav.style.display = 'none';
      }

      // Show mobile nav toggle
      const mobileToggle = document.getElementById('mobile-nav-toggle');
      if (mobileToggle) {
        mobileToggle.style.display = 'flex';
      }

      // Adjust certificate grid for mobile
      const certGrid = document.querySelector('.cert-3d-grid');
      if (certGrid) {
        certGrid.style.padding = '0 20px';
      }

      // Reduce animation speeds on mobile for better performance
      document.documentElement.style.setProperty('--animation-speed', '0.3s');
    } else {
      // Desktop optimizations
      const mobileToggle = document.getElementById('mobile-nav-toggle');
      if (mobileToggle) {
        mobileToggle.style.display = 'none';
      }

      const mobileNav = document.getElementById('mobile-nav-menu');
      if (mobileNav) {
        mobileNav.style.display = 'none';
      }

      // Show desktop navigation
      const topNav = document.querySelector('.top-nav');
      if (topNav) {
        topNav.style.display = 'flex';
      }

      document.documentElement.style.setProperty('--animation-speed', '0.2s');
    }
  }

  // Initial mobile optimization
  optimizeForMobile();

  // Update on resize
  window.addEventListener('resize', optimizeForMobile);

  // === ACTIVE NAVIGATION HIGHLIGHTING ===
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.top-nav a, .mobile-nav-link');

    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);

  // Initial update
  setTimeout(updateActiveNav, 100);

  // === MOBILE GESTURE SUPPORT ===
  // Swipe support for mobile certificate viewing
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - previous
        // console.log('Swiped right');
      } else {
        // Swipe left - next
        // console.log('Swiped left');
      }
    }
  }

  // === PERFORMANCE OPTIMIZATIONS ===
  // Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(optimizeForMobile, 250);
  });

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // === INITIALIZE ===
  // Run after DOM is loaded
  setTimeout(() => {
    // Add loaded class for animations
    document.body.classList.add('loaded');

    // Check and optimize for current device
    optimizeForMobile();
  }, 100);
});

// === AUTO-DETECT CERTIFICATE ORIENTATION & RESIZE CARD ===
function detectCertificateOrientation() {
  const certImages = document.querySelectorAll('.cert-img');

  certImages.forEach(img => {
    // Find the parent 3D card container
    const cardContainer = img.closest('.cert-card-3d');
    
    // Create a temp image to get natural dimensions
    const tempImg = new Image();
    tempImg.src = img.src;

    tempImg.onload = function() {
      const width = tempImg.naturalWidth;
      const height = tempImg.naturalHeight;

      // Remove existing classes to prevent conflicts
      img.classList.remove('landscape', 'portrait');
      if (cardContainer) {
        cardContainer.classList.remove('landscape-card', 'portrait-card');
      }

      // Check orientation
      if (width >= height) {
        // LANDSCAPE (Wider than tall)
        img.classList.add('landscape');
        if (cardContainer) cardContainer.classList.add('landscape-card');
      } else {
        // PORTRAIT (Taller than wide)
        img.classList.add('portrait');
        if (cardContainer) cardContainer.classList.add('portrait-card');
      }
    };
  });
}

// Run after page loads and whenever images are loaded
window.addEventListener('load', detectCertificateOrientation);

// Also run when DOM is ready (fallback)
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(detectCertificateOrientation, 500); 
});
