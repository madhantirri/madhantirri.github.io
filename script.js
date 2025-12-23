document.addEventListener('DOMContentLoaded', function() {

  // === SIMPLE TYPING WELCOME ANIMATION ===
  const welcomeAnimation = document.getElementById('welcome-animation');
  const typedText = document.getElementById('typed-text');
  
  function showWelcomeAnimation() {
    if (!welcomeAnimation || !typedText) return;
    
    const message = "My portfolio is currently under development";
    let index = 0;
    const typingSpeed = 100; // Speed per character
    const totalTime = 2500; // Total display: 2.5 seconds
    
    // Calculate typing duration
    const typingDuration = message.length * typingSpeed;
    const displayAfterTyping = totalTime - typingDuration;
    
    function typeCharacter() {
      if (index < message.length) {
        typedText.textContent += message.charAt(index);
        index++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        // After typing completes, wait and fade out
        setTimeout(() => {
          welcomeAnimation.style.opacity = '0';
          welcomeAnimation.style.transition = 'opacity 0.5s ease';
          
          // Remove from DOM after fade out
          setTimeout(() => {
            if (welcomeAnimation.parentNode) {
              welcomeAnimation.parentNode.removeChild(welcomeAnimation);
            }
          }, 500);
        }, Math.max(displayAfterTyping, 300)); // Minimum 300ms display
      }
    }
    
    // Start typing immediately
    typeCharacter();
  }
  
  // Show animation on every page load/refresh
  showWelcomeAnimation();


  // === REST OF YOUR EXISTING CODE ===
  
  // --- VARIABLES ---
  const body = document.body;
  const settingsTrigger = document.getElementById('settings-trigger');
  const settingsMenu = document.getElementById('settings-dropdown');
  const themeToggle = document.getElementById('theme-toggle');
  const modeBtn = document.getElementById('mode-cycle-btn');
  const cursorBtn = document.getElementById('cursor-toggle-btn');
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  
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

  // --- 2. THEME CURSOR TOGGLE BUTTON (Top Right) ---
  if (cursorBtn) {
    // Check if theme cursor was previously enabled
    const themeCursorEnabled = localStorage.getItem('themeCursor') === 'enabled';
    
    // Initialize theme cursor
    if (themeCursorEnabled) {
      enableThemeCursor();
    } else {
      disableThemeCursor();
    }

    // Toggle theme cursor on button click
    cursorBtn.addEventListener('click', () => {
      if (body.classList.contains('theme-cursor-active')) {
        disableThemeCursor();
      } else {
        enableThemeCursor();
      }
    });

    function enableThemeCursor() {
      body.classList.add('theme-cursor-active');
      cursorBtn.classList.add('active');
      localStorage.setItem('themeCursor', 'enabled');
      updateCursorBasedOnTheme();
    }

    function disableThemeCursor() {
      body.classList.remove('theme-cursor-active');
      cursorBtn.classList.remove('active');
      localStorage.setItem('themeCursor', 'disabled');
      // Remove all cursor type classes
      body.classList.remove('cursor-normal', 'cursor-crosshair', 'cursor-pointer', 'cursor-text', 
                           'cursor-wait', 'cursor-help', 'cursor-not-allowed', 'cursor-move', 
                           'cursor-zoom-in', 'cursor-custom');
    }
  }

  // --- 3. ANIMATE STATS COUNTER ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCount();
    });
  }
  
  // Trigger stats animation when certificates section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const certificatesSection = document.getElementById('certificates');
  if (certificatesSection) {
    observer.observe(certificatesSection);
  }

  // --- 4. CURSOR ANIMATION (For Theme Cursor) ---
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot && body.classList.contains('theme-cursor-active')) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function animateCursor() {
    if (body.classList.contains('theme-cursor-active')) {
      let distX = mouseX - cursorX;
      let distY = mouseY - cursorY;
      cursorX += distX * 0.15; // smooth lag
      cursorY += distY * 0.15;
      
      if (cursorOutline) {
        cursorOutline.style.left = `${cursorX}px`;
        cursorOutline.style.top = `${cursorY}px`;
      }
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects for Theme Cursor
  const interactiveElements = document.querySelectorAll('a, button, .carousel-control, .skill-nav-btn, input');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (body.classList.contains('theme-cursor-active')) {
        body.classList.add('hovering');
      }
    });
    el.addEventListener('mouseleave', () => {
      if (body.classList.contains('theme-cursor-active')) {
        body.classList.remove('hovering');
      }
    });
  });

  // --- 5. LIGHT / DARK THEME TOGGLE ---
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
    updateCursorBasedOnTheme();
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

  // --- 6. UI MODE CYCLE (5 Modes) ---
  const modes = ['normal', 'theme-glass', 'theme-cyberpunk', 'theme-retro', 'theme-origami'];
  const labels = ['🎨 Normal UI', '🔮 Glass UI', '⚡ Cyberpunk', '📟 Terminal', '✈️ Origami'];
  let currentModeIndex = parseInt(localStorage.getItem('modeIndex')) || 0;

  function applyMode(index) {
    // Remove all theme classes
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
    updateCursorBasedOnTheme();
  }
  
  // Init Mode
  applyMode(currentModeIndex);
  
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      let nextIndex = (currentModeIndex + 1) % modes.length;
      applyMode(nextIndex);
    });
  }

  // --- 7. UPDATE CURSOR BASED ON CURRENT THEME ---
  function updateCursorBasedOnTheme() {
    if (!body.classList.contains('theme-cursor-active')) return;
    
    // Remove all cursor type classes
    body.classList.remove('cursor-normal', 'cursor-crosshair', 'cursor-pointer', 'cursor-text', 
                         'cursor-wait', 'cursor-help', 'cursor-not-allowed', 'cursor-move', 
                         'cursor-zoom-in', 'cursor-custom');
    
    // Apply cursor based on current theme
    if (body.classList.contains('theme-glass')) {
      body.classList.add('cursor-crosshair');
    } else if (body.classList.contains('theme-cyberpunk')) {
      body.classList.add('cursor-custom');
    } else if (body.classList.contains('theme-retro')) {
      body.classList.add('cursor-text');
    } else if (body.classList.contains('theme-origami')) {
      body.classList.add('cursor-pointer');
    } else {
      // Default/Normal theme - use custom dot cursor
      body.classList.add('cursor-custom');
    }
  }

  // --- 8. CURSOR TYPE CYCLE (Inside 3 dots settings - NORMAL CURSORS ONLY) ---
  const normalCursorTypes = [
    { name: 'normal', icon: '🐭', label: 'Normal Cursor' },
    { name: 'crosshair', icon: '➕', label: 'Crosshair' },
    { name: 'pointer', icon: '👆', label: 'Pointer' },
    { name: 'text', icon: '📝', label: 'Text' },
    { name: 'wait', icon: '⏳', label: 'Wait' },
    { name: 'help', icon: '❓', label: 'Help' },
    { name: 'not-allowed', icon: '🚫', label: 'Not Allowed' },
    { name: 'move', icon: '↔️', label: 'Move' },
    { name: 'zoom-in', icon: '🔍', label: 'Zoom In' }
  ];

  const cursorCycleBtn = document.getElementById('cursor-cycle-btn');
  let currentNormalCursorIndex = parseInt(localStorage.getItem('normalCursorIndex')) || 0;

  function applyNormalCursor(index) {
    // Only apply if theme cursor is NOT active
    if (body.classList.contains('theme-cursor-active')) {
      // If theme cursor is active, disable it first
      disableThemeCursor();
      if (cursorBtn) cursorBtn.classList.remove('active');
    }
    
    // Remove all cursor classes
    normalCursorTypes.forEach(type => {
      body.classList.remove(`cursor-${type.name}`);
    });
    
    // Apply current cursor class
    const cursorType = normalCursorTypes[index];
    if (cursorType.name !== 'normal') {
      body.classList.add(`cursor-${cursorType.name}`);
    }
    
    // Update button text
    if (cursorCycleBtn) {
      cursorCycleBtn.innerHTML = `${cursorType.icon} ${cursorType.label}`;
    }
    
    // Save to localStorage
    localStorage.setItem('normalCursorIndex', index);
    currentNormalCursorIndex = index;
  }

  // Initialize normal cursor type
  if (!body.classList.contains('theme-cursor-active')) {
    applyNormalCursor(currentNormalCursorIndex);
  } else {
    // If theme cursor is active, show appropriate label
    if (cursorCycleBtn) {
      cursorCycleBtn.innerHTML = '🎨 Theme Cursor Active';
    }
  }

  // Add click event to cycle through normal cursors
  if (cursorCycleBtn) {
    cursorCycleBtn.addEventListener('click', () => {
      if (body.classList.contains('theme-cursor-active')) {
        // If theme cursor is active, disable it and switch to normal cursor
        disableThemeCursor();
        applyNormalCursor(0); // Start with normal cursor
      } else {
        // Cycle through normal cursors
        let nextIndex = (currentNormalCursorIndex + 1) % normalCursorTypes.length;
        applyNormalCursor(nextIndex);
      }
    });
  }

  // --- 9. CERTIFICATE GALLERY WITH FILTERING & MODAL ---
  const certificateModal = document.getElementById('certificateModal');
  const modalCertificateImg = document.querySelector('.modal-certificate-img');
  const modalTitle = document.querySelector('.modal-title');
  const modalOrg = document.querySelector('.modal-org');
  const modalDesc = document.getElementById('modalDesc');
  const modalDate = document.getElementById('modalDate');
  const modalID = document.getElementById('modalID');
  const modalDuration = document.getElementById('modalDuration');
  const modalSkills = document.getElementById('modalSkills');
  const closeModalBtn = document.querySelector('.certificate-modal .close-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const downloadCertBtn = document.getElementById('downloadCert');
  const shareCertBtn = document.getElementById('shareCert');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certificateCards = document.querySelectorAll('.certificate-card');
  const viewFullBtns = document.querySelectorAll('.view-full-btn');
  const viewAllCertificatesBtn = document.getElementById('view-all-certificates');

  // Enhanced Certificate Data
  const certificateData = {
    'blix': {
      title: 'Blixathon IIT Bombay',
      org: 'IIT Bombay TechFest',
      desc: 'Participated in the 24-hour hackathon at IIT Bombay, developing an innovative solution for urban transportation challenges using IoT and machine learning. This certificate recognizes active participation and contribution to the development of smart city solutions.',
      image: 'blix.png',
      date: 'December 2023',
      id: 'BLX-HCK-2023-001',
      duration: '24 hours',
      skills: ['IoT Development', 'Machine Learning', 'Problem Solving', 'Team Collaboration', 'Smart Cities'],
      downloadUrl: 'blix.png'
    },
    'bridge': {
      title: 'Bridge Building Competition',
      org: 'IITRAM Engineering Week',
      desc: 'Awarded for designing and constructing a model bridge that could withstand maximum load with minimal material usage. This competition tested structural engineering principles, material science understanding, and innovative design thinking.',
      image: 'bridge.png',
      date: 'November 2023',
      id: 'BRG-CMP-2023-002',
      duration: '2 weeks',
      skills: ['Structural Design', 'Material Science', 'CAD Modeling', 'Innovation', 'Engineering Principles'],
      downloadUrl: 'bridge.png'
    },
    'neuracode': {
      title: 'Neuracode AI Hackathon',
      org: 'Neuracode Technologies',
      desc: 'Certificate of participation in the 24-hour Neuracode hackathon for developing a prototype of an AI-based mental health assistant using Natural Language Processing (NLP) and machine learning algorithms.',
      image: 'neuracode-certificate.jpg',
      date: 'October 2023',
      id: 'NRC-AI-2023-003',
      duration: '24 hours',
      skills: ['Artificial Intelligence', 'Natural Language Processing', 'Machine Learning', 'Mental Health Tech', 'Prototyping'],
      downloadUrl: 'neuracode-certificate.jpg'
    },
    'webdev': {
      title: 'Advanced Web Development',
      org: 'Coursera Certification',
      desc: 'Completed comprehensive course on modern web development covering HTML5, CSS3, JavaScript ES6+, React, Node.js, and database integration. Demonstrated proficiency in building responsive web applications.',
      image: 'certificate4.jpg',
      date: 'August 2023',
      id: 'WEB-DEV-2023-004',
      duration: '120 hours',
      skills: ['HTML5/CSS3', 'JavaScript ES6+', 'React.js', 'Node.js', 'Database Integration', 'Responsive Design'],
      downloadUrl: 'certificate4.jpg'
    },
    'ml': {
      title: 'Machine Learning Fundamentals',
      org: 'Stanford Online',
      desc: 'Successfully completed course covering core machine learning concepts including supervised learning, unsupervised learning, neural networks, and practical implementation using Python and scikit-learn.',
      image: 'certificate5.jpg',
      date: 'June 2023',
      id: 'ML-FND-2023-005',
      duration: '80 hours',
      skills: ['Python Programming', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'scikit-learn', 'Data Analysis'],
      downloadUrl: 'certificate5.jpg'
    }
  };

  // Filter certificates
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Filter certificates
        certificateCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            // Add animation
            card.style.animation = 'none';
            setTimeout(() => {
              card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Open certificate modal
  if (viewFullBtns.length > 0) {
    viewFullBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const certId = btn.dataset.cert;
        const certData = certificateData[certId];
        
        if (certData) {
          modalTitle.textContent = certData.title;
          modalOrg.textContent = certData.org;
          modalDesc.textContent = certData.desc;
          modalDate.textContent = certData.date;
          modalID.textContent = certData.id;
          modalDuration.textContent = certData.duration;
          modalCertificateImg.src = certData.image;
          modalCertificateImg.alt = certData.title;
          
          // Update skills list
          modalSkills.innerHTML = '';
          certData.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            modalSkills.appendChild(skillTag);
          });
          
          // Update download button
          if (downloadCertBtn) {
            downloadCertBtn.onclick = () => {
              const link = document.createElement('a');
              link.href = certData.downloadUrl;
              link.download = `${certData.title.replace(/\s+/g, '_')}_certificate.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            };
          }
          
          // Update share button
          if (shareCertBtn) {
            shareCertBtn.onclick = () => {
              if (navigator.share) {
                navigator.share({
                  title: certData.title,
                  text: `Check out my certificate: ${certData.title} from ${certData.org}`,
                  url: window.location.href
                });
              } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(`${certData.title} - ${certData.org}\n${window.location.href}`);
                alert('Certificate link copied to clipboard!');
              }
            };
          }
          
          certificateModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // View all certificates
  if (viewAllCertificatesBtn) {
    viewAllCertificatesBtn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      filterBtns[0].classList.add('active'); // Select "All" filter
      
      certificateCards.forEach(card => {
        card.style.display = 'flex';
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, 10);
      });
      
      // Scroll to certificates section
      certificatesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Close modal functions
  function closeModal() {
    certificateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  if (certificateModal) {
    certificateModal.addEventListener('click', (e) => {
      if (e.target === certificateModal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.style.display === 'flex') {
      closeModal();
    }
  });

  // --- 10. SKILLS AUTO SCROLL ---
  const skillsContainer = document.querySelector('.skills-container');
  const skillsTrack = document.querySelector('.skills-track');
  const prevSkillBtn = document.querySelector('.skill-nav-btn.prev-btn');
  const nextSkillBtn = document.querySelector('.skill-nav-btn.next-btn');

  if (skillsContainer && skillsTrack) {
    // Store original track width
    const originalTrackContent = skillsTrack.innerHTML;
    // Clone items for seamless loop
    skillsTrack.innerHTML = originalTrackContent + originalTrackContent;
    
    let currentPosition = 0;
    let autoScrollInterval;
    const scrollSpeed = 1;

    function scrollNext() {
      currentPosition += scrollSpeed;
      const trackWidth = skillsTrack.scrollWidth / 2;
      
      // Reset to start when we've scrolled half the track width
      if (currentPosition >= trackWidth) {
        currentPosition = 0;
      }
      
      skillsTrack.style.transform = `translateX(-${currentPosition}px)`;
    }
    
    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(scrollNext, 20);
    }
    
    function stopAutoScroll() { 
      clearInterval(autoScrollInterval); 
    }

    startAutoScroll();
    skillsContainer.addEventListener('mouseenter', stopAutoScroll);
    skillsContainer.addEventListener('mouseleave', startAutoScroll);
    
    if(nextSkillBtn) {
      nextSkillBtn.addEventListener('click', () => { 
        currentPosition += 200; 
        const trackWidth = skillsTrack.scrollWidth / 2;
        if (currentPosition >= trackWidth) {
          currentPosition = 0;
        }
        skillsTrack.style.transform = `translateX(-${currentPosition}px)`; 
      });
    }
    
    if(prevSkillBtn) {
      prevSkillBtn.addEventListener('click', () => { 
        currentPosition -= 200; 
        if(currentPosition < 0) {
          currentPosition = 0;
        } 
        skillsTrack.style.transform = `translateX(-${currentPosition}px)`; 
      });
    }
  }

  // --- 11. SMOOTH SCROLL FOR NAVIGATION LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
});