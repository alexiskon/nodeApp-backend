const express = require('express')
const cors = require('cors')

require('./db/mongoose') //load in the database
//load the models
const User = require('./models/user')
const tasks = require('./models/tasks')
//

const app = express()
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(express.json()) //auto parse incoming json to object

//load the routes
const tasksRouter = require('./routes/tasks')
const usersRouter = require('./routes/users')

app.use(usersRouter)
app.use(tasksRouter)

const port = process.env.PORT || 3000 //port cofiguration

//Start the server
app.listen(port, () => {
    console.log('server is up on port: ' + port)
})