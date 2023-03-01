import { memo, useCallback, useState } from 'react';
import io from "socket.io-client"
import './App.css'
import Chat from './Chat';

const socket = io("http://localhost:3001")

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {
        showChat ? 
        <Chat socket={socket} userName={userName} room={room} /> : 
        
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input type="text" placeholder='Username' onChange={(ev) => {setUserName(ev.target.value)} }/>
          <input type="text" placeholder='Room ID' onChange={(ev) => {setRoom(ev.target.value)} }/>
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      
      }
    </div>
  )
}

export default App
