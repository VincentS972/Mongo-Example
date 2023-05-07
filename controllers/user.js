const router = require('express').Router()
const User = require('../models/user')

// GET retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error retrieving users '})
    }
})

// POST create user
router.post('/', async (req, res) => {
    try {
        // const { username, email, age, location } = req.body
        const createdUser = await new User(req.body).save()
        res.json(createdUser)
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error creating users' })
    }
}) 

// GET user by username
router.get('/username/:username', async (req, res) => {
    const { username } = req.params
    try {
        const users = await User.find({ username })
        res.json(users)
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error retrieving users '})
    }
})

//GET user by id
router.get('/id/:id', async (req, res) => {
    const { id } = req.params
    try {
        const users = await User.findById(id)
        res.json(users)
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error retrieving users '})
    }
})

// GET delete user by id
router.delete('/id/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).json({ 'message': 'useer doesn\'t exist'})
        } else {
            res.json({ 'message': 'user deleted'})
        }
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error deleting users '})
    }
})

//GET user by email
router.get('/email/:email', async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ 'message': 'user not found' })
        } else {
            res.json(user)
        }
    } catch (error) {
        console.log(error)
        res.json({ 'message': 'error retrieving user' })
    }
})

module.exports = router