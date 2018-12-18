import {
	FETCH_PROTECTED_DATA_SUCCESS,
	FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
	players: [],
	error: null
};

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
		return Object.assign({}, state, {
			players: action.players
		});
	} else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	}
	return state;
}