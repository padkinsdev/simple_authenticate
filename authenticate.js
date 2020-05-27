const fs = require('fs');
const errh = require('./error_handling');

function check_login(req, body){
    if (req.method == "POST"){
        //const login_details = fs.readFileSync('./logins.json');
        //const keys = Object.keys(login_details);
        const submitted = body.split('&');
        if (submitted.length == 2){
            if (submitted[0].includes('=') && submitted[1].includes('=')) {
                if (submitted[0].split('=')[0] == 'uname' && submitted[1].split('=')[0] == 'pword'){
                    if (submitted[0].split('=').length == 2 && submitted[1].split('=').length == 2){
                        const uname =  submitted[0].split('=')[1];
                        const pword =  submitted[1].split('=')[1];
                        const login_details = JSON.parse(fs.readFileSync('./logins.json', {encoding: 'utf-8'}));
                        //const keys = Object.keys(login_details);
                        //console.log(uname);
                        //console.log(pword);
                        //console.log(keys);
                        console.log(typeof(login_details));
                        if (!(login_details.hasOwnProperty(uname))){
                            //console.log(login_details[uname]);
                            return {code: 401, data: errh.get_error_file(401)}
                        } else if (login_details[uname] != pword) {
                            console.log(login_details[uname])
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
                //console.log("= not in params");
                return {code: 400, data: errh.get_error_file(400)}
            }
        } else {
            //console.log("Incorrect length");
            return {code: 400, data: errh.get_error_file(400)}
        }
        //console.log(body);
        //return {code: 200, data: "Parsed data successfully"}
    } else {
        return {code: 405, data: errh.get_error_file(405)}
    }
}

exports.check_login = check_login;