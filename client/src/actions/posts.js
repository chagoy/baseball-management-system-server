import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const fetchPostSuccess = post => ({
	type: FETCH_POST_SUCCESS,
	post
});

export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';
export const fetchPostError = error => ({
	type: FETCH_POST_ERROR,
	error
});

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const fetchPostsSuccess = (posts) => ({
	type: FETCH_POSTS_SUCCESS,
	posts
});

export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const fetchPostsErrors = error => ({
	type: FETCH_POSTS_ERROR,
	error
});

export const getPosts = post => (dispatch, getState) => {
	console.log('hi')
	return fetch(`${API_BASE_URL}/api/posts`, {
		method: 'GET',
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchPostsSuccess(data)))
	.catch(err => {
		const { reason, message, location } = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}

export const makePost = post => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	let formData = new FormData();

	for (let key in post) {
		formData.append(key, post[key])
	}

	formData.append('image', post.image[0]);

	return fetch(`${API_BASE_URL}/api/posts`, {
		method: 'POST',
		headers: { 
			'Authorization': `Bearer ${authToken}`
		},
		body: formData
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.catch(err => {
		const { reason, message, location } = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}