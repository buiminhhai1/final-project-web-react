import * as actionTypes from '../actionTypes';
import axios from 'axios';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;

export const clearUserImageUrl = () => {
    return {
        type: actionTypes.CLEAR_USER_IMAGE_URL
    };
};

export const setUserImageUrl = (image) => {
    return {
        type: actionTypes.SET_USER_IMAGE_URL,
        image
    };
};

export const updateAvatarPending = () => {
    return {
        type: actionTypes.UPDATE_AVATAR_PENDING
    };
};

export const updateAvatarSuccess = (user) => {
    return {
        type: actionTypes.UPDATE_AVATAR_SUCCESS,
        user,
    };
};

export const updateAvatarFail = (error) => {
    return {
        type: actionTypes.UPDATE_AVATAR_ERROR,
        error
    };
};

export function updateAvatar(data) {
    return (dispatch) => {
        dispatch(updateAvatarPending());
        const updateUrl = apiUrl + "/me/updateImageUrl";
        const fd = new FormData();
        fd.append('avatarImage', data.avatarFile);

        axios({
            method: 'post',
            url: updateUrl,
            headers: {
                Authorization: data.token
            },
            data: fd
        })
            .then(res => {
                // console.log(res.data);
                if (res.data.avatar){
                    dispatch(updateAvatarSuccess(res.data.avatar));
                    window.location.reload();
                }
                else
                    dispatch(updateAvatarFail({ error: "Cannot upload avatar" }));
            })
            .catch(err => {
                console.log(err);
                dispatch(updateAvatarFail(err));
            })
    }
}

export const updateTeacherProfilePending = () => {
    return {
        type: actionTypes.UPDATE_TEACHER_PROFILE_PENDING
    };
};

export const updateTeacherProfileSuccess = (user) => {
    return {
        type: actionTypes.UPDATE_TEACHER_PROFILE_SUCCESS,
        user,
    };
};

export const updateTeacherProfileFail = (error) => {
    return {
        type: actionTypes.UPDATE_TEACHER_PROFILE_ERROR,
        error
    };
};

export function updateTeacherProfile(data) {
    return (dispatch) => {
        dispatch(updateTeacherProfilePending());
        const updateUrl = apiUrl + "/me/updateImageUrl";
        const fd = new FormData();
        fd.append('avatarImage', data.avatarFile);

        axios({
            method: 'post',
            url: updateUrl,
            headers: {
                Authorization: data.token
            },
            data: fd
        })
            .then(res => {
                // console.log(res.data);
                if (res.data.avatar){
                    dispatch(updateTeacherProfileSuccess(res.data));
                    window.location.reload();
                }
                else
                    dispatch(updateTeacherProfileFail({ error: "Cannot upload avatar" }));
            })
            .catch(err => {
                console.log(err);
                dispatch(updateTeacherProfileFail(err));
            })
    }
}
