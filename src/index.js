const express = require('express')
const cors = require('cors')

const app = express()
app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://alexiskon.github.io/');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

require('./db/mongoose') //load in the database
//load the models
const User = require('./models/user')
const tasks = require('./models/tasks')
  
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