const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path');
const port = 3000
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://sujal_don:devops@cluster0.hgct7bg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      res.redirect('/index');
    } catch (err) {
      console.error('Error saving user:', err.message);
      res.redirect('/');
    }
});

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/login-new', (req,res)=>{
    res.render('login-new')
})

app.get('/index', (req,res)=>{
    res.render('index')
})

app.listen(port, ()=>{
    console.log('Server at 3000')
})

