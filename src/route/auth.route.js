const express = require('express');
// import express from 'express';
// const app = express();
const router = express.Router();
// const bcrypt = express.bcrypt(); // import bcrypt;

// const { signup, login,validation} = require('../controller/auth.controller');
const { signup} = require('../controller/auth.controller');

router.post('/sign-up', signup);
// // router.post('/login', login);
// router.get('/validation', validation);

 module.exports = router
//  module.exports = bcrypt
// export default router