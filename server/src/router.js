const userController = require('./controller/user');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/dashboard', userController.dashboard)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/logout', userController.logout);
};
