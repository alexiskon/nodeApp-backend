const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log(req.header)

        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, 'nodeapp')
        const user = await User.findOne({ _id: decoded._id, 'token': token })
        console.log(token)
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authanticate'})
    }
}

module.exports = auth