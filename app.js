var express = require('express');
var app = express();

var pub = __dirname + '/public';
app.use(express.static(pub));

app.set('views', __dirname + '/views');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/', function(req, res, next){
    res.render('./index.html');
});

app.get('/expose', function(req, res, next){
	res.render('./expose.html');
});

app.get('/expose/edit', function(req, res, next){
	res.render('./expose_edit.html');
});

app.get('/articlecls/edit', function(req, res, next){
	res.render('./articlecls_edit.html');
});

app.listen(3000);
console.log('Express started on port 3000');
