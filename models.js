const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:  String,
    password: String,
});

const pollSchema = new Schema({
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    options: [String],
    choices: [{ text: String, votes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, rank: Number }] }],
});

const User = mongoose.model('User', userSchema);
const Poll = mongoose.model('Poll', pollSchema);

module.exports = { User, Poll };
