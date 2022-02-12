const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.use(routes);

let messages = [];

io.on('connection', socket => {
	console.log(`Cliente conectado: ${socket.id}`);

	socket.emit('previousMessages', messages);

	socket.on('sendMessage', data => {

		messages.push(data);
		socket.broadcast.emit('receivedMessage', data);

	});
});

server.listen(3000, () => console.log('Rodando'));

