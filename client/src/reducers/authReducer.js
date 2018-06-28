import _ from 'lodash';

const initialState = {
    isAuth: false,
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
                user: action.payload
            }

        default: return state;
    }
}

