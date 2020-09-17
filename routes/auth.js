module.exports = {
    ensureAuthenticated: function(req, res, next) {
      console.log(req.isAuthenticated());
      if (req.isAuthenticated()) {
        return next();
      }
      console.log("User is not authenticated");
      //req.flash('error_msg', 'Please log in to view that resource');
      //res.send('/users/login');
      res.send("login again");
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.send("success");     
    }
  };