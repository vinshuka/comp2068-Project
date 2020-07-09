// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');
const { text } = require('body-parser');

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  race: {
    type:String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  str: {
    type: Number,
    required: true
  },
  int: {
    type: Number,
    required: true
  },
  dex: {
    type: Number,
    required: true
  },
  con: {
    type: Number,
    required: true
  },
  cha: {
    type: Number,
    required: true
  },
  luc: {
    type: Number,
    required: true
  },
  mainSkill: {
    type: String,
    required: true
  },
  secSkill: {
    type: String,
    required: true
  },
  weapon: {
    type: String,
    required: true
  },
  armor: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

CharacterSchema.virtual('description')
.get(function () {
  return `Gender: ${this.gender}, Race: ${this.race}, Class: ${this.class}`;
});

module.exports = mongoose.model('Character', CharacterSchema);