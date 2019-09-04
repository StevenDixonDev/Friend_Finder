const router = require('express').Router();
const path = require('path');
const {previous, friends}  = require('../data/friends.js');


// display json of all possible friends
router.get('/', (req, res)=>{
    res.send('hi')
})

// get previous matches
router.get('/previous', (req, res)=> {
  console.log(previous)
  res.json(JSON.stringify(previous));
})

// update app from survey page
router.post('/', (req, res)=>{
  console.log(req.body);

  res.json(friends[0]);
})


module.exports = router;