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
        idToken: token,
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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');
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
        let signInUrl = apiUrl + "/login";

        axios.post(signInUrl, data)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                // Save user's token in session storage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("method", "local");
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(signInSuccess());
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(signInFail(err));
            })
    }
}

export function signInGoogle(data) {
    return (dispatch) => {
        dispatch(signInPending());
        let signInGoogleUrl = apiUrl + "/login/googleOauth";

        axios.post(signInGoogleUrl, data)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                // Save user's token in session storage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("method", "local");
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(signInSuccess());
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(signInFail(err));
            })
    }
}

export function signInFacebook(data) {
    return (dispatch) => {
        dispatch(signInPending());
        let signInFacebookUrl = apiUrl + "/login/facebookOauth";

        axios.post(signInFacebookUrl, data)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

                // Save user's token in session storage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("method", "local");
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(signInSuccess());
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(signInFail(err));
            })
    }
}