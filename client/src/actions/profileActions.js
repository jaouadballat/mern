import { push } from 'react-router-redux';

import Api from '../config/Api';

export function getProfile() {
    return function(dispatch) {
        Api().get('/profile')  
            .then(response => {
                dispatch({
                    type: 'GET_PROFILE',
                    payload: response.data
                });

            }).catch(error => {
                console.log('profile unauthorized');
                // dispatch({
                //     type: 'GET_ERRORS',
                //     payload: error.response.data
                // })
            });
    }
}

export function createProfile(profileData) {
    return function(dispatch) {
        Api().post('/profile', profileData)
            .then(response => {
                console.log(response.data)
                dispatch(push('/dashboard'))
            }).catch(error => {
                console.log(error.response.data)
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
            });
    }
}

export function deleteProfile() {
   return function(dispatch) {
       Api().delete('/profile')
           .then(response => {
               dispatch({
                   type: 'DELETE_PROFILE',
                   payload: {}
               });
               dispatch(push('/dashboard'))
           });
   }
}

export function addExperience(experience) {
    return function(dispatch) {
        Api().post('/profile/experience', experience)
            .then(response => {
                dispatch(push('/dashboard'));
            }).catch(error => {
                console.log(error.response.data)
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
            });
    }
}


export function clearProfile() {
    return {
        type: 'CLEAR_PROFILE'
    }
}