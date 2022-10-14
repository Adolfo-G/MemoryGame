const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  updateUserScore,
  getHighScores,
  updateUsername,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers);
// /api/users/scores
router.route('/scores').get(getHighScores);
// /api/users/:email
router.route('/profile/:email').get(getSingleUser);
// /api/users/signup
router.route('/signup').post(createUser);
// /api/users/login
router.route('/login').post(loginUser);
// /api/users/updateScore
router.route('/updateScore').put(updateUserScore);
// /api/users/updateUsername
router.route('/updateUsername').put(updateUsername);


module.exports = router;
