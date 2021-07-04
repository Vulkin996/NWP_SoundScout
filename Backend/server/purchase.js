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
    var formatedTickets
    var username = (req.query['u'] || '');

    var sql = "SELECT u.username, r.firstName, r.lastName, e.Name as eventName, l.Name as locationName, l.Country as country, l.City as city, l.Address as address, a.Name as artistName, g.Name as genreName, e.Date, e.Price, e.Type, e.MaxTickets, e.picture, r.paymentMethod, r.dateReserved FROM reservation r JOIN user u ON r.userID = u.iduser JOIN event e ON r.eventID = e.idevent JOIN location l ON e.LocationID = l.idlocation JOIN artist a ON e.ArtistID = a.idArtist JOIN genre g ON a.GenreID = g.idgenre WHERE u.username = ?";
    mysqlConnection.query(sql, [username], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            tickets = result;

            formatedTickets = tickets.map(x => {
                return {
                    event: {
                        eventName: x.eventName,
                        Location: {
                            Name: x.locationName,
                            Country: x.country,
                            City: x.city,
                            Address: x.address
                        },
                        Artist: {
                            Name: x.artistName,
                            Genre: x.genreName
                        },
                        Date: x.Date,
                        Price: x.Price,
                        Type: x.Type,
                        MaxTickets: x.MaxTickets,
                        Picture: x.picture
                    },
                    firstName: x.firstName,
                    lastName: x.lastName,
                    payment: x.paymentMethod,
                    datePurchased: x.dateReserved
                }
            });

            return res.status(200).json(formatedTickets);
        }
    });
});

module.exports = router;