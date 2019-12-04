import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const registerSuccess = () => ({
  type: actionTypes.REGISTER_SUCCESS,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId,
});

export const resgisterFail = (message) => ({
  type: actionTypes.REGISTER_FAIL,
  message,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (
  (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
);

export const auth = (email, password, isSignup) => (
  (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };
    if (isSignup.value) {
      authData.username = isSignup.username;
    }
    let url = 'http://localhost:4200/admin/register';
    if (!isSignup.value) {
      url = 'http://locahost:4200/admin/login';
    }
    axios.post(url, authData)
      .then((response) => {
        if (!isSignup.value) {
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', response.data.user._id);
          if (isSignup.value) {
            localStorage.setItem('username', isSignup.username);
          }
          dispatch(authSuccess(response.data.token, response.data.user._id));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        } else {
          dispatch(registerSuccess());
        }
      })
      .catch((err) => {
        if (!isSignup.value) {
          dispatch(authFail(err));
        } else {
          dispatch(resgisterFail());
        }
      });
  }
);


export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (
  (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
);