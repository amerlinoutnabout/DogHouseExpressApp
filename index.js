const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

const db = require('./db');

app.get('/', (req, res) => {  
    res.render('index', {
      locals: { 
        title: "Welcome to the Doghouse"
      },
      partials: {
        head:'/partials/head'
      }
    });
})

app.get('/dogs', (req, res) => {  
  res.render('dogs', {
    locals: { 
      dog: db,
      path: req.path,
      title: "Table of Contents"
    },
    partials: {
      head:'/partials/head'
    }
  });
})


app.get('/dogs/:breed', (req, res) => {
    let {breed} = req.params
   
    let dog = db.find(thisDog => thisDog.breed === breed);
    if (dog) {
      res.render('dog', {
        locals: {
          dog,
          title: 'Dog'
        },
        partials: {
          head: '/partials/head',
         //dogImage: '/paritals/dog-image'
        }
      });
    } else {
      res.status(404)
      res.send('No dog with that name found')
    }
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`)
});