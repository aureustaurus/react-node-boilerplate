const mongoose = require('mongoose');

const ShopsSchema = new mongoose.Schema({
  fieldNumber1: {
    type: Number,
    default: 0
  },
  fieldFloat1: {
    type: Number,
    default: 0.00
  },
  fieldString1: {
    type: String,
    default: 'no string'
  },
  fieldDate1: {
    type: Date,
    default: new Date()
  },
  fieldBoolean1: {
    type: Boolean,
    default: true
  },
  fieldNumber2: {
    type: Number,
    default: 0
  },
  fieldFloat2: {
    type: Number,
    default: 0.00
  },
  fieldString2: {
    type: String,
    default: 'no string'
  },
  fieldDate2: {
    type: Date,
    default: new Date()
  },
  fieldBoolean2: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    default: 'name'
  },
});

module.exports = mongoose.model('Shops', ShopsSchema);
