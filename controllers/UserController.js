const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");
const jwt = require("jsonwebtoken");

// Database
const { User, Folder } = require("../db/models");

exports.fetchUser = async (userId, next) => {
  try {
    const users = await User.findByPk(userId);
    return users;
  } catch (error) {
    next(error);
  }
};

exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};
exports.signup = async (req, res, next) => {
  const { password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    const defaultFolder = await Folder.create({
      userId: payload.id,
      name: "Your Receipts",
      defaultFolder: true,
      pin: false,
    });

    res.status(201).json({ token, defaultFolder });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// Update user profile
exports.userUpdate = async (req, res, next) => {
  try {
    await req.user.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Delete user used only in BE
exports.deleteUser = async (req, res, next) => {
  try {
    await req.user.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
