import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const fetchGamesSuccess = games => ({
	type: FETCH_GAMES_SUCCESS,
	games
});

export const FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR';
export const fetchGamesError = error => ({
	type: FETCH_GAMES_ERROR,
	error
});

export const SELECTED_GAME_SUCCESS = 'SELECTED_GAME_SUCCESS';
export const selectedGameSuccess = game => ({
	type: SELECTED_GAME_SUCCESS,
	game
});

export const getGame = id => (dispatch, getState) => {
	return fetch(`${API_BASE_URL}/api/games/${id}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(selectedGameSuccess(data)))
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}

export const createGame = game => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/games`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify(game)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			);
		}
	})
}

export const fetchAllGames = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/games`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchGamesSuccess(data)))
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}

export const fetchUpcomingGames = game => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	
	return fetch(`${API_BASE_URL}/api/games/upcoming`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchGamesSuccess(data)))
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}

export const fetchGames = game => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	
	return fetch(`${API_BASE_URL}/api/games/user`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchGamesSuccess(data)))
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}

export const updateScores = game => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/games/scores`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify(game)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			);
		}
	})

}

// export const createGame = game => (dispatch, getState) => {
// 	console.log(game);

// 	const authToken = getState().auth.authToken;

// 	return fetch(`${API_BASE_URL}/api/games`, {
// 		method: 'POST',
// 		headers: {
// 			'content-type': 'application/json',
// 			'Authorization': `Bearer ${authToken}`
// 		}, 
// 		body: JSON.stringify(game)
// 	})
// 	.then(res => normalizeResponseErrors(res))
// 	.then(res => res.json())
// 	.then(data => dispatch(fetchGamesSuccess(data)))
// 	.catch(err => {
// 		const {reason, message, location} = err;
// 		if (reason === 'ValidationError') {
// 			return Promise.reject(
// 				new SubmissionError({
// 					[location]: message
// 				})
// 			)
// 		}
// 	})
// }