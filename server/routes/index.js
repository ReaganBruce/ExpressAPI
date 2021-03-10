const express = require('express');
const chirpsRouter = require('./chirps')

let router = express.Router();

//http://localhost:3000/api/chirps
router.use('/chirps', chirpsRouter);


module.exports = router