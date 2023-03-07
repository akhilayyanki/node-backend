const express = require('express');

const router = express.Router();

//executed for every request
// express uses the 'startswith' operator for path

//get does exact matching wherea use does prefix matching
router.get('/',(req,res,next) => {
    res.send("<h1>express homepage it is</h1>");
});

module.exports = router;