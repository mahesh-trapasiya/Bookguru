const User = require("../Models/User");

/* exports.get = (req, res) => {
  res.json({
    books: [{ title: "First Book" }],
  });
}; */

exports.addUser = (req, res) => {
  const user = new User(req.body);

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      user: result,
    });
  });
};
