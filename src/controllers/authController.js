
import user from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const userExists = await user.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username or email is already in use' });
    }

    const user = await user.create({
      username,
      email,
      password
    });

    req.session.userId = user._id;

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const user = await user.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }


    req.session.userId = user._id;

    res.status(200).json({
      message: 'login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const logoutUser = (req, res) => {
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'logout failure' });
    }
    
    
    res.clearCookie('sid'); 
    return res.status(200).json({ message: 'logout successful' });
  });
};











