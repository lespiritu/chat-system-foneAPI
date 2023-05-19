const express = require('express');
const router = express.Router();

// ============= This is the controller ===============================================
const {
  registerUser,
  authUser,
  allUsers,
} = require('../controller/userController.js');

const { protect } = require('../middleware/authMiddleware.js');

// ============= all request route here ===============================================
// router.route('/').post(registerUser)

router.post('/registration', registerUser);
router.post('/login', authUser);
router.get('/searchUser', protect, allUsers);

module.exports = router;
