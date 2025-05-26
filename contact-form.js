/**
 * Contact Form Implementation
 * Replaces newsletter with a single well-designed contact form
 */
document.addEventListener('DOMContentLoaded', function() {
  // Create contact form section
  const createContactForm = () => {
    const contactSection = document.querySelector('.newsletter-section') || document.createElement('section');
    contactSection.className = 'section contact-section';
    contactSection.innerHTML = `
      <div class="contact-form-container">
        <h2>Get in Touch</h2>
        <form class="contact-form" id="contactForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" class="submit-button">
            <span>Send Message</span>
          </button>
        </form>
      </div>
    `;

    // Add form submission handler
    const form = contactSection.querySelector('#contactForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Animate button to show submission
      const button = form.querySelector('.submit-button');
      button.innerHTML = '<span>Message Sent!</span>';
      button.style.background = 'linear-gradient(135deg, #1a5f3a, #0f3522)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        button.innerHTML = '<span>Send Message</span>';
        button.style.background = '';
      }, 3000);
    });

    return contactSection;
  };

  // Replace newsletter section with contact form or add it if not present
  const replaceNewsletterWithContactForm = () => {
    const newsletterSection = document.querySelector('.newsletter-section');
    const contactForm = createContactForm();
    
    if (newsletterSection) {
      newsletterSection.parentNode.replaceChild(contactForm, newsletterSection);
    } else {
      // If no newsletter section exists, add before footer
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(contactForm, footer);
      } else {
        // If no footer, append to body
        document.body.appendChild(contactForm);
      }
    }
  };

  // Execute replacement
  replaceNewsletterWithContactForm();
});
