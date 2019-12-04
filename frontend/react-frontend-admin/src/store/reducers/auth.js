import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/game',
  message: null,
  registerSuccess: false,
};

const authStart = (state) => (
  updateObject(state, {
    error: null,
    loading: true,
    registerSuccess: false
  })
);


const authSuccess = (state, action) => (
  updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    authRedirectPath: '/game',
  })
);

const registerSuccess = (state) => (
  updateObject(state, {
    error: null,
    loading: false,
    authRedirectPath: '/user/login',
    registerSuccess: true,
  })
);

const registerFail = (state, action) => (
  updateObject(state, {
    error: true,
    loading: false,
    message: action.message,
    registerSuccess: false,
  })
);

const authFail = (state, action) => (
  updateObject(state, {
    error: action.error,
    loading: false,
  })
);

const authLogout = (state) => (
  updateObject(state, {
    token: null,
    userId: null
  })
);

const setAuthRedirectPath = (state, action) => (
  updateObject(state, {
    authRedirectPath: action.path
  })
);


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;
