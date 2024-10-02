import './App.css'
import { useRef, useEffect, useState } from "react";


export default function Chatbox() {
  const message = useRef()
  const [messagelog, Setmessagelog] = useState([{ _id: '404', message: 'server Down' }])
  let id = localStorage.getItem('secretname')
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
    let getmessage = await fetch('https://express-serverside.yourguidance.repl.co/getmessages');
    getmessage = await getmessage.json()
    Setmessagelog(getmessage)
  }

  const SendmessageServer = async () => {
    let sendmess = await fetch('https://express-serverside.yourguidance.repl.co/sendmessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: id, message: message.current.innerText })
    });
    sendmess = await sendmess.json()
    getmess()
  }

  const send = () => {
    SendmessageServer()
    message.current.innerText = ''
  }
  const displaymessages = (items) => {
    return (
      <div key={items._id} className='AI'>
        <p className={items.name !== id ? 'reply' : 'sentmess'}>{items.message}<span className='username'>{items.name}</span></p>
      </div>
    )
  }


  function setFocus() {
    document.getElementById('w-input-text').focus();
  }
  return (
    <>
      <div className="navbar">
        <span>GlobalBox user ({id})</span>
        <select style={{ marginRight: "1rem" }} onChange={close}>
          <option onClick={close}>Logout</option>
          <option>Login</option>
        </select>
      </div>

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
    </>
  )
}