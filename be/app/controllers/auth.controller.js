import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { secretKey } from '../../config/config'

export const register = (req, res) => {
  const { email, password, name } = req.body.userDetails
  const userData = {
    email, password, name,
  }
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the credentials" })
  }
  User.findOne({ email })
    .then((data) => {
      if (data) {
        res.send({ error: 'Email already registered' });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData, (err, data) => {
            res.status(200).send('User successfully registered to the app.')
          })
        })
      }
    })
    .catch((err) => res.send({ error: err }))
};

export const login = (req, res) => {

  const { email, password } = req.body.userDetails;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: 'Account not found' })
      } else {
        if (!bcrypt.compareSync(password, user.password)) {
          res.send({ error: "You entered a wrong password" })
        } else if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            id: user._id,
            email: user.email
          }
          let token = jwt.sign(payload, secretKey, {
            expiresIn: "1h"
          });
          res.status(200).json({ token, user: user.toJSON() });

        }
      }
    })
    .catch((err) => res.json({ error: err }))
}


