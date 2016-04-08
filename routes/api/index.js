var express = require('express');
var router = express.Router();

router.use('/events', require('./events/index'));
router.use('/users', require('./users/index'));

module.exports = router;
