const { Router } = require('express');
const heroController = require('../controllers/Hero.controller');
const { getHeroInstance } = require('../middlewares/hero.mv');
// const pagination = require('../middlewares/pagination.mv');

const heroRouter = Router();

heroRouter.post('/', heroController.createHero);
// heroRouter.post('/:userId', getUserInstance, UserController.updateByPk);
// heroRouter.get('/', pagination, UserController.findAll);
// heroRouter.get('/:userId', getUserInstance, UserController.findByPk);
// heroRouter.delete('/:userId', UserController.deleteByPk);
// heroRouter.get('/groups/:userId', UserController.getUserWithGroups);

module.exports = heroRouter;
