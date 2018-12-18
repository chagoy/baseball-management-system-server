import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

export const PASSWORD_CHANGE_REQUEST = 'PASSWORD_CHANGE_REQUEST';
export const passwordChangeRequest = (response) => ({
	type: PASSWORD_CHANGE_REQUEST,
	response
});

export const PASSWORD_CHANGE_ERROR = 'PASSWORD_CHANGE_ERROR';
export const passwordChangeError = (response) => ({
	type: PASSWORD_CHANGE_ERROR,
	response
});


const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const logout = user => dispatch => {
	dispatch(clearAuth());
	clearAuthToken();
}

export const login = (username, password, email, firstName, lastName) => dispatch => {
	dispatch(authRequest());
	return (
		fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username, password, email, firstName, lastName
			})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({authToken}) => storeAuthInfo(authToken, dispatch))
		.catch(err => {
			const {code} = err;
			const message = code === 401 ? 'Incorrect username of password' : 'Unable to login, please try again';
			dispatch(authError(err));
			return Promise.reject(
				new SubmissionError({
					_error: message
				})
			)
		})
	)
}

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(({authToken}) => storeAuthInfo(authToken, dispatch))
	.catch(err => {
		dispatch(authError(err));
		dispatch(clearAuth());
		clearAuthToken(authToken);
	});
};

export const resetPassword = (email) => (dispatch, getState) => {
	// dispatch(resetPasswordRequest());
	return fetch(`${API_BASE_URL}/auth/reset`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json'
			},
		body: JSON.stringify(email)
	}) 
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.error(err))
}

export const checkValidToken = (hash) => (dispatch, getState) => {
	console.log('supposed to check')
	return fetch(`${API_BASE_URL}/auth/reset/${hash}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(passwordChangeRequest(data)))
	.catch(err => dispatch(passwordChangeError(err)))
}

export const saveNewPassword = (data) => (dispatch, getState) => {
	console.log(data)
	return fetch(`${API_BASE_URL}/auth/reset/${data.hash}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.error(err))
}