import { auth } from './auth.js';

const userDatabase = JSON.parse(localStorage.getItem('paradiseUsers')) || [];

export class UserAuth {
  static register(userData) {
    if (this.userExists(userData.username)) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      registeredAt: new Date().toISOString()
    };

    userDatabase.push(newUser);
    localStorage.setItem('paradiseUsers', JSON.stringify(userDatabase));
    return newUser;
  }

  static login(username, password) {
    const user = userDatabase.find(u => 
      u.username === username && u.password === password
    );
    
    if (!user) throw new Error('Invalid credentials');
    
    auth.currentUser = user;
    localStorage.setItem('paradiseAuth', JSON.stringify(user));
    return user;
  }

  static userExists(username) {
    return userDatabase.some(u => u.username === username);
  }
}
