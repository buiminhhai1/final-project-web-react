import axios from 'axios';
import * as actionTypes from './actionTypes';

export const createSkillStart = () => ({
  type: actionTypes.CREATE_SKILL_START
});

export const createSkillSuccess = (_id, title, content, message) => ({
  type: actionTypes.CREATE_SKILL_SUCCESS,
  _id,
  title,
  content,
  message
});

export const createSkillFail = err => ({
  type: actionTypes.CREATE_SKILL_FAIL,
  error: err
});

export const createSkill = (title, content) => dispatch => {
  dispatch(createSkillStart());
  const skillData = {
    title,
    content
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
            res.data.skill.content,
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

export const updateSkillSuccess = (_id, title, content, message) => ({
  type: actionTypes.UPDATE_SKILL_SUCCESS,
  _id,
  title,
  content,
  message
});

export const updateSkillFail = err => ({
  type: actionTypes.UPDATE_SKILL_FAIL,
  error: err
});

export const updateSkill = (_id, title, content) => dispatch => {
  dispatch(updateSkillStart());
  const updated = {
    _id,
    title,
    content
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
            res.data.skill.content,
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

export const getListSkill = () => dispatch => {
  dispatch(getListSkillStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = 'http://localhost:4200/skill/get-list';
  axios
    .get(url, {
      headers
    })
    .then(res => {
      console.log(res);
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

export const deleteSkillSuccess = (_id, title, content, message) => ({
  type: actionTypes.DELETE_SKILL_SUCCESS,
  _id,
  title,
  content,
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
        dispatch(
          deleteSkillSuccess(
            res.data.skill._id,
            res.data.skill.title,
            res.data.skill.content,
            res.data.message
          )
        );
      } else dispatch(deleteSkillFail('delete has failled!'));
    })
    .catch(err => {
      dispatch(deleteSkillFail(err));
    });
};
