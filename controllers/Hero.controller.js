const { Superhero } = require('../models');

module.exports.createHero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdHero = await Superhero.create(body);
    res.status(201).send(createdHero);
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
