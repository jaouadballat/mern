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
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                })
            });
    }
}

export function clearProfile() {
    return {
        type: 'CLEAR_PROFILE'
    }
}