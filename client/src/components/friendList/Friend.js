import React from 'react';
import { updateData } from '../../modules/api';
import { useHistory } from 'react-router-dom';

export default function Friend({ user }) {
	const history = useHistory();

	const handleClick = () => {
		updateData(`http://localhost:5000/del-from-friends/${user.id}`, {}).then((res) => {
			history.go(0);
		});
	};

	return (
		<li className="collection-item avatar  lighten-2">
			<i class="material-icons circle ">person</i>
			<span>{user.username}</span>
			<div className="secondary-content">
				<span className="status green-text">friends</span>
				<button className="btn btn-small btn-flat white " onClick={handleClick}>
					Remove friend
				</button>
			</div>
		</li>
	);
}
