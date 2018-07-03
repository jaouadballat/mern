import { push } from 'react-router-redux';

import Api from '../config/Api';

export function registerUser(userData, history) {
    return function(dispatch) {
        Api().post('/users/register', userData)
            .then(response => {
                dispatch({
                    type: "USER_REGISTER",
                    // payload: response.data
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
                localStorage.setItem('token', response.data.token);
                dispatch({
                    type: 'USER_LOGIN',
                    payload: response.data.token
                });
                dispatch(currentUser());
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
            });
    }
}

export function currentUser() {
    return function(dispatch) {
        Api().get('users/current')
            .then(response => {
                dispatch({
                    type: 'CURRENT_USER',
                    payload: response.data
                });
            }).catch(error => {
                // if (error.response.data === 'Unauthorized') {
                //     //localStorage.removeItem('token');
                //     //dispatch(push('/login'));
                // }
                console.log(error.response.data);
            });
    }
}

export function logout() {
    return function(dispatch) {
        localStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT'
        });
        dispatch({
            type: 'CLEAR_ERRORS'
        });
        dispatch(push('/login'));
    }
}

