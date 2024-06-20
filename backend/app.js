const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/config').development; // Adjust this as necessary

require('./config/passportConfig')(passport);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/loginRouter'));

// Example protected route
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to the dashboard');
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
