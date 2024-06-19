const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

sequelize.sync()
  .then(() => {
    console.log('Connected to MySQL');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MySQL connection error:', error);
  });
