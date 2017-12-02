const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')
const partials = require('express-partials')
const config = require('./config')
const ensureAuthenticated = require(
  './util/ensureAuthenticated'
).ensureAuthenticated

const prepareGithubPassport = require('./passport/prepareGithubPassport')

const authRoutes = require('./routes/authRouter')
const workspaceRouter = require('./routes/workspaceRouter')

const passport = prepareGithubPassport({
  clientId: config.auth.github.clientId,
  secret: config.auth.github.secret,
  callbackUrl: config.auth.github.callbackUrl
})

const app = express()

app.use(morgan('combined'))
app.use(partials())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors({
  origin: config.auth.zorkoWebAppUrl,
  credentials: true
}))

app.use(session({
  secret: config.auth.sessionSecret,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes(
  passport,
  ensureAuthenticated
))
app.use(workspaceRouter())

app.listen(config.port)
