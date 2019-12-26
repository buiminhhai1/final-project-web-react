import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  API_URL
} from './apiUrl';

export const createLevelStart = () => ({
  type: actionTypes.CREATE_LEVEL_START
});

export const createLevelSuccess = (_id, title, message) => ({
  type: actionTypes.CREATE_LEVEL_SUCCESS,
  _id,
  title,
  message
});

export const createLevelFail = err => ({
  type: actionTypes.CREATE_LEVEL_FAIL,
  error: err
});

export const createLevel = title => dispatch => {
  dispatch(createLevelStart());
  const levelData = {
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level/add-level`;
  axios
    .post(url, levelData, {
      headers
    })
    .then(res => {
      if (!!res.data.level) {
        dispatch(
          createLevelSuccess(
            res.data.level._id,
            res.data.level.title,
            res.data.message
          )
        );
      } else {
        dispatch(createLevelFail(res.data.message));
      }
    })
    .catch(err => {
      dispatch(createLevelFail(err));
    });
};

export const updateLevelStart = () => ({
  type: actionTypes.UPDATE_LEVEL_START
});

export const updateLevelSuccess = (_id, title, message) => ({
  type: actionTypes.UPDATE_LEVEL_SUCCESS,
  _id,
  title,
  message
});

export const updateLevelFail = err => ({
  type: actionTypes.UPDATE_LEVEL_FAIL,
  error: err
});

export const updateLevel = (_id, title) => dispatch => {
  dispatch(updateLevelStart());
  const updated = {
    _id,
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level/update-level`;
  axios
    .put(url, updated, {
      headers
    })
    .then(res => {
      if (!!res.data.level) {
        dispatch(
          updateLevelSuccess(
            res.data.level._id,
            res.data.level.title,
            res.data.message
          )
        );
      } else {
        dispatch(updateLevelFail(`Updated skill has failled`));
      }
    })
    .catch(err => {
      dispatch(updateLevelFail(err));
    });
};

export const getListLevelStart = () => ({
  type: actionTypes.GET_LIST_LEVEL_START
});

export const getListLevelSuccess = levels => ({
  type: actionTypes.GET_LIST_LEVEL_SUCCESS,
  levels
});

export const getListLevelFail = err => ({
  type: actionTypes.GET_LIST_LEVEL_FAIL,
  error: err
});

export const getListLevel = searchString => dispatch => {
  dispatch(getListLevelStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const resultSearch = searchString ? `?searchString=${searchString}` : '';
  const url = `${API_URL}}/level/get-list${resultSearch}`;
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (res.data.levels) {
        dispatch(getListLevelSuccess(res.data.levels));
      } else {
        dispatch(getListLevelFail(`Empty list Skills`));
      }
    })
    .catch(() => {
      dispatch(getListLevelFail(`something wrong`));
    });
};

export const deleteLevelStart = () => ({
  type: actionTypes.DELETE_LEVEL_START
});

export const deleteLevelSuccess = (_id, message) => ({
  type: actionTypes.DELETE_LEVEL_SUCCESS,
  _id,
  message
});

export const deleteLevelFail = err => ({
  type: actionTypes.DELETE_LEVEL_FAIL,
  error: err
});

export const deleteLevel = _id => dispatch => {
  dispatch(deleteLevelStart());
  const dataDelete = {
    _id
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/level/delete-level`;
  axios
    .delete(url, {
      headers,
      data: {
        dataDelete
      }
    })
    .then(res => {
      if (!!res.data.level) {
        dispatch(deleteLevelSuccess(_id, res.data.message));
      } else {
        dispatch(deleteLevelFail('delete has failled!'));
      }
    })
    .catch(err => {
      dispatch(deleteLevelFail(err));
    });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageCRUDLevel = () => dispatch => {
  dispatch(refreshMessage());
};