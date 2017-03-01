var express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var clientId = req.params.client_id
var clientSecret = req.params.client_secret

app.oauth = oauthserver({
  model: { getClient(clientId, clientSecret, function(error, client){
    console.log(`Passou por aqui o usuario ${client}.`)
  } }, // See below for specification
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});

app.use(app.oauth.errorHandler());

app.listen(3000, function(){
  console.log("OAuth Server stated on port 3000!")
});
