const express = require('express');
require('dotenv').config();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
app.use(cors());
const port = 3001;
const client = process.env.CLIENT;
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: `http://${client}:5173`,
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('User Connected: ' + socket.id);

	socket.on('join_room', (data) => {
		socket.join(data);
		console.log('User with ID: ' + socket.id + ' joined room: ' + data);
	});

	socket.on('send_message', (data) => {
		console.log(data);
		socket.to(data.room).emit('receive_message', data);
	});

	socket.on('disconnect', () =>
		console.log('User Disconnected: ' + socket.id),
	);
});

server.listen(port, () => console.log(`Server running on port ${port}`));
