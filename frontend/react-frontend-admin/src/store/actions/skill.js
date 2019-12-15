import axios from 'axios';
import * as actionTypes from './actionTypes';

export const createSkillStart = () => ({
  type: actionTypes.CREATE_SKILL_START
});

export const createSkillSuccess = (_id, title, message) => ({
  type: actionTypes.CREATE_SKILL_SUCCESS,
  _id,
  title,
  message
});

export const createSkillFail = err => ({
  type: actionTypes.CREATE_SKILL_FAIL,
  error: err
});

export const createSkill = title => dispatch => {
  dispatch(createSkillStart());
  const skillData = {
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = 'http://localhost:4200/skill/add-skill';
  axios
    .post(url, skillData, {
      headers
    })
    .then(res => {
      if (!!res.data.skill) {
        dispatch(
          createSkillSuccess(
            res.data.skill._id,
            res.data.skill.title,
            res.data.message
          )
        );
      } else {
        dispatch(createSkillFail(res.data.message));
      }
    })
    .catch(err => {
      dispatch(createSkillFail(err));
    });
};

export const updateSkillStart = () => ({
  type: actionTypes.UPDATE_SKILL_START
});

export const updateSkillSuccess = (_id, title, message) => ({
  type: actionTypes.UPDATE_SKILL_SUCCESS,
  _id,
  title,
  message
});

export const updateSkillFail = err => ({
  type: actionTypes.UPDATE_SKILL_FAIL,
  error: err
});

export const updateSkill = (_id, title) => dispatch => {
  dispatch(updateSkillStart());
  const updated = {
    _id,
    title
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `http://localhost:4200/skill/update-skill/${_id}`;
  axios
    .put(url, updated, {
      headers
    })
    .then(res => {
      if (!!res.data.skill) {
        dispatch(
          updateSkillSuccess(
            res.data.skill._id,
            res.data.skill.title,
            res.data.message
          )
        );
      } else {
        dispatch(updateSkillFail(`Updated skill has failled`));
      }
    })
    .catch(err => {
      dispatch(updateSkillFail(err));
    });
};

export const getListSkillStart = () => ({
  type: actionTypes.GET_LIST_SKILL_START
});

export const getListSkillSuccess = skills => ({
  type: actionTypes.GET_LIST_SKILL_SUCCESS,
  skills
});

export const getListSkillFail = err => ({
  type: actionTypes.GET_LIST_SKILL_FAIL,
  error: err
});

export const getListSkill = searchString => dispatch => {
  dispatch(getListSkillStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };

  const url = `http://localhost:4200/skill/get-list?searchString=${searchString}`;
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (!!res.data.skills) {
        dispatch(getListSkillSuccess(res.data.skills));
      } else {
        dispatch(getListSkillFail(`Empty list Skills`));
      }
    })
    .catch(err => {
      dispatch(getListSkillFail(err));
    });
};

export const deleteSkillStart = () => ({
  type: actionTypes.DELETE_SKILL_START
});

export const deleteSkillSuccess = (_id, message) => ({
  type: actionTypes.DELETE_SKILL_SUCCESS,
  _id,
  message
});

export const deleteSkillFail = err => ({
  type: actionTypes.DELETE_SKILL_FAIL,
  error: err
});

export const deleteSkill = _id => dispatch => {
  dispatch(deleteSkillStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `http://localhost:4200/skill/delete-skill/${_id}`;
  axios
    .delete(url, {
      headers
    })
    .then(res => {
      if (!!res.data.skill) {
        console.log(res.data);
        dispatch(deleteSkillSuccess(_id, res.data.message));
      } else dispatch(deleteSkillFail('delete has failled!'));
    })
    .catch(err => {
      dispatch(deleteSkillFail(err));
    });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageCRUD = () => dispatch => {
  dispatch(refreshMessage());
};
