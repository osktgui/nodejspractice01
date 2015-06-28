var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Texto Plano');
});

//404 - not found
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});

//500 - Internal Error
app.use(function(req, res){
	res.type('text/plain');
	res.status(500);
	res.send('500 - Internal Error');
});


app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl - C to terminate....');
});