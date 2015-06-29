var express = require('express');
var fortune = require('./lib/fortune');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {
	layout: false
});

//if( app.thing == null ) console.log( 'bleat!' ); JHint


app.use(express.static(__dirname + '/public')); //Middleware for static files and views
app.use(require('body-parser')()); // Parse Url-endoce body.

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('main', {
		title: 'Main Page'
	});
});

app.get('/about/contact', function(req, res){
	res.type('text/plain');
	res.send('About - Contact');
});

app.get('/about/directions', function(req, res){
	res.type('text/plain');
	res.send('About - Directions');
});

app.get('/about*', function(req, res){
	res.render('about', {
		title: 'About Page',
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river', {
		title: 'Hood River'
	});
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate', {
		title: 'Request Group Rate'
	});
});

app.get('/newsletter', function(req, res){
	res.render('newsletter', {
		csrf: 'CSRF token goes here'
	});
});

app.post('/process', function(req, res){
	console.log('Form (from querystring): ' + req.query.form); 
	console.log('CSRF token (from hidden form field): ' + req.body._csrf); 
	console.log('Name (from visible form field): ' + req.body.name); 
	console.log('Email (from visible form field): ' + req.body.email); 
	res.redirect(303, '/thank-you');
});

//404 - not found
app.use(function(req, res){
	res.status(404);
	res.render('404', {
		title: '404 - Page not found'
	});
});

//500 - Internal Error
app.use(function(req, res){
	res.status(500);
	res.render('500', {
		title: '500 - Internal Error'
	});
});


app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl - C to terminate....');
});