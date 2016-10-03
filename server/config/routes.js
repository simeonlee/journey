module.exports = (app, db) => {
  app.get('/api/journal/:userId/:month/:day/:year', (req, res, next) => {
    db.User.getEntriesOnDate(req, res, next, req.params.userId, req.params.month, req.params.day, req.params.year);
  });

  app.post('/api/journal', (req, res, next) => {
    db.User.postEntry(req, res, next);
  });
}