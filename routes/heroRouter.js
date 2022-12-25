const { Router } = require('express');
const HeroController = require('../controllers/Hero.controller');
const pagination = require('../middlewares/pagination.mv');

const heroRouter = Router();

heroRouter.post('/', HeroController.createHero);
heroRouter.post('/:heroId', HeroController.updateHero);
heroRouter.get('/', pagination, HeroController.findAll);
// heroRouter.get('/:userId', getUserInstance, UserController.findByPk);
// heroRouter.delete('/:userId', UserController.deleteByPk);
// heroRouter.get('/groups/:userId', UserController.getUserWithGroups);

module.exports = heroRouter;
