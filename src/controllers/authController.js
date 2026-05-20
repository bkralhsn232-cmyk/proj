
import user from '../models/user.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'يرجى إدخال جميع الحقول المطلوب' });
    }

    const userExists = await user.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل' });
    }

    const user = await user.create({
      username,
      email,
      password
    });

    req.session.userId = user._id;

    res.status(201).json({
      message: 'تم تسجيل الحساب بنجاح',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم (Server Error)', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
    }

    const user = await user.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }


    req.session.userId = user._id;

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم (Server Error)', error: error.message });
  }
};


export const logoutUser = (req, res) => {
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'فشل في تسجيل الخروج' });
    }
    
    // Clear the cookie from the client browser/Thunder Client
    res.clearCookie('sid'); 
    return res.status(200).json({ message: 'تم تسجيل الخروج بنجاح' });
  });
};











