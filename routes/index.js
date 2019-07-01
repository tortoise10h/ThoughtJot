let express = require('express');
let router = express.Router();

router.get('/',(req,res) => {
    const title = "Welcome to home page";
    res.render('index',{
        title:title
    });
})

module.exports = router;
