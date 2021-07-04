var express = require('express');
var router = express.Router();

const mysqlConnection = require('./connection.js');

router.post('/makePurchase', (req, res) => {
    var data = req.body;
    var userID;
    var eventID;

    var sql = "SELECT iduser from  user WHERE username = ?"
    mysqlConnection.query(sql, [data.username], function (err, result1) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            if (result1.length != 1) {
                res.status(500).json({ msg: err.message });
            }
            else {
                userID = result1[0].iduser;
                var sql = "SELECT idevent from event WHERE Name = ?"
                mysqlConnection.query(sql, [data.eventName], function (err, result2) {
                    if (err) {
                        switch (err.code) {
                            default:
                                res.status(500).json({ msg: err.message });
                        }
                    }
                    else {
                        if (result1.length != 1) {
                            res.status(500).json({ msg: err.message });
                        }
                        else {
                            eventID = result2[0].idevent;
                            var date = new Date();
                            var sql = "INSERT INTO reservation (userID, eventID, email, firstName, lastName, Country, City, zip, Address, AddressOpt, paymentMethod, dateReserved) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            mysqlConnection.query(sql, [userID, eventID, data.email, data.firstName, data.lastName, data.country, data.city, data.zip, data.address, data.address2, data.payment, date], function (err, result) {
                                if (err) {
                                    switch (err.code) {
                                        default:
                                            res.status(500).json({ msg: err.message });
                                    }
                                }
                                else {
                                    res.status(200).json({ msg: "Thank you for you purchase!" });
                                    console.log("Reservation successfully added");
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

router.get('/getTickets', (req, res) => {

    var tickets;
    var username = (req.query['u'] || '');

    var sql = "SELECT * FROM reservation r JOIN user u ON r.userID = u.iduser WHERE u.username = ?";
    mysqlConnection.query(sql, [username], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            tickets = result;
            return res.status(200).json(tickets);
        }
    });
});

module.exports = router;