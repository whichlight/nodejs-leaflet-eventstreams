var http = require('http'),
		https = require('https'),
		url = require("url"),
		path = require("path"),  
		spawn = require("child_process").spawn,
		jsonline = require('json-line-protocol').JsonLineProtocol,
		cfg = require('./config'),
		fs = require("fs");

http.createServer(function (req, res) {
	var uri = url.parse(req.url).pathname;  
	console.log("Requested uri: " + uri);

	if ( uri == '/stream' ) {
		var jsonTwitter = new jsonline();
		var username = cfg.twitter_username,
				password = cfg.twitter_password;
		var options = {
			host: 'stream.twitter.com',
			port: 443,
			path: '/1/statuses/filter.json?locations=-180,-90,180,90',
			headers: {
				'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
			}
		};

		res.writeHead(200, {'Content-Type': 'text/event-stream'});
		https.get(options, function(resp){
			resp.on('data', function(chunk){
				jsonTwitter.feed(chunk);
			});
		}).on("error", function(e){
			console.log("Got error: " + e.message);
			console.log("Got error: " + e);
		});

		jsonTwitter.on('value', function (value) {
			res.write("event: twitter\n");
			res.write("data: "+JSON.stringify(value)+"\n\n");
		});

	} else {
		if ( uri == '/' ) uri = '/index.html';
		var filename = path.normalize( path.join(process.cwd(), uri) ); 
		console.log(filename);

		if (filename.indexOf(__dirname) == 0 ) {
			path.exists(filename, function(exists) {
				if(!exists) {  
					res.writeHead(404, {"Content-Type": "text/plain"});  
					res.write("404 Not Found\n");  
					res.end();  
					return;  
				}  

				fs.readFile(filename, "binary", function(err, file) {
					if(err) {
						res.writeHead(500, {"Content-Type": "text/plain"});
						res.write(err + "\n");
						res.end();
						return;
					}

					res.writeHead(200);
					res.write(file, "binary");
					res.end();
				});
			});

		} else {
			console.log("invalid path: " + filename);
			res.writeHead(404, {"Content-Type": "text/plain"});  
			res.write("404 Not Found\n");  
			res.end();  
			return;  
		}
	}
}).listen(cfg.port, cfg.address);

console.log('Server running at http://'+cfg.address+':'+cfg.port+'/');
