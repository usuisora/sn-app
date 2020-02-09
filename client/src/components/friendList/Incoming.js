import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteData, updateData } from '../../modules/api';

export default function Incoming({ user }) {
	const history = useHistory();

	function handleAccept() {
		updateData(`http://localhost:5000/submit-friend/${user.id}`).then((res) => {
			console.log(res);
			history.go(0);
		});
	}

	function handleIgnore() {
		deleteData(`http://localhost:5000/cancel-request/${user.id}`, {}).then((res) => {
			console.log(res);
			history.go(0);
		});
	}
	return (
		<li className="collection-item avatar ">
			<i class="material-icons circle">person</i>
			<span>{user.username}</span>
			<div className="secondary-content">
				<a className="btn btn-small btn-flat blue lighten-3 " onClick={handleAccept}>
					Accept
				</a>
				<a className="btn btn-small btn-flat white lighten-2 " onClick={handleIgnore}>
					Ignore
				</a>
			</div>
		</li>
	);
}
