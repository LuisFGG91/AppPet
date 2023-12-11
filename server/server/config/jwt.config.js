// authenticate.js
import jwt from 'jsonwebtoken';

const secret = "I can't believe this key is so secret!";

const authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
}

export { authenticate };
