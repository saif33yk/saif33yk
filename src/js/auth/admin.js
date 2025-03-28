const adminCredentials = {
  'admin': { password: 'Admin@123', access: 'full' },
  'superadmin': { password: 'Super@123', access: 'full' }
};

export function authenticateAdmin(username, password) {
  const user = adminCredentials[username.toLowerCase()];
  if (user && user.password === password) {
    return { ...user, username, role: 'admin' };
  }
  return null;
}
