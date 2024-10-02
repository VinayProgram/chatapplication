import './App.css'
export default function Navbar() {
    let id = localStorage.getItem('secretname')
  return (
    <div style={{ display: "flex", backgroundColor: 'black', height: "7vh" }} className='navbar'>
      <div style={{ justifyContent: 'left', width: '40vw', marginRight: '1rem', marginLeft: '10px' }}>
        <h5 className="effect" >Chatbox ({id})</h5>
      </div>
      <div style={{ display: 'inline-flex', width: '30vh', marginLeft: '18vw', marginTop: '1vh' }}>
        <a className='fa fa-facebook' href='/e'>Login</a>
        <a className='fa fa-youtube'>Logout</a>
        <a className='fa fa-github'>GlobalChat</a>
        <a className='fa linkdin'>Home</a>
        <a className='fa fa-whatsapp' href='https://wa.me/7666949043'></a>
      </div>
    </div>
  )
}
