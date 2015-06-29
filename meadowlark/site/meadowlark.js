var express = require('express');
var fortune = require('./lib/fortune');
var formidable = require('formidable'); //npm install formidable --save
var jqupload = require('jquery-file-upload-middleware'); // npm install jquery-file-upload-middleware --save // File Upload Ajax -- frontend: http://blueimp.github.io/jQuery-File-Upload/
var credentials = require('./credentials.js'); // add .gitignore credentials.js
 
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

// lib: jquery-file-upload-middleware, File Upload Ajax
app.use('/upload', function(req, res, next){ 
	var now = Date.now(); 
	jqupload.fileHandler({
		uploadDir: function(){
			return __dirname + '/public/uploads/' + now;
		},
		uploadUrl: function(){
			return '/uploads/' + now; 
		},
	})(req, res, next);
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

	if(req.xhr || req.accepts('json,html') === 'json'){
		// if there were an error, we would send { error: 'error description' }
		res.send({ success: true }); 
	} else {
		// if there were an error, we would redirect to an error page
		res.redirect(303, '/thank-you');
	}

});


// lib: Formidable, File Upload
app.get('/contest/vacation-photo', function(req,res){ 
	var now = new Date(); 
	console.log(now);
	res.render('contest/vacation-photo',{
		year: now.getFullYear(),
		month: now.getMonth()
	});
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){ 
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error'); 
		console.log('received fields:'); 
		console.log(fields);
		console.log('received files:'); 
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});



app.get('/thank-you', function(req, res){
	res.type('text/plain');
	res.send('thank you!!!');
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