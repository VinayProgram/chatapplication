const chatroom = require('./Model/chatroom')
const auth = async (req, res, next) => {
  let name = req.header('roomname')
  let pass = req.header('password')
  if (name && pass) {
    var data = await chatroom.find({ chatroomname: name, password: pass }).select("-message")
    if (data.length >= 1) {
      req.name = name
      req.pass = pass
      next()
    }
    else {
      res.json('No Such Room')
    }
  }
  else {
    res.json('You dont have roomid and password')
  }
}

module.exports = auth