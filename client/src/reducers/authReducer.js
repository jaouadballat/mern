import _ from 'lodash';

const initialState = {
    isAuth: false,
    token: null,
    user: {}
}

export default function (state=initialState, action) {
    switch(action.type) {
        case 'USER_REGISTER':
            return {
                ...state, 
                user: action.payload
            }
        
        case 'USER_LOGIN': 
            return {
                ...state,
                isAuth: !_.isEmpty(action.payload),
                token: action.payload
            }
        case 'CURRENT_USER': 
            return {
                ...state,
                isAuth: !_.isEmpty(action.payload),
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                user:{}
            }

        default: return state;
    }
}

