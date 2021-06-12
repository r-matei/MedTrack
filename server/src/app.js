const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {cors: {
  origin: true,
  credentials: true
}})

const {Message} = require('./models')

let users = [];
 
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

require('./passport')

require('./routes')(app)

io.on("connection", (socket) => {

    socket.on('disconnect', () => {
        console.log("A user disconnected");
        users = users.filter((user) => user.socket != socket)
    })

    socket.on('chat-message', (data) => {
      const receiver = users.find((user) => user.id == data.to)
      if (receiver) {
        receiver.socket.emit('chat-message', (data));
      }
      try {
        Message.create(data)
        console.log("message created")
      } catch (err) {
        console.log(err)
      }
    })

    socket.on('joined', (data) => {
       users.push({socket, id: data})
       console.log("logged in user", data)
    })

})

sequelize.sync() // {force: true} to delete all tables from database
  .then(() => {
    http.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
