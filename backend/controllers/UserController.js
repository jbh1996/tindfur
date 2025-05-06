const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');  // Make sure the path is correct

// Create User Account
const createAccount = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ Error: 'Incomplete fields' });
  }

  // Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ Error: 'Email already exists' });

  const hashedPw = await bcrypt.hash(password, 10);
  const newAccount = new User({
    email,
    password: hashedPw,
    role,
    username: email,
    description: "",
    dogsOwned: 0,
    catsOwned: 0,
    otherOwned: 0,
    profilePic: "https://tindfurpics.s3.us-east-2.amazonaws.com/blankprofile.webp"
  });
  await newAccount.save();

  console.log(req.body);
  res.status(201).json({ message: 'Account Created Successfully' });
};

// Update User Account
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const allowedFields = [
      'email',
      'password',
      'role',
      'username',
      'description',
      'dogsOwned',
      'catsOwned',
      'otherOwned',
      'profilePic'
    ];

    Object.keys(updates).forEach((key) => {
      if (!allowedFields.includes(key)) {
        delete updates[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Login User Account
const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ Error: 'Email is required' });
  if (!password) return res.status(400).json({ Error: 'Password is required' });

  try {
    const account = await User.findOne({ email });
    if (!account) return res.status(401).json({ Error: 'Invalid email' });

    const pw = await bcrypt.compare(password, account.password);
    if (!pw) return res.status(401).json({ Error: 'Invalid password' });

    const payload = {
      id: account._id,
      email: account.email,
      role: account.role
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '2h' });

    res.json({
      token,
      user_type: account.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: 'Server error' });
  }
};

module.exports = { createAccount, loginAccount, updateAccount };
