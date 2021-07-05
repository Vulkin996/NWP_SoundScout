var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const mysqlConnection = require('./connection.js');

router.post('/login', (req, res) => {
    var user = req.body;

    var sql = "SELECT username, email, password, isAdmin, dateRegistered FROM user WHERE email = ? AND password = ?";
    mysqlConnection.query(sql, [user.email, user.password], function (err, result) {
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

                if (result[0].isAdmin) {
                    res.json({
                        msg: 'Successfully logged in',
                        username: result[0].username,
                        date: result[0].dateRegistered,
                        token: jwt.sign({ user: result[0].username }, 'SECRET'),
                        adminToken: jwt.sign({ user: result[0].username }, 'ADMINSECRET')
                    });
                }
                else {
                    res.json({
                        msg: 'Successfully logged in',
                        username: result[0].username,
                        date: result[0].dateRegistered,
                        token: jwt.sign({ user: result[0].username }, 'SECRET')
                    });
                }
            }
        }
    });
});

router.post('/register', (req, res) => {
    var user = req.body;

    var date = new Date();

    var sql = "INSERT INTO user (username, email, password, dateRegistered) VALUES (?, ?, ?, ?)";
    mysqlConnection.query(sql, [user.username, user.email, user.password, date], function (err, result) {
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
            res.status(200).json({ msg: 'You have been registered successfully! Please login' });
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

router.post('/changePassword', (req, res) => {
    var user = req.body;

    var sql = "SELECT iduser, password FROM user WHERE username = ?";
    mysqlConnection.query(sql, [user.username], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            if (result.length != 1) {
                res.status(500).json({ msg: "User not found!" });
            }
            else if (result[0].password != user.oldPassword) {
                res.status(400).json({ msg: "Old password is not correct!" });
            }
            else {
                var sql = "UPDATE user SET password = ? WHERE iduser = ?";
                mysqlConnection.query(sql, [user.newPassword, result[0].iduser], function (err, result2) {
                    if (err) {
                        switch (err.code) {
                            default:
                                res.status(500).json({ msg: err.message });
                        }
                    }
                    else {
                        res.status(200).json({ msg: "Password changed successfully!" });
                    }
                });
            }
        }
    });
});

module.exports = router;