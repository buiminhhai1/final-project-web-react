import * as actionTypes from '../actionTypes';
import { checkAuthTimeout } from './auth';
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

export const updateImageUrlPending = () => {
  return {
    type: actionTypes.UPDATE_IMAGE_URL_PENDING
  };
};

export const updateImageUrlSuccess = (imageUrl) => {
  return {
    type: actionTypes.UPDATE_IMAGE_URL_SUCCESS,
    imageUrl,
  };
};

export const updateImageUrlFail = (error) => {
  return {
    type: actionTypes.UPDATE_IMAGE_URL_ERROR,
    error
  };
};

export function updateImageUrl(data) {
  return (dispatch) => {
    dispatch(updateImageUrlPending());
    const updateUrl = apiUrl + "/users/image-upload";

    axios({
      method: 'post',
      url: updateUrl,
      headers: {
        Authorization: data.token
      },
      data: {
        image: data.avatarFile,
        idUser: data.userId
      }
    })
      .then(res => {
        let imageUrl = res.data.imageUrl;
        if (res.data.imageUrl) {
          localStorage.setItem('imageUrl', imageUrl);
          dispatch(updateImageUrlSuccess(imageUrl));
        }
        else
          dispatch(updateImageUrlFail({ error: "Cannot upload avatar" }));
      })
      .catch(err => {
        console.log(err);
        dispatch(updateImageUrlFail(err));
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
    const updateUrl = apiUrl + "/";

    axios({
      method: 'post',
      url: updateUrl,
      headers: {
        Authorization: data.token
      },
      data
    })
      .then(res => {
        // console.log(res.data);
        if (res.data.avatar) {
          dispatch(updateTeacherProfileSuccess(res.data));
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

export const updateUserProfilePending = () => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_PENDING
  };
};

export const updateUserProfileSuccess = (token, user) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
    user, token
  };
};

export const updateUserProfileFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_ERROR,
    error
  };
};

export function updateUserProfile(token, data) {
  return (dispatch) => {
    dispatch(updateUserProfilePending());
    const updateUrl = apiUrl + "/users/user-profile";

    axios({
      method: 'post',
      url: updateUrl,
      headers: {
        Authorization: token
      },
      data
    })
      .then(res => {
        const user = res.data.user;
        if (user) {
          const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);

          // Save user's token in local storage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", res.data.user.name);
          localStorage.setItem("userId", res.data.user.userId);
          localStorage.setItem('expirationDate', expirationDate);

          dispatch(checkAuthTimeout(res.data.expiresIn));
          dispatch(updateUserProfileSuccess(res.data.token, res.data.user));
        }
        else
          dispatch(updateUserProfileFail("Cannot update user"));
      })
      .catch(err => {
        dispatch(updateUserProfileFail("Something wrong happened"));
      })
  }
}