import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteData } from '../../modules/api';

export default function Outgoing({ user }) {
	const history = useHistory();

	function handleClick() {
		deleteData(`http://localhost:5000/cancel-request/${user.id}`).then((res) => {
			history.go(0);
		});
	}
	return (
		<li className="collection-item avatar">
			<i class="material-icons circle">person</i>
			<span>{user.username}</span>
			<div className="secondary-content">
				<span className="status  ">pending request</span>
				<a className="btn btn-small btn-flat white  " onClick={handleClick}>
					Cancel request
				</a>
			</div>
		</li>
	);
}
