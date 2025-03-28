import { auth } from './auth/auth.js';

export function setupPageAuth() {
  const page = document.body.dataset.page;
  
  // Show/hide auth buttons based on page
  if (page === 'home') {
    initHomeAuth();
  } else {
    hideAuthButtons();
  }

  // Common auth status check
  updateAuthStatus();
}

function initHomeAuth() {
  document.getElementById('staffLoginBtn').style.display = 'block';
  document.getElementById('adminLoginBtn').style.display = 'block';
  document.getElementById('userSignupBtn').style.display = 'block';
}

function hideAuthButtons() {
  document.getElementById('staffLoginBtn').style.display = 'none';
  document.getElementById('adminLoginBtn').style.display = 'none';
  document.getElementById('userSignupBtn').style.display = 'none';
}

function updateAuthStatus() {
  const authStatus = document.getElementById('authStatus');
  if (auth.isAuthenticated()) {
    authStatus.innerHTML = `Welcome, ${auth.currentUser.username} | <a href="#" id="logoutLink">Logout</a>`;
    document.getElementById('logoutLink').addEventListener('click', () => auth.logout());
  } else {
    authStatus.innerHTML = '<a href="/login.html">Login</a>';
  }
}
