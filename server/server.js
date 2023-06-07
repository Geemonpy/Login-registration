const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'admin';
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Define the Login model
const loginSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const Login = mongoose.model('Login', loginSchema, 'Login');

// API  registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const extuser = await Login.findOne({ email })
    if(extuser){
      res.status(401).json({ message: 'User already exist' });
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
});

// API  login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {

         // genrate token
         const token = jwt.sign({ email }, secretKey);

        res.status(200).json({ message: 'Login successful',token });
      

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
});

app.listen(3000);


// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// const routes = require('./routes');

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Use routes
// app.use('/api', routes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
