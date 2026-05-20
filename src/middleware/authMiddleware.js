const protect = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
    return res.status(401).json({ message: 'You are not authorized to access this resource' });
};
export default protect;