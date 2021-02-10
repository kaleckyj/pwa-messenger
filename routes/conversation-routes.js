const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversation-controller');

router.get('/', conversationController.getConvs);
router.get('/:id', conversationController.getConv);
router.post('/:id', conversationController.editConv);
router.post('/', conversationController.createConv);

module.exports = router;