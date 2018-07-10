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

export function addEducation(education) {
    return function(dispatch) {
        Api().post('/profile/education', education)
            .then(response => {
                dispatch(push('/dashboard'));
            }).catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
            });
    }
}

export function deleteExperience(expId) {
    return function(dispatch) {
        Api().delete(`/profile/experience/${expId}`)
            .then(response => {
                dispatch(push('/dashboard'));
            });
    } 
}

export function deleteEducation(eduId) {
    return function (dispatch) {
        Api().delete(`/profile/education/${eduId}`)
            .then(response => {
                dispatch(push('/dashboard'));
            });
    }
}

export function getProfiles() {
    return function(dispatch) {
        Api().get('/profile/all')
            .then(response => {
                dispatch({
                    type: 'GET_PROFILES',
                    payload: response.data
                });
            });
    }
} 

export function getProfileByHandle(handle) {
   return function(dispatch) {
       Api().get(`/profile/handle/${handle}`)
       .then(response => {
        dispatch({
            type: 'GET_PROFILE_HANDLE',
            payload: response.data
        })
       }).catch(error => {
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