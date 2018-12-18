import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
// import {loadAuthToken} from '../local-storage';
import {fetchProtectedData as fetchPlayers} from './protected-data';

export const FETCH_PLAYER_SUCCESS = 'FETCH_PLAYER_SUCCESS';
export const fetchPlayerSuccess = player => ({
	type: FETCH_PLAYER_SUCCESS,
	player
});

export const FETCH_PLAYER_ERROR = 'FETCH_PLAYER_ERROR';
export const fetchPlayerError = error => ({
	type: FETCH_PLAYER_ERROR,
	error
});

export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const fetchPlayersSuccess = players => ({
	type: FETCH_PLAYERS_SUCCESS, 
	players
});

export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersError = error => ({
	type: FETCH_PLAYERS_ERROR,
	error
})

export const UPDATE_PLAYER_DIVISION = 'UPDATE_PLAYER_DIVISION';
export const updatePlayerDivision = player => ({
	type: UPDATE_PLAYER_DIVISION,
	player
});

export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const updateTeamSuccess = team => ({
	type: UPDATE_TEAM_SUCCESS,
	team
});

export const UPDATE_PLAYER_NOTES = 'UPDATE_PLAYER_NOTES';
export const updatePlayerNotes = player => ({
	type: UPDATE_PLAYER_NOTES,
	player
})

export const fetchAllPlayers = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/players`, {
		method: 'GET', 
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchPlayersSuccess(data)))
	.catch(err => console.error(err))
}

export const updateTeam = (id, team) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/players/${id}/team`, {
		method: 'PUT', 
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify({
			'team': team.team
		})
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => {
		dispatch(fetchPlayerSuccess(data));
		dispatch(updateTeamSuccess(data.team));
	})
	.catch(err => dispatch(fetchPlayersError(err)));
}

export const assignTeam = (data) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/players/${data.player}/team`, {
		method: 'PUT', 
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify(data)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchAllPlayers()))
	.catch(err => dispatch(fetchPlayersError(err)));
}

export const updateDivision = (playerId, {division}) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/players/${playerId}/division`, {
		method: 'PUT', 
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify({
			"division": division
		})
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(updatePlayerDivision(data)))
	.catch(err => {
		console.error(err);
	})
}

export const addNotes = (playerId, notes) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	
	return fetch(`${API_BASE_URL}/api/players/${playerId}/notes`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}, 
		body: JSON.stringify({notes})
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(updatePlayerNotes(data)))
	.catch(err => {
		console.error(err);
	})
}

export const fetchPlayer = (playerId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/players/${playerId}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then((player) => {
		dispatch(fetchPlayerSuccess(player))
		dispatch(updateTeamSuccess(player.team))
	})
	.catch(err => {
		const {reason, message, location} = err;
		if (reason === 'ValidationError') {
			return Promise.reject(
				new SubmissionError({
					[location]: message
				})
			);
		}
	});
}

export const registerPlayer = player => (dispatch, getState) => {
	
	//need to get something from square plus add in a transactions table to keep track of who pays
	const authToken = getState().auth.authToken;

	let formData = new FormData();

	for (let key in player) {
		formData.append(key, player[key])
	}

	formData.append('certificate', player.certificate[0]);

	return fetch(`${API_BASE_URL}/api/players`, {
		method: 'POST', 
		headers: {
			'Authorization': `Bearer ${authToken}`
		},
		body: formData
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
		});
};

export const togglePaid = (id, value) => (dispatch, getState) => {

	const newPaidValue = !value;

	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/players/${id}/paid`, {
		method: 'post',
		headers: {
			'content-type': 'application/json', 
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify({'paid': newPaidValue})
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(res => dispatch(fetchPlayers()))
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

export const downloadCSV = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	return fetch(`${API_BASE_URL}/api/players/csv`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json', 
			'Authorization': `Bearer ${authToken}`
		}
	})
	.then(data => window.open(data))
}