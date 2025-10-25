/**
 * contact.js
 * Handles client-side validation for the contact form.
 */

// Function to validate an email address using a simple regular expression
function isValidEmail(email) {
    // Basic regex for email validation: checks for local-part@domain.tld structure
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle form submission and validation
function validateContactForm(event) {
    // 1. Prevent the default form submission (so we can check inputs first)
    event.preventDefault();

    // 2. Get form elements
    const form = document.querySelector('.contact-form form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('input[type="submit"]');

    // Reset any previous error states (optional, but good practice)
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');

    // 3. Get input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Variable to track validation status
    let isValid = true;
    let errorMessage = '';

    // 4. Validate Name
    if (name === '') {
        isValid = false;
        nameInput.classList.add('error');
        errorMessage += 'Name is required.\n';
    }

    // 5. Validate Email
    if (email === '') {
        isValid = false;
        emailInput.classList.add('error');
        errorMessage += 'Email is required.\n';
    } else if (!isValidEmail(email)) {
        isValid = false;
        emailInput.classList.add('error');
        errorMessage += 'Please enter a valid email address.\n';
    }

    // 6. Validate Message
    if (message === '') {
        isValid = false;
        messageInput.classList.add('error');
        errorMessage += 'Message is required.\n';
    }

    // 7. Handle Validation Result
    if (isValid) {
        // If all inputs are valid:
        
        // OPTIONAL: Simulate successful form submission feedback
        alert('Thank you for your message! We will get back to you soon.');
        
        // If you were using an actual server endpoint (defined in the HTML form's action), 
        // you would typically submit the form data here using fetch() or form.submit().
        
        // Since the HTML action is set to '#', we'll just clear the form for a fresh start.
        form.reset(); 

    } else {
        // If validation fails:
        alert('Please correct the following issues:\n' + errorMessage);
    }
}

// 8. Attach the validation function to the form's submit event
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', validateContactForm);
    }
});


