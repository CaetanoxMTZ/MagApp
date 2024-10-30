const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/User');
const { UserToken } = require('../models/UserToken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const uuid = uuidv4();

  try {
    const user = await User.create({ uuid, email, password: hashedPassword });
    const token = jwt.sign({ uuid }, 'your_jwt_secret');
    await UserToken.create({ uuid, jwt: token });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ uuid: user.uuid }, 'your_jwt_secret');
    await UserToken.update({ jwt: token }, { where: { uuid: user.uuid } });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
