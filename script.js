// Replace with YOUR credentials
const SUPABASE_URL = 'https://yjvtesbpyycmkfowvsne.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdnRlc2JweXljbWtmb3d2c25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDIwNDMsImV4cCI6MjA3NTQxODA0M30.NHour2zpJxVZIZAOTcvFoZJB6WLslMI2gwR44oamaRM';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Signup
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-special').value;
  
  const { error } = await supabase.auth.signUp({ email, password });
  
  if (error) alert('Error: ' + error.message);
  else {
    alert('Success! Check your email to confirm.');
    closeModal('signupModal');
  }
});

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-username').value;
  const password = document.getElementById('login-special').value;
  
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) alert('Error: ' + error.message);
  else {
    alert('Login successful!');
    closeModal('loginModal');
    window.location.href = 'dashboard.html'; // Create this next
  }
});