const initialState = {
    profile : {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'GET_PROFILE': 
            return {
                ...state,
                profile: action.payload.profile
            }
        
        case 'DELETE_PROFILE':
            return {
                ...state,
                profile: action.payload
            }
        
        case 'CLEAR_PROFILE':
            return {};
        
        

        default: return state;
    }
}