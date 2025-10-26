 
function isValidEmail(email) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validateContactForm(event) {
    
    event.preventDefault();

   
    const form = document.querySelector('.contact-form form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('input[type="submit"]');

    
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');

    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    
    let isValid = true;
    let errorMessage = '';

   
    if (name === '') {
        isValid = false;
        nameInput.classList.add('error');
        errorMessage += 'Name is required.\n';
    }

   
    if (email === '') {
        isValid = false;
        emailInput.classList.add('error');
        errorMessage += 'Email is required.\n';
    } else if (!isValidEmail(email)) {
        isValid = false;
        emailInput.classList.add('error');
        errorMessage += 'Please enter a valid email address.\n';
    }

    
    if (message === '') {
        isValid = false;
        messageInput.classList.add('error');
        errorMessage += 'Message is required.\n';
    }

  
    if (isValid) {
        
        
       
        alert('Thank you for your message! We will get back to you soon.');
        
       
        form.reset(); 

    } else {
        
        alert('Please correct the following issues:\n' + errorMessage);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', validateContactForm);
    }
});


