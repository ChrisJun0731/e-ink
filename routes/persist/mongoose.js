/**
 * Created by Administrator on 2017/12/6.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	var kettySchema = mongoose.Schema({name: String});
	var Kitten = mongoose.model('ketten', kettySchema);
	var silence = new Kitten({name: 'Silence'});
	console.log(silence.name);

	kettySchema.methods.speak = function(){
		var greeting = this.name ? 'Meow name is ' + this.name : 'I don\'t have a name';
		console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kettySchema);

	var fluffy = new Kitten({name: 'fluffy'});
	fluffy.speak();
	fluffy.save();

	Kitten.find(function(err, kittens){
		if(err)
			return console.error(err);
		console.log(kittens);
	})
});