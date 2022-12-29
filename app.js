const express = require("express")
const usersRouter = require("./controllers/users")
const eventsRouter = require("./controllers/events")
const calendarsRouter = require("./controllers/calendars")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const db = require("./db/db")
const pgSession = require("connect-pg-simple")(expressSession)

const app = express();

const PORT = 3000;

app.use(bodyParser.json())
app.use('/', express.static('static'))

app.use("/api/events", eventsRouter)
app.use("/api/users", usersRouter)
app.use("/api/calendars", calendarsRouter)


app.use(expressSession({
    store: new pgSession({
        pool: db,
        createTableIfMissing: true,
    }),
    secret: process.env.SECRET
}))

app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`)
})     