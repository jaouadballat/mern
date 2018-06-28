import { push } from 'react-router-redux';

import Api from '../config/Api';

export function registerUser(userData, history) {
    return function(dispatch) {
        Api().post('/users/register', userData)
            .then(response => {
                dispatch({
                    type: "USER_REGISTER",
                    payload: response.data
                });
                dispatch(push('/login'))
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data.errors
                });
            });
    }
}

export function loginUser(userData) {
    return function(dispatch) {
        Api().post('/users/login', userData)
            .then(response => {
                dispatch({
                    type: 'USER_LOGIN',
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
            });
    }
}

