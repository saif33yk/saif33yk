const staffCredentials = {
  'pan': { password: 'Xk9#pL23qW', access: 'full' },
  'zigana': { password: 'R7$mN45tYv', access: 'full' }
};

export function authenticateStaff(username, password) {
  const user = staffCredentials[username.toLowerCase()];
  if (user && user.password === password) {
    return { ...user, username, role: 'staff' };
  }
  return null;
}
