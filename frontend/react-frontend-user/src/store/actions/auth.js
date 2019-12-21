import * as actionTypes from '../actionTypes';
import axios from 'axios';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;


export const signInPending = () => {
  return {
    type: actionTypes.SIGNIN_PENDING
  };
};

export const signInSuccess = (token, user) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    token,
    user,
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGNIN_ERROR,
    error
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export function signIn(email, password) {
  return (dispatch) => {
    dispatch(signInPending());
    const data = {
      email,
      password
    };
    let signInUrl = apiUrl + "/users/login";
    axios.post(signInUrl, data)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

        // Save user's token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("imageUrl", res.data.user.imageUrl);
        localStorage.setItem("isTeacher", res.data.user.isTeacher);
        localStorage.setItem("method", "local");
        localStorage.setItem("userId", res.data.user.userId);
        localStorage.setItem("verify", res.data.user.verify);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(signInSuccess(res.data.token, res.data.user));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail("This account not existed"));
      })
  }
}

export function signInGoogle(accessToken) {
  return (dispatch) => {
    dispatch(signInPending());
    let signInGoogleUrl = apiUrl + "/users/login/googleOauth";

    axios.post(signInGoogleUrl, { accessToken })
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

        // Save user's token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("imageUrl", res.data.user.imageUrl);
        localStorage.setItem("method", "google");
        localStorage.setItem("userId", res.data.user.userId);
        localStorage.setItem("verify", res.data.user.verify);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(signInSuccess(res.data.token, res.data.user));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail("This account not existed"));
      })
  }
}

export function signInFacebook(accessToken) {
  return (dispatch) => {
    dispatch(signInPending());
    let signInFacebookUrl = apiUrl + "/users/login/facebookOauth";

    axios.post(signInFacebookUrl, { access_token: accessToken })
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        console.log(res);

        // Save user's token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("imageUrl", res.data.user.imageUrl);
        localStorage.setItem("method", "facebook");
        localStorage.setItem("userId", res.data.user.userId);
        localStorage.setItem("verify", res.data.user.verify);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(signInSuccess(res.data.token, res.data.user));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail("This account not existed"));
      })
  }
}

export function reLogin() {
  return (dispatch) => {
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        let user = {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('email'),
          imageUrl: localStorage.getItem('imageUrl'),
          isTeacher: localStorage.getItem('isTeacher'),
          userId: localStorage.getItem('userId'),
          verify: localStorage.getItem('verify'),
        }
        dispatch(signInSuccess(token, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  }
}

export const signUpPending = () => {
  return {
    type: actionTypes.SIGNUP_PENDING
  };
};

export const signUpSuccess = (token, user) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    token, user,
  };
};

export const signUpFail = (error) => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    error
  };
};

export function signUp(email, password, name) {
  return (dispatch) => {
    dispatch(signUpPending());

    const data = {
      email, password, name
    }
    let signUpUrl = apiUrl + "/users/register";

    axios.post(signUpUrl, data)
      .then(res => {
        console.log(res);
        if (res.data.user) {
          dispatch(signUpSuccess(res.data.token, res.data.user));
        }
        else {
          dispatch(signUpFail(res.data.message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(signUpFail("Server is in maintenance"));
      })
  }
}

export function resetErrorMessage() {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_ERROR_MESSAGE
    });
  }
}
