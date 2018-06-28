import Api from '../config/Api';

export default function registerUser(userData, history) {
    return function(dispatch) {
        Api().post('/users/register', userData)
            .then(response => {
                dispatch({
                    type: "USER_REGISTER",
                    payload: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data.errors
                });
            });
    }
}