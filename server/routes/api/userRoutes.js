const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  updateUserScore,
  getHighScores,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers);
// /api/users/scores
router.route('/scores').get(getHighScores);
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// /api/users/signup
router.route('/signup').post(createUser);
// /api/users/login
router.route('/login').post(loginUser);
// /api/users/updateScore
router.route('/updateScore').put(updateUserScore);

module.exports = router;
