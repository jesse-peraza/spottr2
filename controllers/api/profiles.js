const Profile = require('../../models/profile')
const User = require('../../models/user')
const uploadFile = require('../../config/upload-file')

module.exports = {
    index,
    create,
    upload,
    displayProfiles,
    sendLike,
    sendDislike
}

async function index (req, res) {
    console.log('req.user', req.user)
    try {
        const profile = await Profile.findOne({user: req.user._id})
        profile ? res.json(profile) : res.status(200)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function create (req, res) {
    console.log(req.body)
    try {
        req.body.user = req.user._id
        req.body.name = req.user.name
        const info = req.body.data
        info.user = req.body.user
        console.log(info)
        const profile = await Profile.create(info)
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function upload (req, res) {
    try {
        if(req.files) {
            const profile = await Profile.findOne({user: req.user._id})
            for (let i = 0; i < req.files.length; i ++) {
                const photoURL = await uploadFile(req.files[i])
                console.log(photoURL)
                profile.photos.push(photoURL)
            }
            profile.save()
            res.json(profile)
        } else {
            throw new Error('Must upload a File')
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
}

async function displayProfiles (req, res) {
    try {
        const myProfile = req.user._id
        const profileList = await Profile.find({ user: { $ne: myProfile }})
        res.json(profileList)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function sendLike (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
        profile.likes.push(req.body.id)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function sendDislike (req, res) {
    try {
        const profile = await Profile.findOne({user: req.user._id})
        profile.dislikes.push(req.body)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

