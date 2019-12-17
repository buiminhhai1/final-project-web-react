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

export const getSubjectsSuccess = (subjects) => {
    return {
        type: actionTypes.GET_SUBJECTS_SUCCESS,
        subjects
    };
};

export const getSubjectsFail = (error) => {
    return {
        type: actionTypes.GET_SUBJECTS_ERROR,
        error
    };
};

export function getSubjects() {
    return (dispatch) => {
        dispatch(getSubjectsPending());

        let url = apiUtilUrl + "/skill/get-list-enable-skill";
        axios.get(url)
            .then(res => {
                let subjects = res.data.skills;
                dispatch(getSubjectsSuccess(subjects));
            })
            .catch(err => {
                console.log(err);
                dispatch(getSubjectsFail(err));
            })
    }
}

export const getLevelPending = () => {
    return {
        type: actionTypes.GET_LEVEL_PENDING
    };
};

export const getLevelSuccess = (level) => {
    return {
        type: actionTypes.GET_LEVEL_SUCCESS,
        level
    };
};

export const getLevelFail = (error) => {
    return {
        type: actionTypes.GET_LEVEL_ERROR,
        error
    };
};

export function getLevel() {
    return (dispatch) => {
        dispatch(getLevelPending());

        let url = apiUtilUrl + "/level/get-list-enable-level";
        axios.get(url)
            .then(res => {
                let level = res.data.levels;
                dispatch(getLevelSuccess(level));
            })
            .catch(err => {
                console.log(err);
                dispatch(getLevelFail(err));
            })
    }
}

export const getTeachersPending = () => {
    return {
        type: actionTypes.GET_TEACHERS_PENDING
    };
};

export const getTeachersSuccess = (teachers) => {
    return {
        type: actionTypes.GET_TEACHERS_SUCCESS,
        teachers
    };
};

export const getTeachersFail = (error) => {
    return {
        type: actionTypes.GET_TEACHERS_ERROR,
        error
    };
};

export function getTeachers() {
    return (dispatch) => {
        dispatch(getTeachersPending());

        let url = apiUtilUrl + "/users/get-list-user?type=2";
        axios.get(url)
            .then(res => {
                let teachers = res.data.users;
                dispatch(getTeachersSuccess(teachers));
            })
            .catch(err => {
                console.log(err);
                dispatch(getTeachersFail(err));
            })
    }
}

export const getTeacherPending = () => {
    return {
        type: actionTypes.GET_TEACHER_PENDING
    };
};

export const getTeacherSuccess = (teacher) => {
    return {
        type: actionTypes.GET_TEACHER_SUCCESS,
        teacher
    };
};

export const getTeacherFail = (error) => {
    return {
        type: actionTypes.GET_TEACHER_ERROR,
        error
    };
};

export function getTeacher(userId) {
    return (dispatch) => {
        dispatch(getTeacherPending());

        let url = apiUrl + "/users/detail";
        axios.get(url, {
            params: {
                userId
            }
        })
            .then(res => {
                let teacher = res.data.teacher;
                if (teacher) {
                    console.log(teacher);
                    dispatch(getTeacherSuccess(teacher));
                }
                else
                    dispatch(getTeacherFail(res.data.message));
            })
            .catch(err => {
                dispatch(getTeacherFail(err));
            })
    }
}