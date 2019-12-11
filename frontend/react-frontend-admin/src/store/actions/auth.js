import axios from 'axios';
import * as actionTypes from './actionTypes';

export const selectedTab = tabNum => ({
  type: actionTypes.SELECTED_TAB,
  tabNum
});

export const refreshLogin = () => ({
  type: actionTypes.LOGIN_REFRESH
});

export const refreshRegister = () => ({
  type: actionTypes.REGISTER_REFRESH
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
  localStorage.removeItem('picture');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const loginStart = () => ({
  type: actionTypes.LOGIN_START
});

export const loginSuccess = (token, userId, name, picture) => ({
  type: actionTypes.LOGIN_SUCCESS,
  idToken: token,
  userId,
  name,
  picture
});

export const loginFail = error => ({
  type: actionTypes.LOGIN_FAIL,
  error
});

export const login = (email, password) => dispatch => {
  dispatch(loginStart());
  const authData = {
    email,
    password
  };
  const url = 'http://localhost:4200/admin/login';

  axios
    .post(url, authData)
    .then(response => {
      if (!!response.data.user) {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('picture', response.data.user.picture);
        dispatch(
          loginSuccess(
            response.data.token,
            response.data.user._id,
            response.data.user.name,
            response.data.user.picture
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      } else {
        dispatch(loginFail('Tên đăng nhập hoặc mật khẩu chưa đúng'));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(loginFail('Tên đăng nhập hoặc mật khẩu chưa đúng'));
    });
};

export const signInOauth = Oauth => dispatch => {
  dispatch(loginStart());
  let url = 'http://localhost:4200/admin/login/facebookOauth';
  const data = {
    id: Oauth.idFacebook,
    name: Oauth.name,
    email: Oauth.email,
    picture: Oauth.picture,
    accessToken: Oauth.accessToken
  };
  if (!Oauth.idFacebook) {
    url = 'http://localhost:4200/admin/login/googleOauth';
    data.id = Oauth.idGoole;
  }
  axios
    .post(url, data)
    .then(response => {
      if (!!response.data.user) {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('picture', response.data.user.picture);
        dispatch(
          loginSuccess(
            response.data.token,
            response.data.user._id,
            response.data.user.name,
            response.data.user.picture
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      }
    })
    .catch(err => {
      dispatch(loginFail(err));
    });
};

export const registerStart = () => ({
  type: actionTypes.REGISTER_START
});

export const registerFail = error => ({
  type: actionTypes.REGISTER_FAIL,
  error
});

export const registerSuccess = email => ({
  type: actionTypes.REGISTER_SUCCESS,
  email
});

export const register = (email, password, name) => dispatch => {
  dispatch(registerStart());
  const authData = {
    email,
    password,
    name
  };
  const url = 'http://localhost:4200/admin/register';
  axios
    .post(url, authData)
    .then(response => {
      if (!!response.data.email) {
        dispatch(registerSuccess(response.data.email));
      } else {
        dispatch(registerFail(registerFail(response.data.message)));
      }
    })
    .catch(err => {
      dispatch(registerFail(err));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      const name = localStorage.getItem('name');
      const picture = localStorage.getItem('picture');
      dispatch(loginSuccess(token, userId, name, picture));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};