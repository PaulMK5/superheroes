const { Superpower, Superhero } = require('../models');
// const HeroError = require('../errors/HeroError');

module.exports.getPowers = async (req, res, next) => {
  try {
    const {
      body: { powers }
    } = req;

    if (typeof powers === 'string') {
      const [power, created] = await Superpower.findOrCreate({
        where: { name: powers }
      });
      req.powers = power;
    } else if (Array.isArray(powers)) {
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
    }
    next();
  } catch (error) {
    next(error);
  }
};
