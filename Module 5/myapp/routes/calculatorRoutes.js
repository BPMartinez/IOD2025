const express = require('express');
const router = express.Router();


// router.get('/add', (req, res) => {
//     console.log(req.query)
//     res.send(req.query)
// })

router.get('/add', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = number1 + number2
    console.log(sum)
    res.status(200)
})
module.exports = router;