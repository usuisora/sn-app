import React from 'react';
import Friend from './friendList/Friend';
import Outgoing from './friendList/Outgoing';
import Incoming from './friendList/Incoming';
import useFetch from '../modules/useFetch';

export default function FriendList() {
	const { data, loading } = useFetch('http://localhost:5000/friends');

	return (
		<React.Fragment>
			{loading ? (
				<div className="loading">
					<i className="material-icons center prefix">autorenew</i>
				</div>
			) : (
				<div className="friend-list ">
					<h4>Pending Requests</h4>
					{data.incoming.length !== 0 ? (
						<React.Fragment>
							<ul className="collection  with-header">
								<h5>Incoming</h5>

								{data.incoming.map((user) => <Incoming user={user} />)}
							</ul>
						</React.Fragment>
					) : (
						<div className="btn-flat disabled">No incoming requests</div>
					)}

					{data.outgoing.length !== 0 ? (
						<React.Fragment>
							<ul className="collection with-header ">
								<h5 className="collection-header">Outgoing</h5>
								{data.outgoing.map((user) => <Outgoing user={user} />)}
							</ul>
						</React.Fragment>
					) : (
						<div className="btn-flat disabled">No incoming requests</div>
					)}

					{data.friends.length !== 0 ? (
						<React.Fragment>
							<ul className="collection with-header ">
								<h5 className="collection-header">Friends</h5>
								{data.friends.map((user) => <Friend user={user} />)}
							</ul>
						</React.Fragment>
					) : (
						<div class="btn-flat disabled">No incoming requests</div>
					)}
				</div>
			)}
		</React.Fragment>
	);
}

/* <h5>Outgoing</h5>
<ul>{data.outgoing.map((user) => <Outgoing user={user} />)}</ul>

<h1>Friends</h1>
<ul>{data.friends.map((user) => <Friend user={user} />)}</ul> */
