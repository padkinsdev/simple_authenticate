const fs = require('fs');
const auth = require('./authenticate');
const errh = require('./error_handling');

function resolve_path(req, body) {
    switch(req.url){
        case "/":
            return {code: 200, data: fs.readFileSync('./index.html')}
            break;
        case "/favicon.ico":
            return {code: 200, data: fs.readFileSync('./lock.ico')}
            break;
        case "/authenticate":
            return auth.check_login(req, body);
            break;
        default:
            return {code: 404, data: errh.get_error_file(404)}
    }
}

exports.resolve_path = resolve_path;