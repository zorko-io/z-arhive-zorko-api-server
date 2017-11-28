function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(403).send({error: {code: 'NOT_AUTHORIZED_SESSION'}})
  }
}

module.exports = {
  ensureAuthenticated
}
