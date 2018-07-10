const initialState = {
    posts: [],
    loading: true
}


export default function(state=initialState, action) {
    switch(action.type) {
        case 'POSTS_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'GET_POSTS': 
            return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case 'DELETE_POST': 
        return {
            ...state,
            posts: state.posts.filter(post => post._id !== action.payload)
        }

        // case 'ADD_POST':
        //     return {
        //         ...state,
        //         posts: [action.payload, ...state.posts]
        //     };

       


        default: return state;
    }
}