const { Superhero, Superpower } = require('../models');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body, powers } = req;
    const createdHero = await Superhero.create(body);
    if (powers instanceof Superpower) {
      await createdHero.addSuperpower(powers);
    }
    res.status(201).send(createdHero);
  } catch (error) {
    next(error);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const { pagination } = req;
    const results = await Superhero.findAll({
      ...pagination,
      include: [{ model: Superpower }]
    });
    return res.status(200).send(results);
  } catch (error) {
    next(error);
  }
};

module.exports.findOne = async (req, res, next) => {
  try {
    const {
      params: { heroId }
    } = req;
    const hero = await Superhero.findByPk(heroId, {
      include: [{ model: Superpower }]
    });
    return res.status(200).send(hero);
  } catch (error) {
    next(error);
  }
};

module.exports.updateHero = async (req, res, next) => {
  try {
    const {
      body,
      params: { heroId }
    } = req;
    const updatedHero = await Superhero.update(
      {
        ...body
      },
      {
        where: {
          id: heroId
        },
        returning: true
      }
    );
    res.status(200).send(updatedHero);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOne = async (req, res, next) => {
  try {
    const {
      params: { heroId }
    } = req;
    const deleted = await Superhero.destroy({
      where: { heroId }
    });
    if (deleted) {
      return res.status(200).send(deleted);
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};
