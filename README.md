# simple_authenticate
A basic Node.js server for logging in and authentication

## What is it?
`simple_authenticate` is a barebones Node.js server that uses the Node.js https module to respond to GET and POST requests. Clients are presented with a basic sign-in page. The server checks the username and password submitted by the client against a the `"username" : "password"` pairings located in /logins.json, and sends a response based on whether the client has submitted a valid username/password combination.

**This is not intended to be a secure server.** While it does work to verify clients, `simple_authenticate` is undoubtedly plagued with security flaws. Therefore, I recommend using this solely in a low-risk context.

## What do I need in order to use it?
You will need an openssl certificate and private key (both are .pem files, although if you want to use a .pfx file instead, you can adjust the code in /index.js according to the [https module documentation](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)).The certificate and private key should go in the same directory as the /index.js file.

You will also need Node.js, which you can get at the [official website](https://nodejs.org/en/).

## How do I run the server?
Navigate to the directory containing the index.js and package.json files (e.g. `cd /path/to/directory` in the Linux command line). Run the command `npm start`, then open a browser and go to https://localhost:8000. You should see a webpage asking for a username and password.

## Architecture
The sign-in page is /index.html. The main routing occurs through the code in /request_path.js, and verification of the end user's credentials occurs through the code at /authenticate.js. If you want to add or remove login credentials, edit /logins.json like so:
```json
//logins.json
{
  "username1" : "password1",
  "username2" : "password2"
}
```
