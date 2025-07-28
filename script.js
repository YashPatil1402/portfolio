// Contact form handling with Google Sheets integration
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = document.getElementById('submit-btn');

    // Google Script URL for form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycby1Rz3R9ED7OeEW1PlcOYKbo4w_xkc8L4UW8_fQbET2TY2gjbAsl-6I-5HsHdjYyFDMiA/exec';
			    // Add input validation
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearErrors);
    });

    contactForm.addEventListener('submit', handleFormSubmit);

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        clearInputError(input);

        if (!value) {
            showInputError(input, 'This field is required');
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }

        return true;
    }

    function clearErrors(e) {
        clearInputError(e.target);
    }

    function showInputError(input, message) {
        clearInputError(input);       
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;       
        input.parentNode.appendChild(errorElement);
        input.style.borderColor = 'var(--color-error)';
    }

    function clearInputError(input) {
        const errorElement = input.parentNode.querySelector('.input-error');
        if (errorElement) errorElement.remove();
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        formInputs.forEach(input => {
            if (!validateInput({ target: input })) isFormValid = false;
        });

        if (!isFormValid) {
            showFormMessage('Please fix the errors above and try again.', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const formData = new FormData(contactForm);

            // Submit to Google Sheets
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormMessage('Sorry, something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageElement = document.createElement('div');
        messageElement.className = `form-message status status--${type}`;
        messageElement.textContent = message;
        contactForm.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) messageElement.remove();
        }, 5000);
    }
}

// Make sure to call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    // ... other initialization functions
});
