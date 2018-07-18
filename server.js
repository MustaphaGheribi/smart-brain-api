const PORT = 3001;
const saltRounds = 10;
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');
//Controllers
const register = require('./controllers/Register');
const signIn = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : '',
	  database : 'SmartBrain'
	}
});

app.use(cors());
//Parse the response into JSON
app.use(bodyParser.json());

//GET the home page.
app.get('/', (req, res)=> {
    res.json(database.users);
})

//SignIn endPoint, returns Success/Failure.
app.post('/signin', (req,res)=> {signIn.handleSignIn(req,res,db,bcrypt)})
//Register endPoint , returns the user.
app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt,saltRounds)})
app.get('/profile/:id', (req,res)=> {profile.handleProfileGET(req,res,db)})
app.put('/image',(req,res)=> {image.handleImagePUT(req,res,db)})
app.post('/imageurl',(req,res)=> {image.handleApiCAll(req,res)})
app.listen(PORT, ()=>{
    console.log('app is running on port '+PORT);
});

