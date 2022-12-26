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
    }
    next();
  } catch (error) {
    next(error);
  }
};
