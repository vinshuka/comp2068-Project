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

    res.render(`${viewPath}/index`, {
      pageTitle: 'Character List',
      characters: characters
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the character list: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    .populate('user');

    res.render(`${viewPath}/show`, {
      pageTitle: character.name,
      character: character
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the character: ${error}`);
    res.session.formData = req.body;
    res.redirect('/');
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
    req.flash('success', 'Character was created successfully');
    res.redirect(`/characters/${character.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this character: ${error}`);
    req.session.formData = req.body;
    res.redirect('/characters/new');
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
    req.flash('success', 'The character was deleted successfully.');
    res.redirect('/characters');
  } catch (error) {
    req.flash('danger', `There was an error deleting this character: ${error}`);
    res.redirect('/characters');
  }
};