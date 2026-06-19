/* C:\Users\mjk81\.gemini\antigravity\scratch\portsmouth-kitchen-fitter\js\main.js */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFormValidation();
  highlightActiveLink();
  initImageBeforeAfter();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      
      // Update accessibility attributes
      navToggle.setAttribute('aria-expanded', isActive);
      
      // Change icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.className = 'fas fa-times'; // Change to close icon
        } else {
          icon.className = 'fas fa-bars'; // Change to burger icon
        }
      }
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }
}

/**
 * Client-side validation for Quote/Contact Forms
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.validated-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');
      let isValid = true;
      
      // Clear previous feedback
      if (feedback) {
        feedback.style.display = 'none';
        feedback.className = 'form-feedback';
      }
      
      // Basic input inspection
      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444'; // Red error outline
        } else {
          input.style.borderColor = ''; // Reset
        }
      });
      
      // Phone check
      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value.trim()) {
        const phoneRegex = /^(?:(?:\+44\s?|0)7\d{3}\s?\d{6}|(?:\+44\s?|0)[12]\d\s?\d{4}\s?\d{4})$/;
        if (!phoneRegex.test(phoneInput.value.trim().replace(/\s+/g, ''))) {
          isValid = false;
          phoneInput.style.borderColor = '#ef4444';
          alert('Please enter a valid UK phone number.');
        }
      }
      
      if (!isValid) {
        if (feedback) {
          feedback.textContent = 'Please fill out all required fields correctly.';
          feedback.classList.add('error');
        }
        return;
      }
      
      // Show loading status
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        // Simulate API call
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          
          if (feedback) {
            feedback.textContent = 'Thank you! Your quote request has been sent. Steve will get back to you within 24 hours.';
            feedback.classList.add('success');
          }
        }, 1500);
      }
    });
  });
}

/**
 * Highlight Navigation Links based on active file pathname
 */
function highlightActiveLink() {
  const currentPathname = window.location.pathname;
  const filename = currentPathname.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === 'index.html' && href === '#') || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Initialize Simple Before/After Slider if present
 */
function initImageBeforeAfter() {
  const containers = document.querySelectorAll('.ba-container');
  containers.forEach(container => {
    const slider = container.querySelector('.ba-slider');
    const beforeImage = container.querySelector('.ba-before');
    
    if (slider && beforeImage) {
      slider.addEventListener('input', (e) => {
        const value = e.target.value;
        beforeImage.style.width = `${value}%`;
      });
    }
  });
}
