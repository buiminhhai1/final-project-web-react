import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null,
    pending: false,
    redirectToPage: '',
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
                redirectToPage: '/',
            }
        case actionTypes.CLEAR_USER_IMAGE_URL:
            return {
                ...state,
                user: {
                    email: state.user.email,
                    imageUrl: null,
                    isTeacher: state.user.isTeacher,
                    name: state.user.name,
                    userId: state.user.userId,
                }
            }
        case actionTypes.SET_USER_IMAGE_URL:
            return {
                ...state,
                user: {
                    email: state.user.email,
                    imageUrl: action.image,
                    isTeacher: state.user.isTeacher,
                    name: state.user.name,
                    userId: state.user.userId,
                }
            }

        default:
            return state;
    }
}

export const getAuthPending = state => state.authReducer.pending;
export const getAuthError = state => state.authReducer.error;
export const getAuthToken = state => state.authReducer.token;
export const getAuthUser = state => state.authReducer.user;
export const getAuthRedirectPage = state => state.authReducer.redirectToPage;