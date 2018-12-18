import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const createSeason = (season) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/seasons`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify(season)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.catch(err => {
		const {reason, message, location} = err;
		if (message === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			)
		}
	})
}