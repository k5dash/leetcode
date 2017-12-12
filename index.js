const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.post('/problems', function(req, res) {
	request.post({ url: "http://localhost:8000/leetcode", form: {username:req.body['username'],password:req.body['password']} }, function(error, response, body) { 
	      if (!error) { 
	          res.json(JSON.parse(body)); 
	      } 
    }); 
});

app.get('/problems', function(req, res) {
	request.post({ url: "http://localhost:8000/leetcode", form: {username:req.query.username,password:req.query.password} }, function(error, response, body) { 
	      if (!error) { 
	          res.json(JSON.parse(body)); 
	      } 
    }); 
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
