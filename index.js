const https = require('https');
const fs = require('fs');
const path = require('./request_path')

const FORM_URLENCODED = 'application/x-www-form-urlencoded';

const options = {
    key: fs.readFileSync('./secondkey.pem'),
    cert: fs.readFileSync('./secondcert.pem')
};

https.createServer(options, (req, res) => {
    //res.writeHead(200);
    //res.write('text\n');
    if(req.headers['content-type'] === FORM_URLENCODED) {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            //console.log(body);
            result = path.resolve_path(req, Buffer.concat(body).toString());
            //console.log(result);
            res.writeHead(result.code);
            res.end(result.data);
        });
        req.on('error', error => {
            console.log(error);
        })
    } else {
        result = path.resolve_path(req);
        //console.log(result);
        res.writeHead(result.code);
        res.end(result.data);
    }
}).listen(8000);