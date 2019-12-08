import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  errorLogin: null,
  errorRegister: null,
  messageRegister: null,
  messageLogin: null,
  loading: false,
  authRedirectPath: '',
  loginRedirectPath: '',
  emailRegister: null,
  registerSuccess: false,
  tabNum: '2'
};
const selectedTab = (state, action) =>
  updateObject(state, {
    tabNum: action.tabNum
  });

const refreshLogin = state =>
  updateObject(state, {
    errorLogin: null,
    messageLogin: null
  });

const refreshRegister = state =>
  updateObject(state, {
    errorRegister: null,
    messageRegister: null
  });

const registerStart = state =>
  updateObject(state, {
    errorRegister: null,
    loading: true,
    messageRegister: null,
    loginRedirectPath: null
  });
// fix here
const registerSuccess = (state, action) =>
  updateObject(state, {
    errorRegister: null,
    loading: false,
    loginRedirectPath: '/admin/login',
    emailRegister: action.email,
    tabNum: '2'
  });

const registerFail = (state, action) =>
  updateObject(state, {
    errorRegister: true,
    loading: false,
    messageRegister: action.error.error
  });

const loginStart = state =>
  updateObject(state, {
    errorLogin: false,
    loading: true,
    messageLogin: null,
    authRedirectPath: null
  });

const loginSuccess = (state, action) =>
  updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    errorLogin: false,
    loading: false,
    authRedirectPath: '/',
    tabNum: '1'
  });

const loginFail = (state, action) =>
  updateObject(state, {
    errorLogin: true,
    loading: false,
    messageLogin: action.error
  });

const authLogout = state =>
  updateObject(state, {
    token: null,
    userId: null,
    tabNum: '2'
  });

const setAuthRedirectPath = (state, action) =>
  updateObject(state, {
    authRedirectPath: action.path
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECTED_TAB:
      return selectedTab(state, action);

    case actionTypes.LOGIN_START:
      return loginStart(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.LOGIN_REFRESH:
      return refreshLogin();

    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);
    case actionTypes.REGISTER_REFRESH:
      return refreshRegister();

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      break;
  }
  return state;
};

export default reducer;