function goToLogin() {
            // Store signed up users
            const users = JSON.parse(localStorage.getItem('signedUpUsers') || '[]');
            localStorage.setItem('signedUpUsers', JSON.stringify(users));
            
            // Redirect to login page
            document.body.innerHTML = ` `;
            
            // Initialize login functionality
            setTimeout(() => {
                window.location.href = "login.html";
            }, 100);
        }

        function initLogin() {
            const loginForm = document.getElementById('loginForm');
            const loginBtn = document.querySelector('.login-btn');

            if (!loginForm || !loginBtn) {
                setTimeout(initLogin, 100);
                return;
            }

            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();

                loginBtn.textContent = 'Logging In...';
                loginBtn.disabled = true;

                const emailInput = document.getElementById('loginEmail').value.trim();
                const passwordInput = document.getElementById('loginPassword').value;

                const users = JSON.parse(localStorage.getItem('signedUpUsers') || '[]');
                const user = users.find(u => u.email === emailInput && u.password === passwordInput);

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailInput || !passwordInput) {
                    alert('Please fill in all fields.');
                    resetButton();
                } else if (!emailRegex.test(emailInput)) {
                    alert('Please enter a valid email address.');
                    resetButton();
                } else if (!user) {
                    alert('❌ Invalid email or password. Please check your credentials or sign up first.');
                    resetButton();
                } else {
                    alert('✅ Login successful! Welcome back, ' + user.fullName + '!');
                    setTimeout(() => {
                        showCalculator();
                    }, 500);
                }

                function resetButton() {
                    loginBtn.textContent = 'Log In';
                    loginBtn.disabled = false;
                }
            });
        }

        // Real-time validation functions
        function validateFullName() {
            const fullName = document.getElementById('fullName').value.trim();
            const fullNameError = document.getElementById('fullNameError');
            const fullNameInput = document.getElementById('fullName');
            
            if (fullName.length === 0) {
                fullNameError.style.display = 'none';
                fullNameInput.classList.remove('error', 'success');
                return false;
            } else if (fullName.length < 2) {
                fullNameError.textContent = '❌ Full name must be at least 2 characters long';
                fullNameError.style.display = 'block';
                fullNameInput.classList.add('error');
                fullNameInput.classList.remove('success');
                return false;
            } else {
                fullNameError.style.display = 'none';
                fullNameInput.classList.remove('error');
                fullNameInput.classList.add('success');
                return true;
            }
        }

        function validateEmail() {
            const email = document.getElementById('email').value.trim();
            const emailError = document.getElementById('emailError');
            const emailSuccess = document.getElementById('emailSuccess');
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.length === 0) {
                emailError.style.display = 'none';
                emailSuccess.style.display = 'none';
                emailInput.classList.remove('error', 'success');
                return false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = '❌ Please enter a valid email address (must contain @)';
                emailError.style.display = 'block';
                emailSuccess.style.display = 'none';
                emailInput.classList.add('error');
                emailInput.classList.remove('success');
                return false;
            } else {
                emailError.style.display = 'none';
                emailSuccess.textContent = '✅ Valid email format';
                emailSuccess.style.display = 'block';
                emailInput.classList.remove('error');
                emailInput.classList.add('success');
                return true;
            }
        }

        function validatePassword() {
            const password = document.getElementById('password').value;
            const passwordInput = document.getElementById('password');
            
            // Check each requirement
            const length = password.length >= 8;
            const uppercase = /[A-Z]/.test(password);
            const lowercase = /[a-z]/.test(password);
            const number = /\d/.test(password);
            const special = /[@$!%*?&]/.test(password);
            
            // Update requirement indicators
            document.getElementById('length').classList.toggle('valid', length);
            document.getElementById('length').textContent = (length ? '✓' : '✗') + ' At least 8 characters';
            
            document.getElementById('uppercase').classList.toggle('valid', uppercase);
            document.getElementById('uppercase').textContent = (uppercase ? '✓' : '✗') + ' One uppercase letter';
            
            document.getElementById('lowercase').classList.toggle('valid', lowercase);
            document.getElementById('lowercase').textContent = (lowercase ? '✓' : '✗') + ' One lowercase letter';
            
            document.getElementById('number').classList.toggle('valid', number);
            document.getElementById('number').textContent = (number ? '✓' : '✗') + ' One number';
            
            document.getElementById('special').classList.toggle('valid', special);
            document.getElementById('special').textContent = (special ? '✓' : '✗') + ' One special character (@$!%*?&)';
            
            const allValid = length && uppercase && lowercase && number && special;
            
            if (password.length === 0) {
                passwordInput.classList.remove('error', 'success');
            } else if (allValid) {
                passwordInput.classList.remove('error');
                passwordInput.classList.add('success');
            } else {
                passwordInput.classList.add('error');
                passwordInput.classList.remove('success');
            }
            
            return allValid;
        }

        function validateConfirmPassword() {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const confirmPasswordSuccess = document.getElementById('confirmPasswordSuccess');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            
            if (confirmPassword.length === 0) {
                confirmPasswordError.style.display = 'none';
                confirmPasswordSuccess.style.display = 'none';
                confirmPasswordInput.classList.remove('error', 'success');
                return false;
            } else if (password !== confirmPassword) {
                confirmPasswordError.textContent = '❌ Passwords do not match';
                confirmPasswordError.style.display = 'block';
                confirmPasswordSuccess.style.display = 'none';
                confirmPasswordInput.classList.add('error');
                confirmPasswordInput.classList.remove('success');
                return false;
            } else {
                confirmPasswordError.style.display = 'none';
                confirmPasswordSuccess.textContent = '✅ Passwords match';
                confirmPasswordSuccess.style.display = 'block';
                confirmPasswordInput.classList.remove('error');
                confirmPasswordInput.classList.add('success');
                return true;
            }
        }

        // Add real-time validation event listeners
        document.getElementById('fullName').addEventListener('input', validateFullName);
        document.getElementById('email').addEventListener('input', validateEmail);
        document.getElementById('password').addEventListener('input', function() {
            validatePassword();
            if (document.getElementById('confirmPassword').value.length > 0) {
                validateConfirmPassword();
            }
        });
        document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

        // Initialize sign-in form
        document.getElementById('signinForm').addEventListener('submit',async function(e) {
            e.preventDefault();
            
            const signinBtn = document.querySelector('.signin-btn');
            signinBtn.textContent = 'Creating Account...';
            signinBtn.disabled = true;
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Email validation - must contain @ symbol
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Password validation - uppercase, lowercase, number, special character, 8+ chars
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            function resetButton() {
                signinBtn.textContent = 'Sign Up';
                signinBtn.disabled = false;
            }
            
            // Check if all fields are filled
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                resetButton();
                return;
            }
            
            // Validate full name (at least 2 characters)
            if (fullName.length < 2) {
                alert('Full name must be at least 2 characters long.');
                resetButton();
                return;
            }
            
            // Validate email format
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address (must contain @ symbol).');
                resetButton();
                return;
            }
            
            // Validate password strength
            if (!passwordRegex.test(password)) {
                alert('Password must contain:\n• At least 8 characters\n• One uppercase letter (A-Z)\n• One lowercase letter (a-z)\n• One number (0-9)\n• One special character (@$!%*?&)');
                resetButton();
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                resetButton();
                return;
            }
            
            try {
            const res = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await res.text();
            alert(data);

            if (res.ok) {
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 500);
            } else {
                resetButton();
            }
        } catch (err) {
            alert('Signup failed. Please try again.');
            console.error(err);
            resetButton();
        }

        });