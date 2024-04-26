// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Read comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add comment
app.post('/api/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Start server
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});