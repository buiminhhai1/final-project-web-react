import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null,
    pending: false,
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
                token: action.token
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
                token: action.token
            }
        case actionTypes.SIGNUP_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state;
    }
}

export const getAuthPending = state => state.authReducer.pending;
export const getAuthError = state => state.authReducer.error;