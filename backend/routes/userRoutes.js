const express = require('express')
const router = express.Router()


// ============= This is the controller ===============================================
const { registerUser, authUser} = require('../controller/userController.js')

// ============= all request route here ===============================================
// router.route('/').post(registerUser)

router.post('/registration', registerUser)
router.post('/login', authUser)

module.exports = router;