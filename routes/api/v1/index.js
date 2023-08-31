var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({status: false})
});
const AdminController = require('../../../Controller/Auth/Admin');
const UserController = require('../../../Controller/Admin/User');
router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.register);

router.post('/admin/user', UserController.create);

router.put('/admin/user/:id', UserController.update);

router.get('/admin/user', UserController.viewAll);

router.get('/admin/user/:id', UserController.viewSingel);

router.delete('/admin/user/:id', UserController.Delete);
module.exports = router;