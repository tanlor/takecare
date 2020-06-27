// Express
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/battle', express.static(__dirname + '/public'));

// Define engine
app.set('view engine', 'ejs');

// Routes

/* Home */
app.get('/' , (req,res) => {
  res.render('home')
})

/* Battleboard */
app.get('/battleboard', (req, res) => {
  res.render('battleboard')
})

/* Battlelog */
app.get('/battle/:id', (req, res) => {

  let battleId = req.params.id

  res.render('battlelog', {
    battleId: battleId
  })
})

/* Create server */
app.listen(3333, () => console.log('Servidor rodando!'))