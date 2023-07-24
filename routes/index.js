var router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { profile, toogleFavorite } = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.status(200).json({
      ok : true,
      message : "Done!"
    })
  })
  .post("/api/register", register)
  .post("/api/login", login)
  .get("/api/profile",checkToken, profile)
  .get("/api/favorite", checkToken, toogleFavorite)

module.exports = router;
