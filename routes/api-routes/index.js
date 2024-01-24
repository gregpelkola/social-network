const router = require('express').Router();
console.log('Index.js: Before requiring user-routes and thought-routes');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
console.log('Index.js: After requiring user-routes and thought-routes');
// Define endpoints for user and thought routes
router.use('/user',userRoutes);
router.use('/thought',thoughtRoutes);

module.exports = router;