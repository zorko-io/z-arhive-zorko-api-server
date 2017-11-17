const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

module.exports = ({clientId, secret, callbackUrl}) => {
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
    clientID: clientId,
    clientSecret: secret,
    callbackURL: callbackUrl
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

  return passport
}
