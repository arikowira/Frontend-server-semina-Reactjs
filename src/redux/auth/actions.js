import { USER_LOGIN, USER_LOGOUT } from './constants';

export function userLogin(token, role, email, refreshToken) {
  return {
    type: USER_LOGIN,
    refreshToken,
    token,
    role,
    email,
  };
}

export function userLogout() {
  localStorage.removeItem('auth');
  return {
    type: USER_LOGOUT,
  };
}
