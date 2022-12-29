const MAX_LIMIT = 10;

module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit, offset }
    } = req;

    if (!limit && !offset) {
      req.pagination = {
        limit: 5,
        offset: 0
      };
    } else {
      req.pagination = {
        limit: limit < MAX_LIMIT || limit >= 0 ? limit : MAX_LIMIT,
        offset: offset > 0 ? offset : 0
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};
