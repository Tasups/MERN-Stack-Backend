var { nanoid } = require("nanoid");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Jason Whisnant",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    return next(
      new HttpError("Email already exists. Please choose another one.", 422)
    )
  }

  const createdUser = {
    id: nanoid(),
    name, // name: name
    email,
    password
  };
  DUMMY_USERS.push(createdUser)

  res.status(201).json({ user: createdUser })
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email)
  if (!identifiedUser || identifiedUser.password !== password) {
    return next( // I am using return next instead of throw error
       new HttpError("Could not identify user, check your password and try again.", 401)
    )
  }

  res.json({message: 'Logged in!'})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
