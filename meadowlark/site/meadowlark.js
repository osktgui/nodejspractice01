var express = require('express');

var app = express();

var fortunes = [
	'Conquer your fears or they will conquer you.', 'Rivers need springs.',
	'Do not fear what you dont know.',
	'You will have a pleasant surprise.',
	'Whenever possible, keep it simple.',
];

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', {
	layout: false
});

app.use(express.static(__dirname + '/public')); //Middleware for static files and views

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
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		title: 'About Page',
		fortune: randomFortune
	});
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