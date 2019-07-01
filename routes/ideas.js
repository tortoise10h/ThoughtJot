let express = require('express');
let router = express.Router();

let ideaController = require('../controllers/IdeaController');


router.get('/',ideaController.getAllIdeas);

router.get('/add',(req,res) => {
    res.render('../views/ideas/add');
})

router.get('/edit/:id',ideaController.getIdeaById);

router.post('/',ideaController.addIdea);

router.put('/:id',ideaController.updateIdea);

router.delete('/:id',ideaController.deleteIdea);

module.exports = router;