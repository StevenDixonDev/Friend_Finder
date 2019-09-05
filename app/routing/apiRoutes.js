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
  // create an empty user
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
  // give user a score  arr
  user["scores"] = arr;
  return user;
}


function getMatch(user){
  // use a variance algorithm the friends scores that are closest to zero should be matched
  let variance = [];
  friends.forEach(friend => {
     variance.push(compareArray(user.scores, friend.scores)); 
  });
  let indexOfMatch = 0;
  // check each variance total to see which is closest to 0
  variance.forEach((item, index) => {
     let currentMatch = variance[indexOfMatch];
     if(item > currentMatch){
       indexOfMatch = index;
     }
  });
  // return the selected friend
  return friends[indexOfMatch];
}

// compare both arrays
function compareArray(arr1, arr2){
    // tabulate the perfect score
    let perfectScore = arr1.length + arr2.length;
    // create a storage for the score of the match
    let total = 0;
    // loop through arr1
    arr1.forEach((user, index) => {
      // subtract users score from current friend score
      let score = parseInt(user) - parseInt(arr2[index]);
      // if score is negative flip it so that it is positive
      if(score < 0){
        score *= -1;
      }
      // if the score is within one point the algorithm awards 1 point
      if(score === 0){
        total += 1;
      }    
    }) 
    // return the total
    return total;
}
