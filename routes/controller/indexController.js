/**
 * Created by Administrator on 2017/7/26.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render('index');
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(username == "admin" && password == "admin1234"){
		req.session.user = {
			username: username,
			password: password
		};
	}
	res.redirect('/');
});

module.exports = router;