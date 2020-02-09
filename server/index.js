const app = require('express')({});
const db = require('./queries');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 5000;

const corsy = cors({
	credentials: true,
	origin: true
});
app.use(corsy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.options('*', corsy);

app.get('/check', (req, res) => {
	res.end(req.cookies.name);
});
app.get('/savecookies', (req, res) => {
	res.cookie('name4', 'bob4');
	res.end('wow');
});
app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express, and Postgres API' });
});

db.initDatabase();

app.post('/login', db.login);
app.post('/signout', db.signout);
app.get('/users', db.getUsers);
app.get('/friends', db.getFriends);

app.post('/request-friendship-to/:id', db.createRequest);
app.put('/submit-friend/:id', db.submitRequest); //

app.delete('/cancel-request/:id', db.cancelRequest);
app.put('/del-from-friends/:id', db.deleteFromFriends);

app.listen(port, () => {
	console.log(`Webserver is set on port ${port}`);
});
