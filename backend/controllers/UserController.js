const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/users');


// Create User Account
const createAccount = async (req, res) => {
  const { name, email, password, role, emailPrefs } = req.body;

  // Return error if fields are incomplete
  if (!name || !email || !password || !role || (role === 'user' && emailPrefs?.newPetProfiles === undefined)) {
    return res.status(400).json({ message: 'Incomplete fields' });
  }



  // Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ Error: 'Email already exists' });
  
  // Hash passwords
  const hashedPw = await bcrypt.hash(password, 10);

  const profilePic = req.file ? req.file.location : null;

  // Create new user account
  const newAccount = new User({ 
    name, 
    email, 
    password: hashedPw, 
    role, 
    username: email, 
    description: "", 
    dogsOwned: 0, 
    catsOwned: 0, 
    otherOwned:0, 
    profilePic,
    emailPrefs: {
      newPetProfiles: role === 'user' ? emailPrefs?.newPetProfiles || false : false
    }
   });
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


// Update User Account
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { username, description, dogsOwned, catsOwned, otherOwned, profilePic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        description,
        dogsOwned,
        catsOwned,
        otherOwned,
        profilePic
      },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = { createAccount, loginAccount, updateAccount };


