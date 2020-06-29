

## Docker

You will need docker and docker-compose installed to build the application.

- [Docker installation](https://docs.docker.com/engine/installation/)

- [Common problems setting up docker](https://docs.docker.com/toolbox/faqs/troubleshoot/)

After installing docker, start the application with the following commands :

```
# To build the project for the first time or when you add dependencies
docker-compose build web

# To start the application (or to restart after making changes to the source code)
docker-compose up web

```

To view the app, find your docker IP address + port 8080 ( this will typically be http://localhost:8080/ ). To use a port other than 8080, you would need to modify the port in app.js, Dockerfile, and docker-compose.yml.



<img src="https://i.imgur.com/fOUKO7G.jpg" width="200">

---

Add these two lines to `app.js`, just place them anywhere before `app.listen()`:

```js
var IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
```

Then change `app.listen()` to:

```js
app.listen(PORT, IP_ADDRESS, () => {
  console.log(
    `Express server listening on port ${PORT} in ${app.settings.env} mode`
  );
});
```

Add this to `package.json`, after _name_ and _version_. This is necessary because, by default, OpenShift looks for `server.js` file. And by specifying `supervisor app.js` it will automatically restart the server when node.js process crashes.

```js
"main": "app.js",
"scripts": {
  "start": "supervisor app.js"
},
```
