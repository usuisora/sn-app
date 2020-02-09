import React from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton } from './SignOutButton';
import { fakeAuth } from '../modules/PrivateRoute';

export default function Navbar() {
	return (
		<React.Fragment>
			{!fakeAuth.isAuthenticated && (
				<nav className="blue lighten-3 black-text">
					<div className="nav-wrapper ">
						<ul>
							<li>
								<Link to="/">Users</Link>
							</li>
							<li>
								<Link to="/friends">Friends</Link>
							</li>
							<li className="right">
								<SignOutButton />
							</li>
						</ul>
					</div>
				</nav>
			)}
		</React.Fragment>
	);
}
