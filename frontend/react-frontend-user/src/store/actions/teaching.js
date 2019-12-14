import * as actionTypes from '../actionTypes';
import axios from 'axios';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;

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

        let url = apiUrl + "/teachers/subjects";
        axios.get(url)
            .then(res => {
                let subjects = res.data.subjects;
                dispatch(getSubjectsSuccess(subjects));
            })
            .catch(err => {
                console.log(err);
                dispatch(getSubjectsFail(err));
            })
    }
}