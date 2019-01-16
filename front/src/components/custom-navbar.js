import React from 'react';
import ResponsiveMenu from 'react-responsive-navbar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { IoIosCloseCircleOutline } from 'react-icons/io';

class CustomNavbar extends React.Component {
	render() {
		return (
			<ResponsiveMenu
				menuOpenButton={<TiThMenu />}
				menuCloseButton={<IoIosCloseCircleOutline />}
				changeMenuOn="800px"
				largeMenuClassName="large-menu-classname"
				smallMenuClassName="small-menu-classname"
				menu={
					<ul className="navbar-list">
						<Link className="link right-side-link" to={'/register-player'}>Register</Link>
						<Link className="link right-side-link" to={'/register'}>My Team</Link>
						<Link className="link right-side-link" to={'/register'}>Schedule</Link>
						<Link className="link right-side-link" to={'/register'}>Standings</Link>
						<Link className="link right-side-link" to={'/register'}>League</Link>
						<Link className="link right-side-link" to={'/register'}>My Account</Link>
						<Link className="link right-side-link" to="/" onClick={e => this.handleClick(e)}>Logout</Link>
					</ul>
				}
			/>
		)
	}
}


const mapStateToProps = state => ({
	user: state.auth.currentUser !== null,
	loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(CustomNavbar);