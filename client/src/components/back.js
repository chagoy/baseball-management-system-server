import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

export class Back extends React.Component {
	render() {
		return (
            <Link to="/">Back</Link>
		);
	}
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser !== null,
        user: state.auth.currentUser
    }
};

export default connect(mapStateToProps)(Back);