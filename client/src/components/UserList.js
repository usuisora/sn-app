import React, { useState, useEffect } from 'react';
import AnotherUser from './friendList/AnotherUser';
import Friend from './friendList/Friend';
import Incoming from './friendList/Incoming';

import useFetch from '../modules/useFetch';
import Outgoing from './friendList/Outgoing';

function categorize(data) {
	let filteredResults = {
		incoming: [],
		outgoing: [],
		friends: [],
		null: []
	};
	data.forEach((user) => {
		filteredResults[String(user.state)].push(user);
	});
	return filteredResults;
}

export default function UserList() {
	const { loading, data } = useFetch('http://localhost:5000/users');
	const [ filtered, setFiltered ] = useState({
		incoming: [],
		outgoing: [],
		friends: [],
		null: []
	});
	useEffect(
		() => {
			setFiltered(data);
		},
		[ data ]
	);
	function searchHandler(e) {
		const flatFiltered = Object.values(data)
			.flat()
			.filter((user) => !user.username.toLowerCase().indexOf(e.target.value.toLowerCase()));
		setFiltered(categorize(flatFiltered));
	}

	return (
		<React.Fragment>
			{loading ? (
				<div className="loading">
					<i className="material-icons center prefix">autorenew</i>
				</div>
			) : (
				<div className="user-list">
					<div className="input-field col s6">
						<i className="material-icons prefix">search</i>
						<input onChange={searchHandler} placeholder="Search" />
					</div>
					<ul className="collection with-header">
						<li className="collection-header">
							<h4>Users</h4>
						</li>
						{filtered.incoming.map((user) => <Incoming user={user} key={user} />)}
						{filtered.outgoing.map((user) => <Outgoing user={user} key={user} />)}
						{filtered.friends.map((user) => <Friend user={user} key={user} />)}
						{filtered['null'].map((user) => <AnotherUser user={user} key={user} />)}
					</ul>
				</div>
			)}
		</React.Fragment>
	);
}
