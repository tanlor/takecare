// Express
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

// Define engine
app.set('view engine', 'ejs');

// Routes
app.get('/' , (req,res) => {
  res.render('home')
})

app.get('/battleboard', (req, res) => {
  res.render('battleboard')
})

app.get('/battlelog', (req, res) => {
  res.render('battlelog')
})

// Create server
app.listen(3333, () => console.log('Servidor rodando!'))