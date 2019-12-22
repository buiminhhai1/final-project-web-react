import * as actionTypes from '../actionTypes';
import axios from 'axios';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;
const apiUtilUrl = process.env.REACT_APP_API_UTILITY;

export const getSubjectsPending = () => {
  return {
    type: actionTypes.GET_SUBJECTS_PENDING
  };
};

export const getSubjectsSuccess = subjects => {
  return {
    type: actionTypes.GET_SUBJECTS_SUCCESS,
    subjects
  };
};

export const getSubjectsFail = error => {
  return {
    type: actionTypes.GET_SUBJECTS_ERROR,
    error
  };
};

export function getSubjects() {
  return dispatch => {
    dispatch(getSubjectsPending());

    let url = apiUtilUrl + '/skill/get-list-enable-skill';
    axios
      .get(url)
      .then(res => {
        let subjects = res.data.skills;
        dispatch(getSubjectsSuccess(subjects));
      })
      .catch(err => {
        console.log(err);
        dispatch(getSubjectsFail(err));
      });
  };
}

export const getEducationLevelPending = () => {
  return {
    type: actionTypes.GET_EDUCATION_LEVEL_PENDING
  };
};

export const getEducationLevelSuccess = level => {
  return {
    type: actionTypes.GET_EDUCATION_LEVEL_SUCCESS,
    level
  };
};

export const getEducationLevelFail = error => {
  return {
    type: actionTypes.GET_EDUCATION_LEVEL_ERROR,
    error
  };
};

export function getEducationLevel() {
  return dispatch => {
    dispatch(getEducationLevelPending());

    let url = apiUtilUrl + '/level-education/get-list-enable-level-education';
    axios
      .get(url)
      .then(res => {
        let level = res.data.levelEducations;
        dispatch(getEducationLevelSuccess(level));
      })
      .catch(err => {
        console.log(err);
        dispatch(getEducationLevelFail(err));
      });
  };
}

export const getLevelPending = () => {
  return {
    type: actionTypes.GET_LEVEL_PENDING
  };
};

export const getLevelSuccess = level => {
  return {
    type: actionTypes.GET_LEVEL_SUCCESS,
    level
  };
};

export const getLevelFail = error => {
  return {
    type: actionTypes.GET_LEVEL_ERROR,
    error
  };
};

export function getLevel() {
  return dispatch => {
    dispatch(getLevelPending());

    let url = apiUtilUrl + '/level/get-list-enable-level';
    axios
      .get(url)
      .then(res => {
        let level = res.data.levels;
        dispatch(getLevelSuccess(level));
      })
      .catch(err => {
        console.log(err);
        dispatch(getLevelFail(err));
      });
  };
}

export const getTeachersPending = () => {
  return {
    type: actionTypes.GET_TEACHERS_PENDING
  };
};

export const getTeachersSuccess = teachers => {
  return {
    type: actionTypes.GET_TEACHERS_SUCCESS,
    teachers
  };
};

export const getTeachersFail = error => {
  return {
    type: actionTypes.GET_TEACHERS_ERROR,
    error
  };
};

export function getTeachers() {
  return dispatch => {
    dispatch(getTeachersPending());

    let url = apiUtilUrl + '/users/get-list-user?type=1';
    axios
      .get(url)
      .then(res => {
        let teachers = res.data.users;
        console.log(teachers);

        dispatch(getTeachersSuccess(teachers));
      })
      .catch(err => {
        console.log(err);
        dispatch(getTeachersFail(err));
      });
  };
}

export const getTeacherPending = () => {
  return {
    type: actionTypes.GET_TEACHER_PENDING
  };
};

export const getTeacherSuccess = teacher => {
  return {
    type: actionTypes.GET_TEACHER_SUCCESS,
    teacher
  };
};

export const getTeacherFail = error => {
  return {
    type: actionTypes.GET_TEACHER_ERROR,
    error
  };
};

export function getTeacher(userId) {
  return dispatch => {
    dispatch(getTeacherPending());

    let url = apiUrl + '/users/detail';
    axios
      .get(url, {
        params: {
          userId
        }
      })
      .then(res => {
        let teacher = res.data.teacher;
        console.log(teacher);

        if (teacher) {
          dispatch(getTeacherSuccess(teacher));
        } else dispatch(getTeacherFail(res.data.message));
      })
      .catch(err => {
        dispatch(getTeacherFail(err));
      });
  };
}

export const getLocationsPending = () => {
  return {
    type: actionTypes.GET_LOCATIONS_PENDING
  };
};

export const getLocationsSuccess = locations => {
  return {
    type: actionTypes.GET_LOCATIONS_SUCCESS,
    locations
  };
};

export const getLocationsFail = error => {
  return {
    type: actionTypes.GET_LOCATIONS_ERROR,
    error
  };
};

export function getLocations() {
  return dispatch => {
    dispatch(getLocationsPending());

    let url = apiUtilUrl + '/location/get-list-location';
    axios
      .get(url)
      .then(res => {
        let locations = res.data.locations;
        if (locations) {
          dispatch(getLocationsSuccess(locations));
        } else dispatch(getLocationsFail(res.data.message));
      })
      .catch(err => {
        console.log(err);
        dispatch(getLocationsFail(err));
      });
  };
}

export const sendFirstMessagePending = () => {
  return {
    type: actionTypes.SEND_FIRST_MESSAGE_PENDING
  };
};

export const sendFirstMessageSuccess = () => {
  return {
    type: actionTypes.SEND_FIRST_MESSAGE_SUCCESS
  };
};

export const sendFirstMessageFail = error => {
  return {
    type: actionTypes.SEND_FIRST_MESSAGE_ERROR,
    error
  };
};

export function sendFirstMessage(token, data) {
  return dispatch => {
    dispatch(sendFirstMessagePending());
    const chatUrl = apiUrl + '/chat/groups';

    axios({
      method: 'post',
      url: chatUrl,
      headers: {
        Authorization: token
      },
      data
    })
      .then(res => {
        console.log(res.data);
        if (res.data.result) {
          dispatch(sendFirstMessageSuccess());
        } else {
          dispatch(sendFirstMessageFail('You have sent your first messages'));
        }
      })
      .catch(err => {
        dispatch(sendFirstMessageFail('Something wrong happened'));
      });
  };
}

export const createContractPending = () => {
  return {
    type: actionTypes.CREATE_CONTRACT_PENDING
  };
};

export const createContractSuccess = () => {
  return {
    type: actionTypes.CREATE_CONTRACT_SUCCESS
  };
};

export const createContractFail = error => {
  return {
    type: actionTypes.CREATE_CONTRACT_ERROR,
    error
  };
};

export function createContract(token, data) {
  return dispatch => {
    dispatch(createContractPending());
    const chatUrl = apiUrl + '/createContract';
    console.log(data);
    
    axios({
      method: 'post',
      url: chatUrl,
      headers: {
        Authorization: token
      },
      data
    })
      .then(res => {
        console.log(res.data);
        if (res.data.result) {
          dispatch(createContractSuccess());
        } else {
          dispatch(createContractFail('Something wrong happened'));
        }
      })
      .catch(err => {
        dispatch(createContractFail('Something wrong happened'));
      });
  };
}
