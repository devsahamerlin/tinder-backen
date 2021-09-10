
const express = require('express');
const mongoose = require('mongoose');
const Cards = require('./models/dbCards.js');
const Cors = require('cors');


//App config
const app = express();
const port = process.env.PORT || 5005;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config

/*mongoose.connect('mongodb://localhost/tinder',
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB lewansoon réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));*/
    

const connection_url = 'mongodb+srv://tinderadmin:eAsyGsiGl8bMYdaa@cluster0.1zmdn.mongodb.net/tinder-swm?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true,
}).then(() => console.log('Connexion à MongoDB Tinder réussie !'))
.catch(() => console.log('Connexion à MongoDB Tinder échouée !'));


// API Endpoints
app.get("/", (req, res) => {
    res.status(200).send("Hello SWM tinder server.");
});

app.post('/tinder/cards', (req, res) =>{
    const dbCard = req.body;

    Cards.create(dbCard,  (err, data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

app.get('/tinder/cards', (req, res) =>{
    
    Cards.find( (err, data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

//Listener
app.listen(port, () => {
    console.log(`Tinder server listing on localhost port : ${port}`);
})
