const initialState = {
    isAuth: false,
    user: {}
}

export default function (state=initialState, action) {
    switch(action.type) {
        case "USER_REGISTER":
            return {
                ...state, 
                user: action.payload
            }
        default: return state;
    }
}