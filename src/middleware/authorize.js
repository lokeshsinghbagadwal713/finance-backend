const authorize = (...allowedRoles) => (req, res, next) => {
  if(!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden: Access denied' });
  }
  next();
};

export default authorize;