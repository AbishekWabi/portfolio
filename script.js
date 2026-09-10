/* ==========================================================================
   ABISHEK W - DIGITAL MARKETER PORTFOLIO INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selectors ---
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Case Study Modal Elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalBody = document.getElementById('modalBody');
  const caseStudyBtns = document.querySelectorAll('.btn-case-study');

  // --- Case Study Data ---
  const caseStudies = {
    'meta-ads': {
      title: 'Meta Ads Campaign Management',
      category: 'Meta Ads',
      body: `
        <p>This project showcases my practical experience in setting up and managing structured lead generation campaigns on Facebook and Instagram using Meta Ads Manager.</p>
        <h4>Key Execution Steps:</h4>
        <ul>
          <li><strong>Audience Targeting:</strong> Defined custom and interest-based audience personas to reach relevant prospects.</li>
          <li><strong>Placement Optimization:</strong> Selected strategic ad placements (Feeds, Stories, Reels) for maximum engagement.</li>
          <li><strong>Budget & Bidding:</strong> Configured daily and lifetime campaign budgets to ensure optimal ad delivery.</li>
          <li><strong>Performance Monitoring:</strong> Regularly tracked key metrics including Impressions, Clicks, CTR, and Leads in Meta Ads Manager.</li>
          <li><strong>A/B Testing & Tweaks:</strong> Optimized ad copy, headline variations, and visuals to improve campaign outcomes.</li>
        </ul>
      `
    },
    'seo-research': {
      title: 'SEO & Keyword Research Strategy',
      category: 'SEO',
      body: `
        <p>A comprehensive SEO foundational project focused on keyword discovery, on-page optimization, and web visibility best practices.</p>
        <h4>Key Execution Steps:</h4>
        <ul>
          <li><strong>Keyword Research:</strong> Utilized SEMrush and Ahrefs to identify target search queries, intent, and keyword difficulty.</li>
          <li><strong>On-Page SEO:</strong> Optimized Meta Titles, Meta Descriptions, Heading Hierarchies (H1-H4), and Image ALT tags.</li>
          <li><strong>Technical & Content Structure:</strong> Analyzed URL structure, internal link hierarchy, and site readability.</li>
          <li><strong>Off-Page Foundations:</strong> Applied foundational link-building concepts and digital footprint growth strategies.</li>
        </ul>
      `
    },
    'social-media': {
      title: 'Social Media Content Creation',
      category: 'Social Media Marketing',
      body: `
        <p>Creative social media content creation and visual asset design crafted for Instagram, Facebook, and LinkedIn audience engagement.</p>
        <h4>Key Execution Steps:</h4>
        <ul>
          <li><strong>Content Planning:</strong> Conceptualized post ideas, carousel layouts, and Short-form video / Reels scripts.</li>
          <li><strong>Graphic Design:</strong> Designed visually engaging social posts using Canva following brand color guidelines.</li>
          <li><strong>Copywriting & Hashtags:</strong> Drafted persuasive captions with targeted hashtag strategies to increase organic reach.</li>
          <li><strong>Audience Interaction:</strong> Planned post schedules for peak engagement times across social channels.</li>
        </ul>
      `
    }
  };

  // --- 1. Sticky Navbar on Scroll ---
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  // --- 2. Mobile Navigation Toggle ---
  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    mobileToggle.classList.add('open');
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 3. Scroll Reveal Animation (IntersectionObserver) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(element => {
    revealObserver.observe(element);
  });

  // --- 4. Case Study Modal Interactions ---
  caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const data = caseStudies[projectKey];

      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalBody.innerHTML = data.body;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 5. Contact Form Submission (Visual Feedback) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields.';
        return;
      }

      // Show temporary sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you for reaching out! Your message has been received.';
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }
});
