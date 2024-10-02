import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Homepage() {
  const roomname = useRef()
  const password = useRef()
  const roomnamecreate = useRef()
  const roomnamepass = useRef()
  const navigate = useNavigate();

  let id = localStorage.getItem('secretname')
  if (!id) {
    window.location.href = '/'
  }

  const createRoom = async () => {
    const persrom = roomnamecreate.current.value
    const persrompass = roomnamepass.current.value
    if (persrom === '' && persrompass === '') { alert('Please fill the details correctly') }
    else {
      let data = await fetch('https://express-serverside.yourguidance.repl.co/createroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'name': persrom, 'pass': persrompass, 'user': id }, body: JSON.stringify()
      });
      if (data.status >= 250) {
        alert('Please use diffrent roomname')
      }
      else {
        alert('your room has been created successfully ' + persrom)
      }
    }
  }
  const checkinfo = async () => {
    const roomnameValue = roomname.current.value
    const passwordValue = password.current.value

    Cookies.set('roomname', roomnameValue);
    Cookies.set('password', passwordValue);

    let data = await fetch('https://express-serverside.yourguidance.repl.co/getroommessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'roomname': roomname.current.value, 'password': password.current.value }, body: JSON.stringify()
    });
    data = await data.json()
    if (data[0].chatroomname) {
      console.log(data);
      navigate('/PersonalChatRoom')
    }
    else {
      alert(data)
    }
  }

  return (
    <>
      <div className='insidelogin'>
        <h1>Global ChatBox</h1>
        <div style={{ border: '1px solid black', padding: '1rem' }}>
          <Link to='/chatbox'>
            <button style={{ margin: '1rem', width: '15vh', height: '5vh', borderRadius: '10px' }}>Enter</button>
          </Link>
        </div>
      </div>
      <div className='insidelogin'>
        <h1>Create Room</h1>

        <div style={{ border: '1px solid black', padding: '0rem' }}>
          <input type='text' placeholder='Your RoomName (case sensetive)' style={{ margin: '1rem', width: '30vw', height: '3vh', borderRadius: '10px', padding: '10px' }} ref={roomnamecreate} ></input>
          <br />
          <input type='password' placeholder='Your Room Password' style={{ margin: '0rem', width: '30vw', height: '3vh', borderRadius: '10px', padding: '10px' }} ref={roomnamepass}></input><br />
          <button style={{ margin: '1rem', width: '15vh', height: '5vh', borderRadius: '10px' }} onClick={createRoom}>Enter</button>

        </div>
      </div>

      <div className='insidelogin'>
        <h1>Join Room</h1>
        <div style={{ border: '1px solid black', padding: '0rem' }}>
          <input type='text' placeholder='Your RoomName (case sensetive)' style={{ margin: '1rem', width: '30vw', height: '3vh', borderRadius: '10px', padding: '10px' }} ref={roomname}></input>
          <br />
          <input type='password' placeholder='Your Room Password' style={{ margin: '0rem', width: '30vw', height: '3vh', borderRadius: '10px', padding: '10px' }} ref={password}></input><br />
          <button style={{ margin: '1rem', width: '15vh', height: '5vh', borderRadius: '10px' }} onClick={checkinfo}>Enter</button>
        </div>
      </div>
      <br></br>
    </>
  )
};

