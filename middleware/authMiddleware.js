const protect = (req, res, next) => {
  const { user } = req.session;

  // if (!user) {
  //   return res.status(403).send({
  //     status: 'fail',
  //     message: 'Unauthorized to acess this route'
  //   });
  // }
  req.user = user;

  next();
};

module.exports = protect;
