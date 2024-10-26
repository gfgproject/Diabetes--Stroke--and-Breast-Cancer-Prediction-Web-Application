// public/scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const contactForm = document.getElementById("contactForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            // Capture username and password
            const email = document.getElementById("username").value; 
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Please enter both username and password.");
                return;
            }

            // Make the login request
            const response = await fetch('http://localhost:3000/api/login', { // Make sure this matches your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Send username and password
            });

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "window.html"; // Redirect to dashboard
            } else {
                const error = await response.json();
                alert(`Login failed: ${error.message}`); // Show error message
            }
        });
    }    

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert("Failed to send message. Please try again.");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent the default form submission
    
            const username = document.getElementById("signupUsername").value; // Use unique IDs
            const email = document.getElementById("signupEmail").value; // Use unique IDs
            const password = document.getElementById("signupPassword").value; // Use unique IDs
    
            const response = await fetch('/api/signup', { // Update the URL here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            if (response.ok) {
                alert("Sign up successful! Please log in.");
                window.location.href = "login.html"; // Redirect to login page
            } else {
                const error = await response.json();
                alert(`Failed to sign up: ${error.message}`);
            }
        });
    }
});
