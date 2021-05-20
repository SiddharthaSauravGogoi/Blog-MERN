export const verifyToken = (req, res, next) => {

  const Header = req.headers['access_token'];

  if (req.headers['access_token'] === 'null') {
    res.sendStatus(403)
  } else {
    req.userToken = Header;
    next();
  }
}