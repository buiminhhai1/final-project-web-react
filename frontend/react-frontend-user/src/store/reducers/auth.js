import * as actionTypes from '../actionTypes';

const initialState = {
    token: null,
    userId: null,
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
                pending: false
            }
        case actionTypes.SIGNIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state;
    }
}

export const getSignInPending = state => state.authReducer.pending;
export const getSignInError = state => state.authReducer.error;