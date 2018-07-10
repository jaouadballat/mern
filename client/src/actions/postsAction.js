import { push } from 'react-router-redux';

import Api from '../config/Api';

export function getPosts() {
    return function(dispatch) {
        dispatch(postsLoading());
        Api().get('/post')
        .then(response => {
                dispatch({
                    type: 'GET_POSTS',
                    payload: response.data.posts
                });
            });
    }
}

export function addPost(post) {
    return function(dispatch) {
        Api().post('/post', post)
            .then(response => {
                dispatch(getPosts());
            });
    }
}


export function deletePost(postId) {
    return function(dispatch) {
        Api().delete(`/post/${postId}`)
            .then(response => {
               dispatch({
                   type: 'DELETE_POST',
                   payload: postId
               });
            }).catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response
                })
            })
    }
}

export function postsLoading() {
    return {
        type: 'POSTS_LOADING'
    }
}