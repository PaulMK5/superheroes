const { Router } = require('express');
const heroRouter = require('./heroRouter');
const powerRouter = require('./powerRouter');

const router = Router();

router.use('/heroes', heroRouter);
// router.use('/powers', powerRouter);

module.exports = router;
