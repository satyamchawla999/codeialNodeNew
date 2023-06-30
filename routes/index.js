const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller')

console.log('router loaded');

router.get('/',homeController.home);
// router.get('/house',homeController.house);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

// router.use('/posts',require('./posts'));

// for any further routes acess from here 
// router.use('/routerName', require('./routerfile));

module.exports = router;