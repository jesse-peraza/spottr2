const express = require('express')
const router = express.Router()
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const upload = require('multer')()

router.get('/', profilesCtrl.index)
router.get('/display', profilesCtrl.displayProfiles)
router.post('/create', profilesCtrl.create)
router.post('/photo-upload', upload.array('photo', 4), profilesCtrl.upload)
router.post('/like', profilesCtrl.sendLike)
router.post('/dislike', profilesCtrl.sendDislike)
router.post ('/match/add', profilesCtrl.addMatch)
router.get('/match', profilesCtrl.getMatches)

// router.put('/edit', profilesCtrl.update)

module.exports = router;