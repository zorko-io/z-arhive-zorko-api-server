const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')
const partials = require('express-partials')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const config = require('./config')
const GetWorkspaceAction = require('./action/GetWorkspaceAction')

passport.serializeUser(function (user, done) {
  console.log('serialize user')
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  console.log('deserialize user')
  done(null, obj)
})

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
  clientID: config.auth.github.clientId,
  clientSecret: config.auth.github.secret,
  callbackURL: config.auth.github.callbackUrl
},
function (accessToken, refreshToken, profile, done) {
  console.log('start verify')

  // asynchronous verification, for effect...
  process.nextTick(function () {
    console.log('verified')
    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.
    return done(null, profile)
  })
}
))

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

app.get('/auth/github',
  passport.authenticate('github', {scope: ['user:email']})
)

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(403).send({error: {code: 'NOT_AUTHORIZED_SESSION'}})
  }
}

app.get('/auth/account', ensureAuthenticated, (req, res) => {
  res.send({user: req.user})
})

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: config.auth.zorkoWebAppUrl
  }),
  (req, res) => {
    console.log('Before Zorko redirect sessionID: ', req.sessionID)
    res.redirect(config.auth.zorkoWebAppUrl)
  }
)

app.get('/api/workspaces/:repositoryUri', async (request, response, next) => {
  const result = await GetWorkspaceAction.execute(request.params)
  response.send(result)
})

app.get('/auth/logout', ensureAuthenticated, (req, res) => {
  req.logout()
  res.redirect(config.auth.zorkoWebAppUrl)
})

app.listen(config.port)
