const { Superhero, Superpower } = require('../models');

module.exports.createHero = async (req, res, next) => {
  try {
    const {
      body,
      powers,
      body: { nickname }
    } = req;

    const exists = await Superhero.findOne({
      where: { nickname }
    });
    if (exists) {
      res.status(208).send(exists);
    }

    const createdHero = await Superhero.create(body);
    await createdHero.addSuperpowers(powers);
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
      include: Superpower
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
    const [rows, [updatedHero]] = await Superhero.update(
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

    const hero = await Superhero.findByPk(heroId, {
      include: Superpower
    });

    res.status(200).send(hero);
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
