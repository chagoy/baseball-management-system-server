import { FETCH_GAMES_SUCCESS, FETCH_GAMES_ERROR, SELECTED_GAME_SUCCESS } from '../actions/games'


const initialState = {
	games: {},
	game: null,
	error: null
}

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_GAMES_SUCCESS) {
		return Object.assign({}, state, {
			games: action.games
		})
	} else if (action.type === FETCH_GAMES_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		})
	} else if (action.type === SELECTED_GAME_SUCCESS) {
		return Object.assign({}, state, {
			game: action.game
		})
	}
	return state;
}