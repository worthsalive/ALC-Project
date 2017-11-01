const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);///fire the noteRoutes function
  // Other route groups could go here, in the future
};
