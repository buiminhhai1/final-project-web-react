import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  API_URL
} from './apiUrl';

export const createLevelEducationStart = () => ({
  type: actionTypes.CREATE_LEVEL_EDUCATION_START
});

export const createLevelEducationSuccess = (_id, title, message) => ({
  type: actionTypes.CREATE_LEVEL_EDUCATION_SUCCESS,
  _id,
  title,
  message
});

export const createLevelEducationFail = err => ({
  type: actionTypes.CREATE_LEVEL_EDUCATION_FAIL,
  error: err
});

export const createLevelEducation = title => dispatch => {
  dispatch(createLevelEducationStart());
  const levelEducationData = {
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level-education/add-level-education`;
  axios
    .post(url, levelEducationData, {
      headers
    })
    .then(res => {
      if (!!res.data.levelEducation) {
        dispatch(
          createLevelEducationSuccess(
            res.data.levelEducation._id,
            res.data.levelEducation.title,
            res.data.message
          )
        );
      } else {
        dispatch(createLevelEducationFail(res.data.message));
      }
    })
    .catch(err => {
      dispatch(createLevelEducationFail(err));
    });
};

export const updateLevelEducationStart = () => ({
  type: actionTypes.UPDATE_LEVEL_EDUCATION_START
});

export const updateLevelEducationSuccess = (_id, title, message) => ({
  type: actionTypes.UPDATE_LEVEL_EDUCATION_SUCCESS,
  _id,
  title,
  message
});

export const updateLevelEducationFail = err => ({
  type: actionTypes.UPDATE_LEVEL_EDUCATION_FAIL,
  error: err
});

export const updateLevelEducation = (_id, title) => dispatch => {
  dispatch(updateLevelEducationStart());
  const updated = {
    _id,
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level-education/update-level-education`;
  axios
    .put(url, updated, {
      headers
    })
    .then(res => {
      if (!!res.data.levelEducation) {
        dispatch(
          updateLevelEducationSuccess(
            res.data.levelEducation._id,
            res.data.levelEducation.title,
            res.data.message
          )
        );
      } else {
        dispatch(updateLevelEducationFail(`Updated skill has failled`));
      }
    })
    .catch(err => {
      dispatch(updateLevelEducationFail(err));
    });
};

export const getListLevelEducationStart = () => ({
  type: actionTypes.GET_LIST_LEVEL_EDUCATION_START
});

export const getListLevelEducationSuccess = levelEducations => ({
  type: actionTypes.GET_LIST_LEVEL_EDUCATION_SUCCESS,
  levelEducations
});

export const getListLevelEducationFail = err => ({
  type: actionTypes.GET_LIST_LEVEL_EDUCATION_FAIL,
  error: err
});

export const getListLevelEducation = searchString => dispatch => {
  dispatch(getListLevelEducationStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const resultSearch = searchString ? `?searchString=${searchString}` : '';
  const url = `${API_URL}/level-education/get-list-level-education${resultSearch}`;
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (res.data.levelEducations) {
        dispatch(getListLevelEducationSuccess(res.data.levelEducations));
      } else {
        dispatch(getListLevelEducationFail(`Empty list LevelEducations`));
      }
    })
    .catch(() => {
      dispatch(getListLevelEducationFail(`something wrong`));
    });
};

export const deleteLevelEducationStart = () => ({
  type: actionTypes.DELETE_LEVEL_EDUCATION_START
});

export const deleteLevelEducationSuccess = (_id, message) => ({
  type: actionTypes.DELETE_LEVEL_EDUCATION_SUCCESS,
  _id,
  message
});

export const deleteLevelEducationFail = err => ({
  type: actionTypes.DELETE_LEVEL_EDUCATION_FAIL,
  error: err
});

export const deleteLevelEducation = _id => dispatch => {
  dispatch(deleteLevelEducationStart());
  const dataDelete = {
    _id
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level-education/delete-level-education`;

  axios.delete(url, {
    headers,
    data: {
      dataDelete
    }
  }).then(res => {
    if (res.data.levelEducation) {
      dispatch(deleteLevelEducationSuccess(_id, res.data.message));
    } else {
      dispatch(deleteLevelEducationFail('delete level education has failed'));
    }

  }).catch(err => {
    dispatch(deleteLevelEducationFail(err));
  });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageCRUDLevelEducation = () => dispatch => {
  dispatch(refreshMessage());
};