var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const mysqlConnection = require('./connection.js');

module.exports = router;

router.post('/addLocation', (req, res) => {
    var location = req.body;

    var sql = "INSERT INTO location (Name, Country, City, Address) VALUES(?, ?, ?, ?)";
    mysqlConnection.query(sql, [location.name, location.country, location.city, location.address], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "Location successfully added!" });
            console.log("Location successfully added");
        }
    });
});

router.post('/addArtist', (req, res) => {
    var artist = req.body;
    var genreID = -1;

    var sql = "SELECT * FROM genre WHERE Name = ?"
    mysqlConnection.query(sql, [artist.genre], function (err, result1) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            if (result1.length == 1) {
                //Genre already exists
                console.log("Successfuly retrived genre")
                genreID = result1[0].idgenre;

                var sql = "INSERT INTO artist (Name, GenreID) VALUES (?, ?)";
                mysqlConnection.query(sql, [artist.name, genreID], function (err, result3) {
                    if (err) {
                        switch (err.code) {
                            default:
                                res.status(500).json({ msg: err.message });
                        }
                    }
                    else {
                        res.status(200).json({ msg: "Artist successfully added!" });
                        console.log("Artist successfully added");
                    }
                });
            }
            else {
                //there is no such genre
                var sql = "INSERT INTO genre (Name) VALUES (?)"
                mysqlConnection.query(sql, [artist.genre], function (err, result2) {
                    if (err) {
                        switch (err.code) {
                            default:
                                res.status(500).json({ msg: err.message });
                        }
                    }
                    else {
                        console.log("Successfuly inserted new genre");
                        genreID = result2.insertId;

                        var sql = "INSERT INTO artist (Name, GenreID) VALUES (?, ?)";
                        mysqlConnection.query(sql, [artist.name, genreID], function (err, result3) {
                            if (err) {
                                switch (err.code) {
                                    default:
                                        res.status(500).json({ msg: err.message });
                                }
                            }
                            else {
                                res.status(200).json({ msg: "Artist successfully added!" });
                                console.log("Artist successfully added");
                            }
                        });
                    }
                });
            }
        }
    });
});

router.get('/getArtist', (req, res) => {

    var artists;

    var sql = "SELECT * FROM artist";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            artists = result;

            var query = (req.query['q'] || '').toLowerCase();
            if (query) {
                const foundProducts = artists.filter(
                    (artist) => artist.name.toLowerCase().indexOf(query) != -1);
                return res.status(200).json(foundProducts);
            }
            return res.status(200).json(artists);
        }
    });
});

router.post('/deleteArtist', (req, res) => {
    var artist = req.body;

    var sql = "DELETE FROM artist WHERE Name = ?";
    mysqlConnection.query(sql, [artist.artistName], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "Artist successfully removed!" });
            console.log("Artist successfully removed!");
        }
    });
});

router.post('/deleteLocation', (req, res) => {
    var location = req.body;

    var sql = "DELETE FROM location WHERE Name = ?";
    mysqlConnection.query(sql, [location.locationName], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "Location successfully removed!" });
            console.log("Lrtist successfully removed!");
        }
    });
});

router.get('/getLocation', (req, res) => {

    var locations;

    var sql = "SELECT * FROM location";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            locations = result;

            var query = (req.query['q'] || '').toLowerCase();
            if (query) {
                const foundProducts = locations.filter(
                    (location) => location.name.toLowerCase().indexOf(query) != -1);
                return res.status(200).json(foundProducts);
            }
            return res.status(200).json(locations);
        }
    });
});

router.post('/addEvent', (req, res) => {
    var event = req.body;

    var locationID;
    var artistID;

    var sql = "SELECT * FROM location WHERE Name = ?";
    mysqlConnection.query(sql, [event.locationName], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            locationID = result[0].idlocation;
            var sql = "SELECT * FROM artist WHERE Name = ?";
            mysqlConnection.query(sql, [event.artistName], function (err, result2) {
                if (err) {
                    switch (err.code) {
                        default:
                            res.status(500).json({ msg: err.message });
                    }
                }
                else {
                    artistID = result2[0].idArtist;
                    var sql = "INSERT INTO event (Name, LocationID, artistID, Date, Price, Type, MaxTickets, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    mysqlConnection.query(sql, [event.name, locationID, artistID, event.date, event.price, event.type, event.maxTickets, event.picture], function (err, result2) {
                        if (err) {
                            switch (err.code) {
                                default:
                                    res.status(500).json({ msg: err.message });
                            }
                        }
                        else {
                            res.status(200).json({ msg: "Event successfully added!" });
                            console.log("Event successfully added");
                        }
                    });
                }
            });
        }
    });
});

router.get('/getEvent', (req, res) => {

    var events;
    var formatedEvents;

    var sql = "SELECT e.Name as eventName, l.Name as locationName, l.Country as country, l.City as city, l.Address as address, a.Name as artistName, g.Name as genreName, e.Date, e.Price, e.Type, e.MaxTickets, e.picture FROM event e JOIN location l ON e.LocationID = l.idlocation JOIN artist a ON e.ArtistID = a.idArtist JOIN genre g ON a.genreID = g.idgenre";
    mysqlConnection.query(sql, function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            events = result;

            var query = (req.query['q'] || '').toLowerCase();
            if (query) {
                const foundProducts = events.filter(
                    (event) => event.name.toLowerCase().indexOf(query) != -1);
                return res.status(200).json(foundProducts);
            }

            for (let i = 0; i < events.length; i++) {
                events[i]
            }

            formatedEvents = events.map(x => {
                return {
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
                }
            });

            return res.status(200).json(formatedEvents);
        }
    });
});

router.post('/deleteEvent', (req, res) => {
    var event = req.body;

    var sql = "DELETE FROM event WHERE Name = ?";
    mysqlConnection.query(sql, [event.eventName], function (err, result) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(500).json({ msg: err.message });
            }
        }
        else {
            res.status(200).json({ msg: "Event successfully removed!" });
            console.log("Event successfully removed!");
        }
    });
});