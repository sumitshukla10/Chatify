import React, { useState } from 'react';
import './Join.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';

let user;

const Join = () => {

   const[name,setName]=useState("");

const sendUser=()=>{
    user=document.getElementById('JoinInput').value;
    document.getElementById('JoinInput').value="";
    
    
}

  return (
    <div className='JoinPage'>
       <div className='Joincontainer'>
        <img src={logo} alt="logo" />
        <h1> Chatify </h1>
        <input onChange={(e)=> setName(e.target.value)} placeholder='Enter Your Name' type="text"  id="JoinInput" />
      <Link onClick={(event)=>!name ?event.preventDefault():null} to="./chat"><button onClick={sendUser} className='JoinBtn'>Login In</button></Link>
       </div>
    </div>
  )
}

export default Join
export {user}