const mongoose = require('mongoose')
const chat = require('../Model/Chat')
const chatroom = require('../Model/chatroom')

exports.sendmessage = async (req, res) => {
  var message = new chat({ name: req.body.name, message: req.body.message })
  message = await message.save()
  if (message) {
    res.json(message)
  }
  else {
    res.json('error')
  }
}


exports.getmessage = async (req, res) => {
  var getmess = await chat.find()
  if (getmess) {
    res.json(getmess)
  }
  else {
    res.json('no data')
  }
}



exports.createroom = async (req, res) => {
  try {
    let roomname = req.header('name');
    let pass = req.header('pass');
    let message = req.header('message');
    let user = req.header('user');
    
    if (!message) {
      message = `${user} has created ${roomname}`;
    }
      var data = await chatroom.find({ chatroomname: roomname, password: pass }).select("-message")
      if (data.length>=1) {
        console.log('room not created')
      return res.status(400).json({ error: 'Duplicate Room.' });
      }
      else{
      const data = new chatroom({
      chatroomname: roomname,
      password: pass,
      message: [{ content: message, sender: user }],
      });
      const savedData = await data.save();
      res.json(savedData);   
     } 
    }
    catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while creating the room.' });
  }
};




exports.sendroommess = async (req, res) => {
  let name = req.name
  let pass = req.pass
  let message = req.body.message
  let user = req.body.user
  if (!message) { message = `${user} has joined` }

  let sendingmessage = await chatroom.updateOne(
    { chatroomname: name },
    {
      $push: {
        message: {
          content: message,
          sender: user
        }
      }
    }
  )
  if (sendingmessage.acknowledged === true) {
    res.json(sendingmessage)
  }
  else {
    res.json('failed')
  }
}

exports.getroommess = async (req, res) => {
  let name = req.name
  let pass = req.pass
  const data = await chatroom.find({ chatroomname: name, password: pass }).select("-password");
  if (data.length >= 1) { res.json(data) }
  else {
    res.json('error')
  }
}