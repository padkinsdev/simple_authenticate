const fs = require('fs');

function get_error_file(code) {
    fs.open(`./errors/${code}.html`, 'r', (err, file) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`./errors/${code}.html does not exist`);
            } else {
                console.log(err);
            }
            return fs.readFileSync('./errors/500.html');
        } else {
            return fs.readFileSync(`./errors/${code}.html`)
        }
    });
}

exports.get_error_file = get_error_file;