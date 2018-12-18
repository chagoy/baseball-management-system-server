import { FETCH_PLAYER_SUCCESS, FETCH_PLAYER_ERROR, UPDATE_PLAYER_DIVISION, UPDATE_PLAYER_NOTES, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_ERROR } from '../actions/players';

const initialState = {
	player: {},
	error: null
}

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_PLAYER_SUCCESS) {
		return Object.assign({}, state, {
			player: action.player,
		});
	} else if (action.type === FETCH_PLAYER_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if (action.type === UPDATE_PLAYER_DIVISION) {
		return Object.assign({}, state, {
			player: action.player,
		});
	} else if (action.type === UPDATE_PLAYER_NOTES) {
		return Object.assign({}, state, {
			player: action.player
		})
	} else if (action.type === FETCH_PLAYERS_SUCCESS) {
		return Object.assign({}, state, {
			players: action.players
		});
	} else if (action.type === FETCH_PLAYERS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	}
	return state;
}