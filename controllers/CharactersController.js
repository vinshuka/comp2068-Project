// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = 'characters';
const Character = require('../models/Character');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const characters = await Character
    .find()
    .populate('user')
    .sort({updatedAt: 'desc'});

    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the characters'});
  }
};

exports.show = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    .populate('user');

    res.status(200).json(character);
  } catch (error) {
    res.status(400).json({message: "There was an error getting this character"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Character'
  });
};

exports.create = async (req, res) => {
  try{
    const {user: email } = req.session.passport;
    const user = await User.findOne({email:email});

    const character = await Character.create({user: user._id, ...req.body});

    res.status(200).json(character);
  } catch (error) {
    res.status(400).json({message: "There was an error creating the character", error});
  }
};

exports.edit = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: character.name,
      formData: character
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this character: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email:email});

    let character = await Character.findById(req.body.id);
    if(!character) throw new Error('Character could not be found.');

    const attributes = {user: user._id, ...req.body}
    await Character.validate(attributes);
    await Character.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The character was updated successfully.');
    res.redirect(`/characters/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this character: ${error}`);
    res.redirect(`/characters/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Character.deleteOne({_id: req.body.id});
    res.status(200).json({message: "The character was deleted successfully"});
  } catch (error) {
    res.status(400).json({message: "There was a problem deleting the character"});
  }
};