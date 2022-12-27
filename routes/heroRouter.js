const { Router } = require('express');
const HeroController = require('../controllers/Hero.controller');
const pagination = require('../middlewares/pagination.mv');
const { getPowers } = require('../middlewares/power.mv');

const heroRouter = Router();

heroRouter.post('/', getPowers, HeroController.createHero);
heroRouter.put('/:heroId', getPowers, HeroController.updateHero);
heroRouter.get('/', pagination, HeroController.findAll);
heroRouter.get('/:heroId', HeroController.findOne);
heroRouter.delete('/:heroId', HeroController.deleteOne);
// heroRouter.get('/groups/:userId', UserController.getUserWithGroups);

module.exports = heroRouter;
