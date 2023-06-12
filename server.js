const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { sequelize, User, Poll, Option } = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your secret here', resave: false, saveUninitialized: true }));

app.get('/', async (req, res) => {
    let polls = await Poll.findAll({ include: ['creator', 'options'] });
    let html = '';
    for (let poll of polls) {
        html += poll.name + ' by ' + poll.creator.username + '<br>';
        for (let option of poll.options) {
            html += option.text + '<br>';
        }
        html += '<br>';
    }
    res.send(html);
});

app.get('/login', (req, res) => {
    res.send('<form method="POST"><input name="username" placeholder="Username"><input name="password" type="password" placeholder="Password"><button type="submit">Login</button></form>');
});

app.post('/login', async (req, res) => {
    let user = await User.findOne({ where: { username: req.body.username, password: req.body.password } });
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

app.listen(3000, async () => {
    await sequelize.sync();
    console.log('Server started on http://localhost:3000');
});
