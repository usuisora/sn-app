import React from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import FriendList from './components/FriendList';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './modules/PrivateRoute';

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<PrivateRoute path="/" exact component={UserList} />
					<PrivateRoute path="/friends" component={FriendList} />
					<Route path="/sign-in" render={(props) => <SignIn {...props} />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
