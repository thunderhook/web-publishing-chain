var express = require('express');
var fs = require('fs');
var prince = require("prince");

var app = express();

var pub = __dirname + '/public';
app.use(express.static(pub));
app.use(express.json());

app.set('views', __dirname + '/views');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.get('/', function(req, res, next) {
	res.render('./index.html');
});

app.get('/expose', function(req, res, next) {
	res.render('./expose.html');
});

app.get('/expose/edit', function(req, res, next) {
	res.render('./expose_edit.html');
});

app.post('/expose/edit/save/html', function(req, res, next) {
	var ts = Math.round((new Date()).getTime() / 1000);
	var filepath = './public/html_preview/' + ts;
	generateHtmlFromRequest(req, filepath);
	res.end('{"filename" : "' + ts + '.html"}');
});

app.post('/expose/edit/save/pdf', function(req, res, next) {
	var ts = Math.round((new Date()).getTime() / 1000);
	var filepath = './output/' + ts;
	generateHtmlFromRequest(req, filepath);
	// generate PDF
	prince().binary('prince.exe').inputs(filepath + '.html').output(filepath + '.pdf').execute().then(function() {
		console.log('PDF generated at: ' + filepath + '.pdf');
		res.end('{"filename" : "' + ts + '.pdf"}');
	}, function(error) {
		console.log('ERROR: ', error);
	});

});

var generateHtmlFromRequest = function(req, filepath) {
	fs.writeFile(filepath + '.html', req.body.htmlContent, function(err) {
		if (err)
			throw err;
		console.log('HTML saved at: ' + filepath + '.html');
	});
}

app.get('/pdf/:file(*)', function(req, res, next) {
	res.download('./output/' + req.params.file);
});

app.get('/html/:file(*)', function(req, res, next) {
	res.render('../public/html_preview/' + req.params.file);
});

app.get('/articlecls/edit', function(req, res, next) {
	res.render('./articlecls_edit.html');
});

app.listen(3000);
console.log('Express started on port 3000');
