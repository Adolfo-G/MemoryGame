const { User } = require("../models/index");
const { signToken } = require('../utils/auth');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ email: req.params.email })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // get user scores
  getHighScores(req,res){
    User.aggregate([
      {$sort:{score:-1}},
      {$limit:5}
    ])
      .then((scores)=>res.json(scores))
      .catch((err)=>res.status(500).json(err));
  },
  // update user score
  updateUserScore(req,res){
    User.findOneAndUpdate({email:req.body.email},{score:req.body.score},{new:true})
    .then((user)=>res.json(user))
    .catch((err)=>res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then((user) => {
        const token = signToken(user);
        res.json({ user, token });
      })
      .catch((err) => res.status(500).json(err));
  },
  
  async loginUser(req, res) {
    const user = await User.findOne({ email: req.body.email })
    let password = req.body.password
    let correctPw = await user.isCorrectPassword(password)
    if ((!user || user === null)||(user !== null && user && !correctPw)) {
      res.status(404).json({ message: 'Incorrect credentials' });
    } else if (user !== null && user && correctPw) {
      const token = signToken(user);
      res.json({ user, token });
    }
  },
};

// Delete a user and associated apps
  // deleteUser(req, res) {
  //   User.findOneAndDelete({ _id: req.params.userId })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: 'No user with that ID' })
  //         : Application.deleteMany({ _id: { $in: user.applications } })
  //     )
  //     .then(() => res.json({ message: 'User and associated apps deleted!' }))
  //     .catch((err) => res.status(500).json(err));
  // },