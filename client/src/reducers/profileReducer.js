const initialState = {
    profile : {},
    profiles: {},
    handle: {}
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

        case 'GET_PROFILES':
            return {
                ...state,
                profiles: action.payload.profiles
            }
        
        case 'GET_PROFILE_HANDLE':
            return {
                ...state,
                handle: action.payload.profile
            }
        
        case 'CLEAR_PROFILE':
            return {};
        
        

        default: return state;
    }
}