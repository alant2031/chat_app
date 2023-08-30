import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './Chat';

const server = import.meta.env.VITE_HOST;
console.log(server);
const socket = io(`http://${server}:3001`);

function App() {
	const [userName, setUserName] = useState('');
	const [room, setRoom] = useState('');
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (userName !== '' && room !== '') {
			socket.emit('join_room', room);
			setShowChat(true);
		} else {
			alert('Preencha Username e Room ID');
		}
	};

	return (
		<div className="App">
			{showChat ? (
				<Chat socket={socket} userName={userName} room={room} />
			) : (
				<div className="joinChatContainer">
					<h3>Join Chat</h3>
					<input
						type="text"
						placeholder="Username"
						onChange={(ev) => {
							setUserName(ev.target.value);
						}}
					/>
					<div className="select">
						<select
							onChange={(ev) => {
								setRoom(ev.target.value);
							}}
						>
							<option value="">-- Select Room ID --</option>
							<option className="valid" value="apple">
								Apple
							</option>
							<option className="valid" value="kiwi">
								Kiwi
							</option>
							<option className="valid" value="mango">
								Mango
							</option>
							<option className="valid" value="lemon">
								Lemon
							</option>
							<option className="valid" value="peach">
								Peach
							</option>
						</select>
					</div>

					<button onClick={joinRoom}>Join a Room</button>
				</div>
			)}
		</div>
	);
}

export default App;
