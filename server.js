const express = require('express')
const app = express()
const bodyParser= require('body-parser')

app.set('view engine', 'ejs')

app.listen(3000, function() {
  console.log('listening on 3000')
})

const MongoClient = require('mongodb').MongoClient



  MongoClient.connect('mongodb+srv://eirene:papanasi96@cluster0.p5phkt2.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('journeys')
    const infoCollection = db.collection('info')

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/info', (req, res) => {
      infoCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    })
    
    app.get('/', (req, res) => {
      db.collection('info').find().toArray()
        .then(results => {
          res.render('index.ejs', { info: results })
        })
        
    })
    app.post('/info', (req, res) => {
      infoCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  })

  
  