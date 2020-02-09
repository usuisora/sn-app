import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { fakeAuth } from '../modules/PrivateRoute';

export default function Login() {
	const [ state, setState ] = useState({
		login: '',
		password: ''
	});
	const [ redirect, setRedirect ] = useState(false);
	const [ failLogin, setFailLogin ] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value
		});
	};

	useEffect(function() {
		fakeAuth.authenticate(
			{},
			() => {
				setRedirect(true);
			},
			() => {}
		);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		fakeAuth.authenticate(
			state,
			() => {
				fakeAuth.isAuthenticated = true;
				setRedirect(true);
			},
			() => {
				setFailLogin(true);
			}
		);
	};
	if (redirect === true) {
		return <Redirect to={{ pathname: '/' }} />;
	}
	return (
		<form className="login s6">
			<input placeholder="login" name="login" type="text" onChange={handleInputChange} />
			<input placeholder="password" name="password" type="password" onChange={handleInputChange} />
			<button className="btn btn-flat white blue-text" type="submit" onClick={handleSubmit}>
				Sign In
			</button>
			{failLogin && <div className="center  red-text">Wrong credentials.</div>}
		</form>
	);
}
