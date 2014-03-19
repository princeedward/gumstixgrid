
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var querystring = require('querystring');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
// app.post('/IPrefresh',user.findIP);

sendLocalIP = function(){
	console.log("This message will be dislay every 10 seconds");
	var date = new Date();
	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  console.log(min + ":" + sec);

  var options = {
	  host: 'localhost',
	  path: '/IPrefresh',
	  //since we are listening on a custom port, we need to specify it by hand
	  port: '3000',
	  //This is what changes the request to a POST request
	  method: 'POST'
	};

	var post_data = querystring.stringify({
    'UniqueID' : '12345'
  });

  callback = function(response) {
  	response.setEncoding('utf8');

		var str = ''
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    console.log(str);
	  });
}
	var post_req = http.request(options, callback);

	post_req.write(post_data);
	post_req.end();

  setTimeout(sendLocalIP, 10000);
}

setTimeout(sendLocalIP, 10000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

