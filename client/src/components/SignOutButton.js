import React from 'react';
import { fakeAuth } from '../modules/PrivateRoute';

import { withRouter } from 'react-router-dom';

export const SignOutButton = withRouter(
	({ history }) =>
		fakeAuth.isAuthenticated ? (
			<button
				className="btn btn-small white-text btn-flat"
				onClick={() => {
					fakeAuth.signout(() => history.push('/'));
				}}
			>
				Sign out
			</button>
		) : (
			<span disabled className="btn btn-flat disabled">
				Sign
			</span>
		)
);
