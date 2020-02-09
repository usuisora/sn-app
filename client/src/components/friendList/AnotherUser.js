import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

async function postData(url, body) {
	let res = await axios.post(url, body, { withCredentials: true });
	let data = await res.data;
	return await data;
}

export default function AnotherUser({ user }) {
	const history = useHistory();
	function handleClick() {
		console.log(user);
		postData(`http://localhost:5000/request-friendship-to/${user.id}`).then((res) => {
			console.log(res);
			history.go(0);
		});
	}
	return (
		<li className="collection-item avatar">
			<i class="material-icons circle black">person</i>
			<span> {user.username}</span>
			<button className="btn btn-small btn-flat blue lighten-3  right " onClick={handleClick}>
				Add to friend
			</button>
		</li>
	);
}
