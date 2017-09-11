var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');

var indexController = require('./routes/controller/indexController');
var statusController = require('./routes/controller/statusController');
var devicesController = require('./routes/controller/devicesController');
var usersController = require('./routes/controller/usersController');
var appsController = require('./routes/controller/appsController');
var settingsController = require('./routes/controller/settingsController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: new Date().toDateString(),
	cookie: {maxAge: 60* 1000 * 30},
	resave: true,
	saveUninitialized: false
}));

//过滤器模块
app.use(function(req, res, next){
	if(!req.session.user){
		if(req.url == "/login"){
			next();
		}else{
			res.redirect('/login');
		}
	}else{
		next();
	}
});

app.use('/', indexController);
app.use('/', statusController);
app.use('/', devicesController);
app.use('/', usersController);
app.use('/', appsController);
app.use('/', settingsController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(3000);

module.exports = app;