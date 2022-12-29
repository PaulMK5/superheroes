const { Superpower, Superhero } = require('../models');
const { Op } = require('sequelize');

module.exports.updatePowersList = async (req, res, next) => {
  try {
    const {
      body: { powers }
    } = req;

    const existing = await Superpower.findAll();
    const existingArray = existing.map(elem => elem.dataValues.name);
    const newPowers = powers
      .filter(elem => !existingArray.includes(elem))
      .map(elem => ({ name: elem }));
    if (newPowers.length > 0) {
      await Superpower.bulkCreate(newPowers, { validate: true });
    }
    const exactPowers = await Superpower.findAll({
      where: { name: { [Op.in]: powers } }
    });
    req.powers = exactPowers;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.updateHeroPowers = async (req, res, next) => {
  const {
    powers,
    body: { powers: powersArray },
    params: { heroId }
  } = req;

  const heroInstance = await Superhero.findByPk(heroId);
  const heroPowersInst = await heroInstance.getSuperpowers();

  if (heroPowersInst.length !== powers.length) {
    if (heroPowersInst.length > 0) {
      await heroInstance.removeSuperpowers(heroPowersInst);
    }
    if (powers.length > 0) {
      const newPowers = await Superpower.findAll({
        where: { name: { [Op.in]: powersArray } }
      });
      await heroInstance.setSuperpowers(newPowers);
      next();
    } else {
      next();
    }
  } else if (heroPowersInst.length === powers.length) {
    const heroPowersArray = heroPowersInst.map(elem => elem.dataValues.name);
    const filtered = powers.filter(elem => !heroPowersArray.includes(elem));
    if (filtered.length > 0) {
      await heroInstance.removeSuperpowers(heroPowersInst);
      const newPowers = await Superpower.findAll({
        where: { name: { [Op.in]: powersArray } }
      });
      await heroInstance.setSuperpowers(newPowers);
      next();
    }
  }
};
