const express = require('express')
const cors = require('cors')
require('./db/mongoose') //load in the database
//load the models
const User = require('./models/user')
const tasks = require('./models/tasks')
//
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')


const app = express()
app.use(express.json()) //auto parse incoming json to object
//load the routes
app.use(usersRouter)
app.use(tasksRouter)
app.use(cors())

app.all('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
})

const port = process.env.PORT || 3000 //port cofiguration

//Start the server
app.listen(port, () => {
    console.log('server is up on port: ' + port)
})