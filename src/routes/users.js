const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


//--------------------Users---------------------//

//post users
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body) //mongoose auto handles promises
        await user.save()
        const token = await user.generateAuthToken()
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.status(201).send({
            user: user.getPublicProfile(),
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//get user
router.get('/users/me', auth, async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/me');
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.send(req.user)
})

//get user by id
router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/:id');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send(user.getPublicProfile())
    } catch (e) {
        res.status(500).send(e)
    }
})

//update users
router.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true}) //new: true returns to const user the new value
        // using save method to take adnvantage of schema pre 'save' and hash password if updated

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/me');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send(req.user.getPublicProfile())
    } catch (e) {
        res.status(400).send()
    }
})

//delete users
router.delete('/users/me', auth, async (req, res) => {
    try {
        const _id = req.user._id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/me');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send(user.getPublicProfile())
    } catch (e) {
        res.status(500).send()
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/login');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send({
            user: user.getPublicProfile(),
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.header('Access-Control-Allow-Origin', 'https://alexiskon.github.io/users/logout');
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router