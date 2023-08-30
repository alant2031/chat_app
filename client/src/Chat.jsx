import ScrollToBottom from 'react-scroll-to-bottom';
import { useEffect, useState, memo } from 'react';

const Chat = ({ socket, userName, room }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: userName,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};
			await socket.emit('send_message', messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage('');
		}
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, []);
	return (
		<div className="chat-window">
			<h3
				style={{
					textTransform: 'capitalize',
				}}
			>
				{room} Room
			</h3>
			<div className="chat-header">
				<p>Live Chat</p>
			</div>
			<div className="chat-body">
				<ScrollToBottom className="message-container">
					{messageList.map((messageContent) => {
						return (
							<div
								className="message"
								id={
									messageContent.author === userName
										? 'you'
										: 'other'
								}
							>
								<div>
									<div className="message-content">
										<p>{messageContent.message}</p>
									</div>
									<div className="message-meta">
										<p id="time">{messageContent.time}</p>
										<p id="author">
											{messageContent.author}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</ScrollToBottom>
			</div>
			<div className="chat-footer">
				<input
					type="text"
					value={currentMessage}
					onChange={(ev) => setCurrentMessage(ev.target.value)}
					onKeyDown={(ev) => {
						ev.key === 'Enter' && sendMessage();
					}}
				/>
				<button onClick={sendMessage}>▶</button>
			</div>
		</div>
	);
};

export default Chat;
