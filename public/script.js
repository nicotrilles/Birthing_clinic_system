document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            try {
                const response = await fetch('/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        password,
                        confirmPassword
                    })
                });

                const data = await response.text();
                
                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = '/login.html'; // Redirect to login page
                } else {
                    alert(data || 'Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error occurred');
            }
        });
    }

    // Login form handling (if exists)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                const data = await response.text();
                
                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = '/'; // Redirect to home page
                } else {
                    alert(data || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Server error occurred');
            }
        });
    }
});
