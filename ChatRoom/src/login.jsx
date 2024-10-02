import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";

export default function Login() {
  const name = useRef()

  const save = () => {
    localStorage.setItem('secretname', name.current.value)
  }
  return (
    <div className='insidelogin' style={{ marginTop: '20vh' }}>
      <h1>Global ChatBox</h1>
      <div style={{ border: '1px solid black', padding: '0rem' }}>
        <h4>Your Secret name that's what needed?</h4>
        <form>
          <input type='text' ref={name} style={{ margin: '1rem', width: '30vw', height: '3vh', borderRadius: '10px', padding: '10px' }} placeholder='your name' required />
          <br />
          <Link to='/Homepage' onClick={save}>
            <button style={{ margin: '1rem', width: '15vh', height: '3vh', borderRadius: '10px' }}>Save</button>
          </Link>
        </form>
      </div>
      </div>
  )
};

