const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

// DATABASE
const mongoose = require('mongoose');
console.log(config.mongoURI);
const connect = mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// SET UP SERVER
console.log('setup server');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// SET UP ROUTES
app.get('/', (req, res) => {
	res.send('Hi there!');
});
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/store', require('./routes/store'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// START SERVER
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server Running at ${port}`);
});
