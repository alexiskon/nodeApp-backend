const express = require('express')
const {
    update
} = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')
const Tasks = require('../models/tasks')
const {
    query
} = require('express')

//-----------------tasks-----------------------//

//post task
router.post('/tasks', async (req, res) => {
    try {
        const task = new Tasks(req.body) //mongoose auto handles promises
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get tasks
//limit=10&skip=0 fetches the first page 0f 10 items in pagination
//limit=10&skip=10 fetches the second page 0f 10 items in pagination
//sort by date or completed
router.get('/tasks', async (req, res) => {
    const match = {} //filtering object

    //----pagination parameters----//
    const l = parseInt(req.query.limit) || 0
    const s = parseInt(req.query.skip) || 0

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.description) {
        match.description = req.query.description
    }
    if (req.query.colaborators) {
        match.colaborators = req.query.colaborators
    }
    if (req.query.projectName) {
        match.projectName = req.query.projectName
    }

    //-------sorting parameters------------//
    //tasks/?sortBy=createdAt:desc
    const sorting = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sorting[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }


    console.log(match, l, s)
    try {
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get tasks by id
router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(404).send(e)
    }
})

//update tasks
router.patch('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const updates = Object.keys(req.body)
        // const thingtb = await thingsToBuy.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true}) //new: true returns to const thingstb the new value
        const task = await Tasks.findById(_id)

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

//delete tasks
router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Tasks.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router