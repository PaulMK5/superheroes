const { Superpower, Superhero } = require('../models');
// const HeroError = require('../errors/HeroError');

module.exports.getPowers = async (req, res, next) => {
  try {
    const {
      body: { powers },
      params: { heroId }
    } = req;

    console.log(heroId);

    if (heroId) {
      const heroInstance = await Superhero.findByPk(heroId);
      await heroInstance.removeSuperpowers(await heroInstance.getSuperpowers());
    }

    const existing = await Superpower.findAll();
    const existingArray = existing.map(elem => elem.dataValues.name);
    const newPowers = powers
      .filter(elem => !existingArray.includes(elem))
      .map(elem => ({ name: elem }));
    if (newPowers) {
      await Superpower.bulkCreate(newPowers, { validate: true });
    }

    const exactPowers = await Superpower.findAll({
      where: { name: powers }
    });
    req.powers = exactPowers;

    next();
  } catch (error) {
    next(error);
  }
};
