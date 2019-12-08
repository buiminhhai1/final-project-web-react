import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null,
    pending: false,
    redirectToPage: '',
    isAuthenticated: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SIGNIN_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.user,
                token: action.token,
                redirectToPage: '/'
            }
        case actionTypes.SIGNIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case actionTypes.SIGNUP_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.user,
                token: action.token,
                redirectToPage: '/'
            }
        case actionTypes.SIGNUP_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
                error: null,
                pending: false,
                redirectToPage: '',
                isAuthenticated: false
            }

        default:
            return state;
    }
}

export const getAuthPending = state => state.authReducer.pending;
export const getAuthError = state => state.authReducer.error;
export const getAuthToken = state => state.authReducer.token;
export const getAuthRedirectPage = state => state.authReducer.redirectToPage;