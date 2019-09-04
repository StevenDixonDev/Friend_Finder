const router = require('express').Router();
const path = require('path');
const {previous, friends}  = require('../data/friends.js');


// display json of all possible friends
router.get('/', (req, res)=>{
    res.send('hi')
})

// get previous matches
router.get('/previous', (req, res)=> {
  // send previous matched to the page
  res.json(JSON.stringify(previous));
})

// update app from survey page
router.post('/', (req, res)=>{
  // create a user
  let user = processData(req.body);
  // get a match based on user
  let match = getMatch(req.body);
  // add user to friends list
  friends.push(user);
  // add match to previous matched list
  previous.push({name: user.name, match: match.name});
  // send match back to front end
  res.json(match);
})


module.exports = router;

function processData(data){
  let user = {}
  // assign a name
  user['name'] = data.userName;
  // assign a photo
  user['photo'] = data.pictureName;
  // create an array of user responses
  let arr = [];
  for(let i = 1; i < 11; i++){
    arr.push(data[i]);
  }
  user["scores"] = arr;
  return user;
}


function getMatch(data){
  
}
