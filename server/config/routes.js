module.exports = (app, db) => {
  app.get('/api/journal/:userId/:date', (req, res, next) => {
    db.User.getEntriesOnDate(req, res, next, req.params.userId, req.params.date);
  });

  app.post('/api/journal', (req, res, next) => {
    db.User.postEntry(req, res, next);
  });
}