const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'admin';
const Login = require('../models/loginModel');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const extuser = await Login.findOne({ email });
    if (extuser) {
      return res.status(401).json({ message: 'User already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new Login({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Generate token
        const token = jwt.sign({ email }, secretKey);
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};
