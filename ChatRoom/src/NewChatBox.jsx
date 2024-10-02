import './App.css'
import { useRef, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Chatbox() {
  const message = useRef()
  const [messagelog, Setmessagelog] = useState([{ _id: '404', message: 'server Down' }])
  let id = localStorage.getItem('secretname')
  const roomnameValue = Cookies.get('roomname');
  const passwordValue = Cookies.get('password');
  if (!id) {
    window.location.href = '/'
  }

  useEffect(() => {
    getmess()
  }, [messagelog])

  useEffect(() => {
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [message.current])

  const close = () => {
    window.location.href = '/'
  }



  const getmess = async () => {
    let data = await fetch('https://express-serverside.yourguidance.repl.co/getroommessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'roomname': roomnameValue, 'password': passwordValue }, body: JSON.stringify()
    });
    data = await data.json()

    if (data[0].chatroomname) {
      Setmessagelog(data[0].message)
    }
    else {
      alert(data)
    }
  }

  const SendmessageServer = async () => {
    let data = await fetch('https://express-serverside.yourguidance.repl.co/joinroom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'roomname': roomnameValue, 'password': passwordValue }, body: JSON.stringify({
        "message": message.current.innerText,
        'user': id
      })
    });
  }

  const send = () => {
    SendmessageServer()
    message.current.innerText = ''
  }
  const displaymessages = (items) => {
    return (
      <div key={items._id} className='AI'>
        <p className={items.sender !== id ? 'reply' : 'sentmess'}>{items.content}<span className='username'>{items.sender}</span></p>
      </div>
    )
  }

  function setFocus() {
    document.getElementById('w-input-text').focus();
  }

  return (
    <>
      <div className='chatbox' id='chatbox'>
        <hr></hr>
        <div id='AI'>
          {messagelog && messagelog.map((items) => {
            return displaymessages(items)
          })}
        </div>
      </div>

      <div style={{ display: 'inline-flex' }} className='input-container1'>
        <div id="w-input-container" onClick={setFocus}>
          <div className="w-input-text-group">
            <div id="w-input-text" contentEditable ref={message}></div>
            <div className="w-placeholder">
              Type a message
            </div>
          </div>
        </div>
        <button className="buttonsub" onClick={send} type="button"></button>
      </div>
      {/* <div className="input-container">
        <input className="messagebox" type="text" ref={message} placeholder="Enter your message here" />
        <button className="buttonsub" onClick={send} type="button"></button>
      </div> */}
    </>
  )
}