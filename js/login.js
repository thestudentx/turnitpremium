// login.js

// Smooth toast notification function
window.showToast = function(message, success = true, duration = 3000) {
  const container = document.getElementById('login-message-box');

  // Create the actual toast element
  const toast = document.createElement('div');
  toast.className = 'login-msg ' + (success ? 'login-msg--success' : 'login-msg--error');
  toast.textContent = message;

  // Append to container
  container.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    toast.remove();
  }, duration);
};


document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoader();

  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  console.log('🧪 Submitted login data:', { email, password });

  const BACKEND_URL = location.hostname.includes('localhost')
    ? 'http://localhost:3000'
    : 'https://sniptext.onrender.com';

  try {
    const res = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log('📩 Status:', res.status, 'Body:', data);

    hideLoader();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      showToast('Login successful!', true);
      setTimeout(() => {
        // use the pretty URL rewrite
        window.location.href = '/dashboard.html';
      }, 1500);
    } else {
      showToast(data.message || 'Login failed. Please try again.', false);
    }

  } catch (err) {
    console.error('Login error:', err);
    hideLoader();
    showToast('Something went wrong. Please try again.', false);
  }
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function () {
  const pw = document.getElementById('password');
  const isHidden = pw.type === 'password';
  pw.type = isHidden ? 'text' : 'password';
  this.textContent = isHidden ? '🙈' : '👁️';
  this.setAttribute('aria-label', isHidden ? 'Hide Password' : 'Show Password');
});