let express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/login',(req,res) => {
    res.render('../views/users/login');
});

router.get('/register',(req,res) => {
    res.render('../views/users/register');
});

//register proccess
router.post('/register',userController.regisAccount);

//login process
router.post('/login',userController.login);

module.exports = router;