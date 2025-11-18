const express = require('express')
const testRoutes = require('.routes/myTestRoutes')
const calculatorRoutes = require('./routes/calculatorRoutes');
 
const app = express()
const port = 3000

app.use('/', express.static('public'))
app.use('/mytest', testRoutes)
app.use('/calculator', calculatorRoutes);

// app.get('/test', (req, res) => {
// res.send('Hello World!')
// })

app.listen(port, () => {
console.log(`Example app listening at
http://localhost:${port}`)
})