const express = require("express")
const usersRouter = require("./controllers/users")
const eventsRouter = require("./controllers/events")
const calendarsRouter = require("./controllers/calendars")
const bodyParser = require("body-parser")

const app = express();

const PORT = 3000;

app.use(bodyParser.json())
app.use('/', express.static('static'))


app.use("/api/events", eventsRouter)
app.use("/api/users", usersRouter)
app.use("/api/calendars", calendarsRouter)

app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`)
})     