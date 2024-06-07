# Pomodoro Timer (vanilla JS)

A front-end web app that counts down using the pomodoro technique with customizable timer settings. Built with vanilla JS.

Inspired by [https://autumnchris.github.io/pomodoro-timer-vanilla-js](https://autumnchris.github.io/pomodoro-timer-vanilla-js).

---

## Instructions

After forking or cloning, navigate to the repository in your command line and launch the script for create containers:
```
docker-compose up -d
```

Once the server is running, go to `http://localhost:8880` in your browser.

## For developpers

### To run it locally

Go in the app folder

```
cd app
```

install the NPM packages:

```
npm install
```

Run the following script in your command line to run the application:

```
npm start
```

### To run the tests

After installing the NPM packages run the tests (in the app folder) with :

```
npm test
```

### To regenerate the documentation 

After installing the NPM packages run this command (in the app folder) :


```
./node_modules/.bin/jsdoc .\src\ -d docs -r 
```

Now in the app/docs folder you can now delete the documentation.html file and rename the index.html to documentation.html

### To run the linter

After installing the NPM packages run this command (in the app folder) :

```
npx eslint [options] [file|dir|glob]*
```
(If there is no result it means there isn't any error)