var mongoose = require('mongoose/');
Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message : { type: String, required: true},
  date : { type: Date, required: true},
  author : { type: String, required: false},
});


module.exports = mongoose.model('Message', MessageSchema);
