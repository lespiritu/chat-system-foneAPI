const express = require('express');
const router = express.Router();

// ============= This is the controller ===============================================
const { protect } = require('../middleware/authMiddleware.js');
const { accessChat, fetchChats } = require('../controller/chatController.js');
// ============= all request route here ===============================================
router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);

module.exports = router;
