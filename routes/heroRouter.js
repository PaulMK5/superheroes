const { Router } = require('express');
const HeroController = require('../controllers/Hero.controller');
const pagination = require('../middlewares/pagination.mv');

const heroRouter = Router();

heroRouter.post('/', HeroController.createHero);
heroRouter.post('/:heroId', HeroController.updateHero);
heroRouter.get('/', pagination, HeroController.findAll);
heroRouter.get('/:heroId', HeroController.findOne);
heroRouter.delete('/:heroId', HeroController.deleteOne);
// heroRouter.get('/groups/:userId', UserController.getUserWithGroups);

module.exports = heroRouter;
