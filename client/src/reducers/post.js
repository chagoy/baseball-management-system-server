import { FETCH_POSTS_SUCCESS } from '../actions/posts';

const initialState = {
    posts: [],
    error: null
}

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_POSTS_SUCCESS) {
        return Object.assign({}, state, {
            posts: action.posts
        })
    }
    return state;
}