const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport');
const isEmpty = require('is-empty')
// the .Stratefy is very important 
const LocalStrategy = require('passport-local').Strategy
 
const User = require('../models/user.js');
const Post = require('../models/post.js');

router.post('/register', (req, res) => {
  const { username, password, password2, email } = req.body;

  if(isEmpty(username) || isEmpty(password) || isEmpty(password2) || isEmpty(email)){
    return res.status(400).json({ error: "Missing required fields!"})
  }
  if(password !== password2){
    return res.status(400).json({error: "Passwords need to be identical"})
  }
  User.findOne({username: username}, (err, data) => {
    if(err){
      return res.status(400).json({ error: `An error occured: ${err}`})
    }else if(data){
      return res.status(400).json({ error: "Username already taken" })
    }else{
      const newUser = new User({
        username : req.body.username,
        password: req.body.password,
        email: req.body.email
      });
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err){ return res.status(400).json(`error: ${err}`) }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(201).json(user))
            .catch(error => console.log(error))
        })
      })
    }
  })
})

//now the tricky part, 
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, data) => {
    if(err){return res.status(400).json({error: err})}
    else if(!data){
      return res.json({error: "Unknown user name"})
    } 
    else{
      bcrypt.compare(password, data.password)
        .then(result => {
          if(result){return res.status(200).json(data)}
          else{return res.status(400).json({error: "Wrong password"})}
        })
        .catch(err => console.log(err))
    }
  })
})
router.get('posts', (req, res) => {})

module.exports = router