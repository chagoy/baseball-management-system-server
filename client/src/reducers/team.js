import { FETCH_TEAM_SUCCESS, FETCH_TEAM_ERROR, FETCH_ALL_TEAMS_SUCCESS, FETCH_ALL_TEAMS_ERROR, FETCH_ALL_TEAMS_LOADING, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_ERROR} from '../actions/teams';
import { UPDATE_TEAM_SUCCESS } from '../actions/players';

const initialState = {
	team: {},
	teams: [],
	standings: {},
	error: null,
	loading: false
}

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_TEAM_SUCCESS) {
		return Object.assign({}, state, {
			team: action.team
		});
	} else if (action.type === FETCH_TEAM_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if (action.type === FETCH_ALL_TEAMS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if (action.type === FETCH_ALL_TEAMS_LOADING) {
		return Object.assign({}, state, {
			loading: true
		})
	} else if (action.type === FETCH_ALL_TEAMS_SUCCESS) {
		return Object.assign({}, state, {
			teams: action.teams,
			loading: false
		});
	} else if (action.type === UPDATE_TEAM_SUCCESS) {
		return Object.assign({}, state, {
			team: action.team
		});
	} else if (action.type === FETCH_STANDINGS_SUCCESS) {
		return Object.assign({}, state, {
			standings: action.standings
		})
	} else if (action.type === FETCH_STANDINGS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		})
	}
	return state;
}