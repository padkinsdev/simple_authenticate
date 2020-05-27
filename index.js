const https = require('https');
const fs = require('fs');
const path = require('./request_path')

const FORM_URLENCODED = 'application/x-www-form-urlencoded';

const options = {
    // change the filenames in the following two lines to the names of your certificate and key
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, (req, res) => {
    if(req.headers['content-type'] === FORM_URLENCODED) {
        // does the request include form data?
        let body = [];
        req.on('data', chunk => {
            // as data comes in, add it to the list
            body.push(chunk);
        });
        req.on('end', () => {
            // once the body data stops coming in, push everything together into a string
            result = path.resolve_path(req, Buffer.concat(body).toString());
            res.writeHead(result.code);
            res.end(result.data);
        });
        req.on('error', error => {
            console.log(error);
        })
    } else {
        // if the request doesn't contain form data, pass it directly to /request_path.js
        result = path.resolve_path(req);
        res.writeHead(result.code);
        res.end(result.data);
    }
}).listen(8000); // start up the server
