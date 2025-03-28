class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.initAuth();
  }

  initAuth() {
    // Load session from localStorage
    const session = localStorage.getItem('paradiseAuth');
    if (session) this.currentUser = JSON.parse(session);
  }

  login(credentials) {
    // Implementation varies by user type
  }

  logout() {
    localStorage.removeItem('paradiseAuth');
    this.currentUser = null;
    window.location.href = '/';
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  hasRole(role) {
    return this.currentUser?.role === role;
  }
}

export const auth = new AuthSystem();
