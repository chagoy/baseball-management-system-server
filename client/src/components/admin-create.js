import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TeamForm from './team-form';
import SeasonForm from './season-form';
import GameForm from './game-form';
import PostForm from './post-form';
import { getAllTeams } from '../actions/teams';
import Loading from './loading';
import GameForm2 from './game-form2';

class AdminCreate extends React.Component {
	componentDidMount() {
		if (this.props.loggedIn) {
			return <Redirect to="/" />;
		} else {
			return this.props.dispatch(getAllTeams())
		}
	}	

	render() {
		let gameForm = this.props.teams.length > 0 ? <GameForm teams={this.props.teams} /> : <Loading />;
		return (
			<div className="create">
				<PostForm />
				<TeamForm />
				<SeasonForm />
				<GameForm2 />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	teams: state.team.teams
})

export default connect(mapStateToProps)(AdminCreate);