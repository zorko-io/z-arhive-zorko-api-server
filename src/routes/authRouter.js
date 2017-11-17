const express = require('express')
const config = require('../config')

module.exports = (
  passport,
  ensureAuthenticated,
  expres = express,
  zorkoWebAppUrl = config.auth.zorkoWebAppUrl
) => {
  const router = express.Router()

  router.get('/auth/github',
    passport.authenticate('github', {scope: ['user:email']})
  )

  router.get('/auth/account', ensureAuthenticated, (req, res) => {
    res.send({user: req.user})
  })

  router.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: zorkoWebAppUrl
    }),
    (req, res) => {
      console.log('Before Zorko redirect sessionID: ', req.sessionID)
      res.redirect(zorkoWebAppUrl)
    }
  )

  router.get('/auth/logout', ensureAuthenticated, (req, res) => {
    req.logout()
    res.redirect(zorkoWebAppUrl)
  })

  return router
}
