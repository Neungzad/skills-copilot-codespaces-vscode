// Create web server
// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function (req, res) {
    // Get url
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    // Get file path
    var filePath = path.join(__dirname, pathname);
    // Get query
    var query = urlObj.query;
    // Handle static resource
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found');
                res.end('404 Not Found');
            } else {
                res.writeHead(200, 'OK');
                res.end(data);
            }
        });
    } else if (pathname === '/submit') {
        // Get query
        var comment = query.comment;
        comments.push(comment);
        // Redirect
        res.statusCode = 302;
        res.statusMessage = 'Found';
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname === '/getComments') {
        var str = JSON.stringify(comments);
        res.end(str);
    } else {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found');
                res.end('404 Not Found');
            } else {
                res.writeHead(200, 'OK');
                res.end(data);
            }
        });
    }
});
server.listen(8080, function () {
    console.log('Server is running...');
});