const router = require('express').Router();
const path = require('path');
const {previous, friends}  = require('../data/friends.js');


// display json of all possible friends
router.get('/', (req, res)=>{
    res.json(friends);
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
  let match = getMatch(user);
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


function getMatch(user){
  // use a variance algorithm the friends scores that are closest to zero should be matched
  let variance = [];
  friends.forEach(friend => {

     variance.push(compareArray(user.scores, friend.scores)); 
  })
  let indexOfMatch = 0;
  // check each variance total to see which is closest to 0
  variance.forEach((item, index) => {
     let currentMatch = variance[indexOfMatch];
     if(item >= currentMatch){
       indexOfMatch = index;
     }
  })

  // return the selected friend
  return friends[indexOfMatch];
}

// compare both arrays
function compareArray(arr1, arr2){
    perfectScore = (arr2.length * arr2.length)
    let total = 0;
    for(let i = 0; i < arr1.length; i++){
      total += (parseInt(arr1[i]) + parseInt(arr2[i]));
    }
    console.log(perfectScore - total)
    return perfectScore - total;
}
