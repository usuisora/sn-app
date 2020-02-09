const pool = require('./pool');
const fs = require('fs');

const getUsers = (request, response) => {
	const id = parseInt(request.cookies.id);
	console.log('cookie', request.cookies);
	let authorized = Boolean(id);
	if (!authorized) response.status(500).json({ authorized });
	else
		pool.query(
			`	select pairs.user_1,pairs.username , pairs.user_2, users.username as username_2, state from  (select * from (
				select id,username,user_1,user_2,state
				from Users
				 full Outer Join Friends on Users.id=Friends.user_1) as t where
																	  (user_1=$1 or  user_2=$1)
																	
		 
							)	as pairs  join users on pairs.user_2 = users.id;
								`,
			[ id ],
			(error, friendsResults) => {
				if (error) {
					response.status(500).json({ error, authorized });
				} else {
					pool.query(
						`select
					id , username, Null as state from users where id <> $1 order by state`,
						[ id ],
						(error, usersResults) => {
							console.log(`friendResults.rows`, friendsResults.rows);
							console.log(usersResults.rows);
							let userNames = usersResults.rows.map((user) => user.username);
							console.log(`userNames`, userNames);
							let friends = friendsResults.rows.map((row) => ({
								id: id === parseInt(row.user_1) ? parseInt(row.user_2) : parseInt(row.user_1),
								username: id === parseInt(row.user_1) ? row.username_2 : row.username,
								state: row.state
							}));
							let friendNames = friends.map((friend) => friend.username);
							console.log(`friendNames`, friendNames);
							let anotherNames = userNames.filter((name) => {
								console.log('includes?', !friendNames.includes(name));
								return !friendNames.includes(name);
							});
							console.log(`anotherNames`, anotherNames);
							let another = usersResults.rows.filter((user) => {
								let name = user.username;
								return anotherNames.includes(name);
							});
							console.log('another  ', another);

							let filteredResults = {
								incoming: [],
								outgoing: [],
								friends: [],
								null: [ ...another ]
							};

							friends.forEach((user) => {
								filteredResults[String(user.state)].push(user);
							});

							response.status(200).json(filteredResults);
						}
					);
				}
			}
		);
};

const getFriends = (request, response) => {
	const id = parseInt(request.cookies.id);
	let authorized = Boolean(id);
	pool.query(
		`	select pairs.user_1,pairs.username , pairs.user_2, users.username as username_2, state from  (select * from (
			select id,username,user_1,user_2,state
			from Users
			 full Outer Join Friends on Users.id=Friends.user_1) as t where
																  (user_1=$1 or  user_2=$1)
																
	 
						)	as pairs  join users on pairs.user_2 = users.id;
								`,
		[ id ],
		(error, results) => {
			if (error) {
				response.status(500).json({ error, authorized });
			} else {
				let friendsResults = results.rows.map((row) => ({
					id: id === parseInt(row.user_1) ? parseInt(row.user_2) : parseInt(row.user_1),
					username: id === parseInt(row.user_1) ? row.username_2 : row.username,
					state: row.state
				}));
				let filteredResults = {
					incoming: [],
					outgoing: [],
					friends: []
				};

				friendsResults.forEach((user) => {
					filteredResults[String(user.state)].push(user);
				});

				response.status(200).json(filteredResults);
			}
		}
	);
};

const createRequest = (request, response) => {
	const user_1 = parseInt(request.cookies.id);
	let authorized = Boolean(user_1);
	if (!authorized) {
		response.status(403).json({ authorized });
		return;
	}

	const user_2 = parseInt(request.params.id);
	console.log('user_2', user_2);
	const state = user_1 > user_2 ? 'outgoing' : 'incoming';
	let params = [ user_1, user_2 ].sort();

	pool.query('INSERT INTO friends Values($1,$2,$3);', [ ...params, state ], (error, results) => {
		if (error) {
			response.status(500).json({ error, authorized });
		}
		response.status(201).send({ success: true });
	});
};

const submitRequest = (request, response) => {
	const user_1 = parseInt(request.cookies.id);
	const user_2 = parseInt(request.params.id);
	const authorized = Boolean(user_1);
	console.log('user', user_1);

	if (!authorized) {
		response.status(500).json({ authorized });
		return;
	}
	let params = [ user_1, user_2 ].sort();
	pool.query(
		'UPDATE  friends SET state = $3 WHERE user_1 = $1 and user_2 = $2;',
		[ ...params, 'friends' ],
		(error, results) => {
			if (error) {
				response.status(500).json({ error, authorized });
			}
		}
	);
	response.status(201).send('sucess');
};

const cancelRequest = (request, response) => {
	const user_1 = parseInt(request.cookies.id);
	const user_2 = parseInt(request.params.id);
	const authorized = Boolean(user_1);

	if (!authorized) {
		response.status(403).json({ authorized });
		return;
	}
	let params = [ user_1, user_2 ].sort();
	pool.query('DELETE FROM friends WHERE  user_1 = $1 and user_2 = $2;', [ ...params ], (error, results) => {
		console.log('deleted ', user_1, user_2);
		if (error) {
			response.status(406).json({ error, authorized });
		}
		response.status(200).send(`Success: Request canceled`);
	});
};
const deleteFromFriends = (request, response) => {
	const user_1 = parseInt(request.cookies.id);
	const user_2 = parseInt(request.params.id);
	const authorized = Boolean(user_1);
	if (!authorized) {
		response.status(500).json({ authorized });
		return;
	}
	const status = user_1 > user_2 ? 'incoming' : 'outgoing';
	let params = [ user_1, user_2 ].sort();
	pool.query(
		'UPDATE  friends SET state = $3 WHERE user_1 = $1 and user_2 = $2;',
		[ ...params, status ],
		(error, results) => {
			if (error) {
				response.status(500).json({ error, authorized });
			}
		}
	);
	response.status(201).send('sucess');
};

const initDatabase = () => {
	const sql = fs.readFileSync('../database/init_Database.sql').toString();
	pool.query(sql, (error, results) => {
		if (error) {
			console.log({ msg: 'DB already exist' });
		} else console.log({ msg: 'DB inited' });
	});
};

const login = (request, response) => {
	let { login, password } = request.cookies;
	if (!password || !login) {
		login = request.body.login;
		console.log(`password`, password);
	}
	pool.query('SELECT * FROM users  WHERE login = $1 and password = $2', [ login, password ], (error, results) => {
		if (error || results.rows.length === 0) {
			response.status(405).json({ error, isAuthenticated: false });
		} else {
			[ user ] = results.rows;
			console.log(user);
			response
				.cookie('id', results.rows[0].id)
				.cookie('username', results.rows[0].username)
				.cookie('login', results.rows[0].login)
				.cookie('password', results.rows[0].password)
				.status(200)
				.json({ isAuthenticated: true });
		}
	});
};

const signout = (request, response) => {
	console.log(request.cookies.id);
	[ ('id', 'username', 'password', 'login') ].forEach((cookie) => response.clearCookie(cookie));
	response.status(200).send({ success: true });
};
module.exports = {
	getUsers,
	getFriends,
	createRequest,
	cancelRequest,
	submitRequest,
	deleteFromFriends,
	initDatabase,
	login,
	signout
};
