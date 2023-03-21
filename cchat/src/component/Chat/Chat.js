import React, { useEffect, useState } from 'react'
import{user} from '../Join/Join';
import socketIO from 'socket.io-client';
import './Chat.css';
import sendlogo from '../../images/sendlogo.png';
import Message from  '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png';

let socket;

const  ENDPOINT='http://localhost:4500/';

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setmessages] = useState([]);
   const send=()=>{
    const message=document.getElementById('ChatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('ChatInput').value="";
   }
    
     
    useEffect(() => {
         socket =socketIO(ENDPOINT , { transports:['websocket'] });
        socket.on('connect',()=>{
          
            setid(socket.id);
        })
      socket.emit('joined',{user})

      socket.on('welcome',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })
      socket.on('user joined', (data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })
      socket.on('leave',(data)=>{
        setmessages([...messages,data]);
        console.log(data)
      })
      return () => {
        socket.emit('disconnects');
        socket.off();
      }
    }, [])

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message,data.id);
      })
    
      return () => {
        socket.off();
      }
    },[messages])
    
    
    
  return (
    <div className='ChatPage'>
    <div className='ChatContainer'>
   <div className='header'>
    <h2> CHATIFY MADE WITH 🧡 </h2>
   <a href="/"> <img src={closeIcon} alt="close" /> </a>
   </div>
   <ReactScrollToBottom className='ChatBox'>
    {messages.map((item, i) => <Message user={item.id===id?'':'item.user'} message={item.message} classs={item.id===id?'right':'left'}/>)}
   </ReactScrollToBottom>
   <div className='InputBox'>
    <input onKeyPress={(event)=>event.key==='Enter'?send():null} type="text"  id="ChatInput" />
    <button onClick={send} className='SendBtn'><img src={sendlogo} alt="sendlogo" /></button>
   </div>
    </div>
       
    </div>
  )
}

export default Chat