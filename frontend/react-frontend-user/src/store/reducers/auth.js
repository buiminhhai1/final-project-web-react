import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null,
    pending: false,
    redirectToPage: '',
    message: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESET_ERROR_MESSAGE:
            return {
                ...state,
                error: null,
                message: null,
            }
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
        case actionTypes.UPDATE_IMAGE_URL_PENDING:
            return {
                ...state,
                pending: true,
                message: null,
            }
        case actionTypes.UPDATE_IMAGE_URL_SUCCESS:
            return {
                ...state,
                pending: false,
                user: {
                    email: state.user.email,
                    imageUrl: action.imageUrl,
                    isTeacher: state.user.isTeacher,
                    name: state.user.name,
                    userId: state.user.userId,
                },
                message: 'Upload image success'
            }
        case actionTypes.UPDATE_IMAGE_URL_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                message: null
            }
        case actionTypes.UPDATE_USER_PROFILE_PENDING:
            return {
                ...state,
                pending: true,
                message: null,
            }
        case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.user,
                token: action.token,
                message: 'Update user success'
            }
        case actionTypes.UPDATE_USER_PROFILE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                message: null
            }
        case actionTypes.UPDATE_TEACHER_PROFILE_PENDING:
            return {
                ...state,
                pending: true,
                message: null,
            }
        case actionTypes.UPDATE_TEACHER_PROFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.user,
                token: action.token,
                message: 'Update user success'
            }
        case actionTypes.UPDATE_TEACHER_PROFILE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                message: null
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