/**
 * Created by Administrator on 2017/12/28.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	username: String,
	pwd: String,
	email: String,
	active: number,
	authentication: number
});

var User = userSchema.model('user', userSchema);

module.exports = User;