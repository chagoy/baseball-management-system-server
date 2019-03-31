import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS';
export const fetchTeamSuccess = team => ({
	type: FETCH_TEAM_SUCCESS,
	team
});

export const FETCH_TEAM_ERROR = 'FETCH_TEAM_ERROR';
export const fetchTeamError = error => ({
	type: FETCH_TEAM_ERROR,
	error
})

export const FETCH_ALL_TEAMS_SUCCESS = 'FETCH_ALL_TEAMS_SUCCESS';
export const fetchAllTeamsSuccess = (teams, loading) => ({
	type: FETCH_ALL_TEAMS_SUCCESS,
	teams,
	loading
});

export const FETCH_ALL_TEAMS_ERROR = 'FETCH_ALL_TEAMS_ERROR';
export const fetchAllTeamsError = error => ({
	type: FETCH_ALL_TEAMS_ERROR,
	error
});

export const FETCH_ALL_TEAMS_LOADING = 'FETCH_ALL_TEAMS_LOADING';
export const fetchAllTeamsLoading = loading => ({
	type: FETCH_ALL_TEAMS_LOADING,
	loading
});

export const FETCH_STANDINGS_SUCCESS = 'FETCH_STANDINGS_SUCCESS';
export const fetchStandingsSuccess = standings => ({
	type: FETCH_STANDINGS_SUCCESS,
	standings
});

export const FETCH_STANDINGS_ERROR = 'FETCH_STANDINGS_ERROR';
export const fetchStandingsError = error => ({
	type: FETCH_STANDINGS_ERROR,
	error
})

export const FETCH_TEAM_GAMES_SUCCESS = 'FETCH_TEAM_GAMES_SUCCESS';
export const fetchTeamGamesSuccess = games => ({
	type: FETCH_TEAM_GAMES_SUCCESS,
	games
});

export const FETCH_TEAM_GAMES_ERRORS = 'FETCH_TEAM_GAMES_ERRORS';
export const fetchTeamGamesErrors = error => ({
	type: FETCH_TEAM_GAMES_ERRORS,
	error
});

export const getTeam = team => (dispatch, getState) => {
	return fetch(`${API_BASE_URL}/api/teams/${team}`, {
		method: 'GET',
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchTeamSuccess(data)))
	.catch(err => {
		dispatch(fetchAllTeamsError(err));
	})
}

export const createTeam = team => (dispatch, getState) => {
	const authToken = getState().auth.authToken;

	let formData = new FormData();

	for (let key in team) {
		formData.append(key, team[key])
	}

	formData.append('logo', team.logo[0])

	return fetch(`${API_BASE_URL}/api/teams`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${authToken}`
		},
		body: formData
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(team => dispatch(fetchTeamSuccess(team)))
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

export const getAllTeams = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	dispatch(fetchAllTeamsLoading())
	return fetch(`${API_BASE_URL}/api/teams`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchAllTeamsSuccess(data)))
	.catch(err => {
		dispatch(fetchAllTeamsError(err));
	})
}

export const fetchStandings = () => (dispatch, getState) => {
	return fetch(`${API_BASE_URL}/api/teams/standings`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchStandingsSuccess(data)))
	.catch(err => {
		dispatch(fetchStandingsError(err));
	})
}

export const fetchTeamGames = (team) => (dispatch, getState) => {
	return fetch(`${API_BASE_URL}/api/games/byteam/${team}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchTeamGamesSuccess(data)))
	.catch(err => {
		dispatch(fetchTeamGamesErrors(err));
	})
} 

export const deleteTeam = (team) => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/teams/delete/${team}`, {
		method: 'delete',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		}
	})
}

export const updateTeam = team => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/api/teams/update`, {
		method: 'put',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${authToken}`
		},
		body: JSON.stringify(team)
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(data => dispatch(fetchTeamSuccess(data)))
	.catch(err => {
		dispatch(fetchAllTeamsError(err));
	})
}