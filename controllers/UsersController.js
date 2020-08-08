const User = require('../models/User');
const viewPath = 'users';
const { loginUser } = require('./SessionsController');

exports.create = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await User.register(user, req.body.password);

    return loginUser(user, req, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "There was an issue registering the user", error});
  }
};