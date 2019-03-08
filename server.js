// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('./imported-data.json', 'utf8'))

app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

function listTags(limit) {
let out = '<h1>Tags and total occurences</h1><ol>'
  let tags = Object.keys(data)
  if (limit) {
    tags = tags.slice(0, limit)
  }
  tags.forEach((tag) => {
    out += `<li>${tag} ${data[tag].total}</li>`
  })
  out += '</ol>'
  return out
}


app.get('/tags/:top', function(request, response) {
  console.log('params', request.params.top)
  response.send(listTags(parseInt(request.params.top, 10)))
});

app.get('/tags/', (request, response) => {
  response.send(listTags())
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
