// Portfolio Main JavaScript
class Portfolio {
  constructor() {
    this.currentSection = 'home';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupAnimations();
    this.setupParticles();
    this.setupThreeJS();
    this.setupGitHubIntegration();
    this.setupCounters();
    this.setupScrollEffects();
    this.setupMatrixRain();
    this.setupCustomCursor();
    this.setupFloatingActions();
    this.setupSkillBars();
    this.setupTerminal();
    this.setupInteractiveElements();
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('[data-section]');

    // Navigation click handlers
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        this.showSection(targetSection);
        this.updateActiveNav(link);
      });
    });

    // Button click handlers
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = button.getAttribute('data-section');
        if (targetSection) {
          this.showSection(targetSection);
          this.updateActiveNav(document.querySelector(`[data-section="${targetSection}"]`));
        }
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = ['home', 'projects', 'experience', 'about', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        let nextIndex;
        
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % sections.length;
        } else {
          nextIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        this.showSection(sections[nextIndex]);
        this.updateActiveNav(document.querySelector(`[data-section="${sections[nextIndex]}"]`));
      }
    });
  }

  showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentSection = sectionId;
      
      // Animate section content
      this.animateSectionContent(targetSection);
    }
  }

  updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  animateSectionContent(section) {
    if (!window.gsap) return;

    const elements = section.querySelectorAll('.section-title, .section-subtitle, .project-card, .timeline-item, .skill-category, .contact-item');
    
    gsap.fromTo(elements, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }

  setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Set initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    const isDark = stored ? stored === 'dark' : prefersDark;
    
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    toggle.textContent = isDark ? '☀️' : '🌙';

    toggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.dataset.theme === 'dark';
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      
      document.documentElement.dataset.theme = newTheme;
      toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', newTheme);
      
      // Animate theme change
      if (window.gsap) {
        gsap.to(document.body, { 
          duration: 0.3, 
          ease: 'power2.inOut',
          onComplete: () => {
            // Theme change complete
          }
        });
      }
    });
  }

  setupAnimations() {
    if (!window.gsap) return;

    // Hero animations
    const heroElements = document.querySelectorAll('.hero-title .greeting, .hero-title .name, .hero-title .title, .hero-description, .hero-buttons, .social-links');
    
    gsap.fromTo(heroElements, 
      { 
        opacity: 0, 
        y: 50,
        rotationX: 90
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          scale: 0,
          rotation: 180
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1 + (index * 0.2)
        }
      );
    });

    // Stats animation
    const statItems = document.querySelectorAll('.stat-item');
    gsap.fromTo(statItems,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 2
      }
    );
  }

  setupParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      container.appendChild(particle);
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }

  setupThreeJS() {
    if (!window.THREE) return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create geometric shapes
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00d4ff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      mesh.rotation.x = time * 0.5;
      mesh.rotation.y = time * 0.3;
      mesh.position.y = Math.sin(time) * 0.5;
      
      pointLight.position.x = Math.sin(time) * 10;
      pointLight.position.z = Math.cos(time) * 10;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  setupGitHubIntegration() {
    if (!window.__GITHUB_USERNAME__) return;

    this.fetchGitHubRepos()
      .then(repos => {
        this.displayGitHubRepos(repos);
      })
      .catch(error => {
        console.error('Failed to fetch GitHub repos:', error);
      });
  }

  async fetchGitHubRepos() {
    const username = window.__GITHUB_USERNAME__;
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    return response.json();
  }

  displayGitHubRepos(repos) {
    const container = document.getElementById('github-projects');
    if (!container) return;

    // Enhanced project descriptions with detailed information
    const projectDescriptions = {
      'Market-Data-Services': 'Real-time financial market data processing system with high-frequency trading capabilities and advanced analytics.',
      'DreamInsightAI': 'AI-powered dream analysis platform using NLP and machine learning to interpret and provide insights on dream patterns.',
      'NetflixSentiment': 'Sentiment analysis tool for Netflix content using natural language processing and deep learning models.',
      'mindsdb': 'Open-source machine learning platform for automated machine learning and predictive analytics.',
      'weather-prediction-system': 'Advanced weather forecasting system using LSTM neural networks and time series analysis.',
      'piyushkunjilwar.github.io': 'Personal portfolio website showcasing projects, skills, and professional experience with interactive features.'
    };

    const projectDetails = {
      'Market-Data-Services': {
        architecture: 'Microservices architecture with real-time data streaming',
        performance: 'Sub-millisecond latency for high-frequency trading',
        deployment: 'Docker containers with Kubernetes orchestration',
        optimization: 'Redis caching and PostgreSQL optimization'
      },
      'DreamInsightAI': {
        architecture: 'Transformer-based NLP with collaborative filtering',
        performance: '92% accuracy in dream pattern recognition',
        deployment: 'Cloud-native with auto-scaling capabilities',
        optimization: 'ONNX runtime with 8-bit quantization'
      },
      'NetflixSentiment': {
        architecture: 'Multi-model sentiment analysis pipeline',
        performance: 'Real-time processing of streaming content',
        deployment: 'AWS Lambda with S3 data storage',
        optimization: 'Scikit-learn with NLTK preprocessing'
      },
      'mindsdb': {
        architecture: 'Automated ML platform with SQL interface',
        performance: 'AutoML with automated feature engineering',
        deployment: 'Containerized deployment with REST APIs',
        optimization: 'Automated hyperparameter tuning'
      },
      'weather-prediction-system': {
        architecture: 'LSTM-based time series forecasting',
        performance: '91.15% accuracy in weather prediction',
        deployment: 'PyTorch models with data visualization',
        optimization: 'Deep learning with time series analysis'
      },
      'piyushkunjilwar.github.io': {
        architecture: 'Interactive portfolio with 3D animations',
        performance: 'Smooth 60fps animations and transitions',
        deployment: 'Static site with GitHub Pages hosting',
        optimization: 'Three.js and GSAP for advanced effects'
      }
    };

    // Filter and sort repos
    const filteredRepos = repos
      .filter(repo => !repo.fork && !repo.archived)
      .sort((a, b) => (b.stargazers_count + b.forks) - (a.stargazers_count + a.forks))
      .slice(0, 6);

    container.innerHTML = filteredRepos.map(repo => {
      const description = projectDescriptions[repo.name] || repo.description || 'Advanced software project with cutting-edge technology implementation.';
      const techStack = this.getTechStackForRepo(repo);
      const details = projectDetails[repo.name] || {
        architecture: 'Modern software architecture with best practices',
        performance: 'Optimized for high performance and scalability',
        deployment: 'Cloud-native deployment with containerization',
        optimization: 'Advanced optimization techniques implemented'
      };
      
      return `
        <div class="project-card github-card">
          <div class="project-image">
            <div class="project-visual">
              <div class="github-visual">
                <div class="code-lines">
                  <div class="line line-1"></div>
                  <div class="line line-2"></div>
                  <div class="line line-3"></div>
                  <div class="line line-4"></div>
                </div>
              </div>
            </div>
            <div class="project-overlay">
              <div class="project-tech">
                ${techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-details">
              <div class="detail-item">
                <span class="detail-label">Architecture:</span>
                <span class="detail-value">${details.architecture}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Performance:</span>
                <span class="detail-value">${details.performance}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Deployment:</span>
                <span class="detail-value">${details.deployment}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Optimization:</span>
                <span class="detail-value">${details.optimization}</span>
              </div>
            </div>
            <div class="project-stats">
              <span class="stat">⭐ ${repo.stargazers_count}</span>
              <span class="stat">⑂ ${repo.forks}</span>
              <span class="stat">📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Animate GitHub cards
    if (window.gsap) {
      gsap.fromTo('.github-card',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }

  getTechStackForRepo(repo) {
    const techMap = {
      'Market-Data-Services': ['Python', 'FastAPI', 'Redis', 'PostgreSQL'],
      'DreamInsightAI': ['Python', 'PyTorch', 'NLP', 'Transformers'],
      'NetflixSentiment': ['Python', 'Scikit-learn', 'NLTK', 'Pandas'],
      'mindsdb': ['Python', 'SQL', 'ML', 'AutoML'],
      'weather-prediction-system': ['Python', 'PyTorch', 'LSTM', 'Time Series'],
      'piyushkunjilwar.github.io': ['HTML', 'CSS', 'JavaScript', 'Three.js']
    };
    
    return techMap[repo.name] || [repo.language || 'Code', 'Git', 'GitHub'];
  }

  formatRepoSize(size) {
    if (size < 1024) return `${size} KB`;
    return `${(size / 1024).toFixed(1)} MB`;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  setupCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const isPercent = counter.textContent.includes('%');
      const isPlus = counter.textContent.includes('+');
      
      if (window.gsap) {
        gsap.fromTo(counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              const value = Math.floor(this.targets()[0].textContent);
              let suffix = '';
              if (isPercent) suffix = '%';
              else if (isPlus) suffix = '+';
              counter.textContent = value.toLocaleString() + suffix;
            }
          }
        );
      } else {
        // Fallback counter animation
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          let suffix = '';
          if (isPercent) suffix = '%';
          else if (isPlus) suffix = '+';
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 33);
      }
    });
  }

  setupScrollEffects() {
    // Parallax effect for floating cards
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.floating-card');
      
      parallax.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.project-card, .timeline-item, .skill-category').forEach(el => {
      observer.observe(el);
    });
  }

  setupMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    if (!matrixContainer) return;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.style.cssText = `
        position: absolute;
        top: -100px;
        left: ${i * fontSize}px;
        font-family: 'Courier New', monospace;
        font-size: ${fontSize}px;
        color: var(--primary);
        opacity: 0.1;
        animation: matrix-fall ${3 + Math.random() * 4}s linear infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      let text = '';
      for (let j = 0; j < 20; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
      }
      column.innerHTML = text;
      matrixContainer.appendChild(column);
    }

    // Add matrix animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes matrix-fall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
      }
    `;
    document.head.appendChild(style);
  }

  setupCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursor || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth cursor outline animation
    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;
      
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .nav-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.opacity = '0.5';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.opacity = '0.3';
      });
    });
  }

  setupFloatingActions() {
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.querySelector('.fab-menu');
    const fabItems = document.querySelectorAll('.fab-item');
    
    if (!fabMain || !fabMenu) return;

    let isOpen = false;

    fabMain.addEventListener('click', () => {
      isOpen = !isOpen;
      fabMenu.classList.toggle('active', isOpen);
      
      // Animate FAB items
      fabItems.forEach((item, index) => {
        if (isOpen) {
          gsap.fromTo(item, 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, delay: index * 0.1, ease: 'back.out(1.7)' }
          );
        } else {
          gsap.to(item, { scale: 0, opacity: 0, duration: 0.2, delay: index * 0.05 });
        }
      });
    });

    // FAB item click handlers
    fabItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetSection = item.getAttribute('data-section');
        if (targetSection) {
          this.showSection(targetSection);
          this.updateActiveNav(document.querySelector(`[data-section="${targetSection}"]`));
          fabMenu.classList.remove('active');
          isOpen = false;
        }
      });
    });
  }

  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width;
          
          // Animate percentage
          const percentage = entry.target.parentElement.nextElementSibling;
          if (percentage) {
            const targetValue = parseInt(width);
            let currentValue = 0;
            const increment = targetValue / 60;
            
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
              }
              percentage.textContent = Math.floor(currentValue) + '%';
            }, 33);
          }
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  setupTerminal() {
    const terminal = document.querySelector('.terminal-container');
    if (!terminal) return;

    // Add typing effect to terminal commands
    const commands = document.querySelectorAll('.typing-command');
    commands.forEach((command, index) => {
      const text = command.textContent;
      command.textContent = '';
      
      setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
          command.textContent += text[i];
          i++;
          if (i >= text.length) {
            clearInterval(typeInterval);
          }
        }, 100);
      }, index * 2000);
    });

    // Add interactive terminal functionality
    terminal.addEventListener('click', () => {
      terminal.style.transform = 'scale(1.02)';
      setTimeout(() => {
        terminal.style.transform = 'scale(1)';
      }, 200);
    });
  }

  setupInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Add magnetic effect to floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
      });
    });

    // Setup interactive experience section
    this.setupExperienceInteraction();
  }

  setupExperienceInteraction() {
    const pathNodes = document.querySelectorAll('.path-node');
    const experienceCards = document.querySelectorAll('.experience-card');
    
    if (!pathNodes.length || !experienceCards.length) return;

    pathNodes.forEach(node => {
      node.addEventListener('click', () => {
        const role = node.getAttribute('data-role');
        
        // Update active node
        pathNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        
        // Update active card
        experienceCards.forEach(card => {
          card.classList.remove('active');
          if (card.getAttribute('data-role') === role) {
            card.classList.add('active');
            
            // Animate card entrance
            if (window.gsap) {
              gsap.fromTo(card,
                { opacity: 0, x: 50, scale: 0.9 },
                { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
              );
            }
          }
        });
      });
    });

    // Auto-rotate through experience cards
    let currentIndex = 0;
    const autoRotate = () => {
      if (pathNodes.length > 1) {
        currentIndex = (currentIndex + 1) % pathNodes.length;
        pathNodes[currentIndex].click();
      }
    };

    // Start auto-rotation after 5 seconds
    setTimeout(() => {
      setInterval(autoRotate, 8000);
    }, 5000);
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-2px)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translateY(0)';
    });
  });
});


