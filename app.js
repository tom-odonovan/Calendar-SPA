const express = require("express")

const bodyParser = require("body-parser")

const app = express();

const PORT = 3000;

app.use(bodyParser.json())
app.use(express.static('static'))

// Build a basic express app with 1 endpoint /api/hello returns 200, { message: “Hello” }

app.get('/api/hello', (req, res) => {
    res.status(200).json({'message': "Hello"})
}) 


app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`)
})     