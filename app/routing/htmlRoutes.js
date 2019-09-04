const router = require('express').Router();
const path = require('path');

// display the home page
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/home.html'));
})

// display the survey page
router.get('/survey', (req, res)=>{
  res.sendFile(path.join(__dirname, '../public/survey.html'));
})

module.exports = router;