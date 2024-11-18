const express = require('express');
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  
  }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const JWT_SECRET = "Deek"; 
app.post('/register', async (req, res) => {
    try {
      let { username, email, password,location,pincode, } = req.body;
  
      if (!username || !email || !password||!location||!pincode) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          let newUser = await userModel.create({ username, email, password: hash,location,pincode });
          
          let token = jwt.sign({ email: email, userid: newUser._id }, "Deek");
          res.cookie("tokens", token, { httpOnly: true });
          return res.status(200).json({ message: "Registration successful" });
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "An error occurred during registration." });
    }
  });
  
app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result) {
                let token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
                res.cookie("tokens", token, { httpOnly: true });
                res.status(200).json({ message: "Login successful", token });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post('/logout', (req, res) => {
    res.cookie("tokens", " ", { httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
});
function isloggedin(req, res, next) {
    let token = req.cookies.tokens;
    if (!token || token === " ") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        let data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
}
app.get('/profile', isloggedin, async (req, res) => {
    try {
      const user = await userModel.findById(req.user.userid, { username: 1, email: 1, location: 1, pincode: 1 });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      return res.status(200).json({ message: 'Profile fetched successfully.', user });
    } catch (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ message: 'Failed to fetch profile.' });
    }
  });
  

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
