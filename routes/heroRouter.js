const { Router } = require('express');
const multer = require('multer');
const HeroController = require('../controllers/Hero.controller');
const pagination = require('../middlewares/pagination.mv');
const {
  updatePowersList,
  updateHeroPowers
} = require('../middlewares/power.mv');
const { STATIC_PATH } = require('../config/path.config');

const heroRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  }
});

const upload = multer({ storage });

heroRouter.post('/', updatePowersList, HeroController.createHero);
heroRouter.put(
  '/:heroId',
  updatePowersList,
  updateHeroPowers,
  HeroController.updateHero
);
heroRouter.get('/', pagination, HeroController.findAll);
heroRouter.get('/:heroId', HeroController.findOne);
heroRouter.delete('/:heroId', HeroController.deleteOne);
heroRouter.post('/:heroId', upload.single('image'), HeroController.addImage);

module.exports = heroRouter;
