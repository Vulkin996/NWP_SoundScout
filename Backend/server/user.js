var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const mysqlConnection = require('./connection.js');

router.post('/login', (req, res) => {
    var user = req.body;

    var sql = "SELECT email, password, isAdmin FROM user WHERE email = '" + user.email + "' AND password = '" + user.password + "'";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            if (result.length != 1) {
                console.log("Invalid login!");
                res.status(400).json({ msg: 'Invalid username or password' });
            }
            else {
                console.log("User successfully logged in");

                if(result[0].isAdmin){
                    console.log("User is an admin");
                    res.json({
                        msg: 'Successfully logged in',
                        token: jwt.sign({ user: user.username }, 'SECRET'),
                        adminToken: jwt.sign({ user: user.username }, 'ADMINSECRET')
                    });
                }
                else {
                    res.json({
                        msg: 'Successfully logged in',
                        token: jwt.sign({ user: user.username }, 'SECRET')
                    });
                }
            }
        }
    });
});

router.post('/register', (req, res) => {
    var user = req.body;

    var sql = "INSERT INTO user (username, email, password) VALUES ('" + user.username + "', '" + user.email + "', '" + user.password + "' )";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                case 'ER_DUP_ENTRY':
                    res.status(400).json({ msg: 'User already exists, please login.' });
                    break;
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            console.log("User successfully registered");
        }
    });
});

var checkIfLoggedIn = (req, res, next) => {
    var token = req.get('X-AUTH-HEADER');
    var user = jwt.decode(token);
    if (user && user.user) {
        return next();
    }
    return res.status(403).json({ msg: 'Please login to access this information' });
};

router.get('/getUsername', (req, res) => {

    var events;

    var sql = "SELECT username, email, isAdmin FROM user";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            users = result;

            var query = (req.query['q'] || '').toLowerCase();
            if (query) {
                const foundProducts = users.filter(
                    (user) => user.name.toLowerCase().indexOf(query) != -1);
                return res.status(200).json(foundProducts);
            }
            return res.status(200).json(users);
        }
    });
});

router.post('/deleteUser', (req, res) => {
    var user = req.body;

    var sql = "DELETE FROM user WHERE username = ?";
    mysqlConnection.query(sql, [user.username], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "User successfully removed!" });
            console.log("User successfully removed!");
        }
    });
});

router.post('/giveAdmin', (req, res) => {
    var user = req.body;

    var sql = "UPDATE user SET isAdmin = 1 WHERE username = ?";
    mysqlConnection.query(sql, [user.username], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "User successfully promoted!" });
            console.log("User successfully promoted!");
        }
    });
});

module.exports = router;