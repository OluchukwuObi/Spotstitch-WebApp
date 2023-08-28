const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))
router.use('/prodcuts', require('./products'))
router.use('/address', require('./address'))
router.use('/chat', require('./chat'))
router.use('/events', require('./chat'))
router.use('/posts', require('./posts'))
router.use('/')

module.exports = router