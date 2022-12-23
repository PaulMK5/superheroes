const { Hero } = require('../models');
const HeroError = require('../errors/HeroError');

module.exports.getHeroInstance = async (req, res, next) => {
  try {
    const {
      params: { heroId }
    } = req;
    const hero = await Hero.findByPk(heroId);
    if (!hero) {
      throw new HeroError('Hero not found');
    }
    req.heroInstance = hero;
    next();
  } catch (error) {
    next(error);
  }
};
