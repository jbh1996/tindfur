const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/Users');


// Create User Account
const createAccount = async (req, res) => {
  const { email, password, role } = req.body;

  // Return error if fields are incomplete
  if (!email || !password || !role) {
    return res.status(400).json({ Error: 'Incomplete fields' });
  }


  // Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ Error: 'Email already exists' });
  
  // Hash passwords
  const hashedPw = await bcrypt.hash(password, 10);

  // Create new user account
  const newAccount = new User({ email, password: hashedPw, role, username: email, description: "", dogsOwned: 0, catsOwned: 0, otherOwned:0, profilePic: "https://tindfurpics.s3.us-east-2.amazonaws.com/blankprofile.webp" });
  await newAccount.save();

  console.log(req.body)

  res.status(201).json({ message: 'Account Created Successfully' });

};

// Login User Account
const loginAccount= async (req, res) => {
    const { email, password } = req.body;
    
    // Check if email or password is missing
    if (!email) return res.status(400).json({ Error: 'Email is required' });
    if (!password) return res.status(400).json({ Error: 'Password is required' });
  
    try {
      
      // Check if email is correct
      const account = await User.findOne({ email });
      if (!account) return res.status(401).json({ Error: 'Invalid email' });
  
      // Check if password is correct
      const pw = await bcrypt.compare(password, account.password);
      if (!pw) return res.status(401).json({ Error: 'Invalid password' });
  
      // Generate authentication token
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


module.exports = { createAccount, loginAccount };

