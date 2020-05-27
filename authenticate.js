const fs = require('fs');
const errh = require('./error_handling');

function check_login(req, body){
    if (req.method == "POST"){ // make sure that the http method is correct
        const submitted = body.split('&');
        // the next 3 lines check to make sure that form data was properly encoded
        if (submitted.length == 2){
            if (submitted[0].includes('=') && submitted[1].includes('=')) {
                if (submitted[0].split('=')[0] == 'uname' && submitted[1].split('=')[0] == 'pword'){
                    if (submitted[0].split('=').length == 2 && submitted[1].split('=').length == 2){
                        const uname =  submitted[0].split('=')[1];
                        const pword =  submitted[1].split('=')[1];
                        const login_details = JSON.parse(fs.readFileSync('./logins.json', {encoding: 'utf-8'}));
                        if (!(login_details.hasOwnProperty(uname))){ // does the username exist?
                            return {code: 401, data: errh.get_error_file(401)}
                        } else if (login_details[uname] != pword) {
                            // is the submitted password the same as the password listed in logins.json?
                            return {code: 401, data: errh.get_error_file(401)}
                        } else {
                            return {code: 200, data: 'Success!'}
                        }
                    } else {
                        return {code: 400, data: errh.get_error_file(400)}
                    }
                } else {
                    return {code: 400, data: errh.get_error_file(400)}
                }
            } else {
                return {code: 400, data: errh.get_error_file(400)}
            }
        } else {
            return {code: 400, data: errh.get_error_file(400)}
        }
    } else {
        return {code: 405, data: errh.get_error_file(405)}
    }
}

exports.check_login = check_login;
