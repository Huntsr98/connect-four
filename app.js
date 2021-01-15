const express = require('express')
const app = express()
const port = 3000
let cache = ['hello']
const myDB = {}


app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.post('/form-entry', (req, res) => {
    console.log(req)
    cache.push(req.body.test)
    res.redirect('/')
})
app.get('/last-entry', (req, res) => {
    res.send(cache.join(', '))
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



