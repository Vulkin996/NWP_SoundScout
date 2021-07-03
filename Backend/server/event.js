var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const mysqlConnection = require('./connection.js');

module.exports = router;

router.post('/addLocation', (req, res) => {
    var location = req.body;

    var sql = "INSERT INTO location (Name, Country, City, Address) VALUES ('" + location.name + "', '" + location.country + "', '" + location.city + "', '" + location.address + "' )";
    mysqlConnection.query(sql, function (err, result) {
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

    var sql = "SELECT * FROM genre WHERE Name = '" + artist.genre + "'"
    mysqlConnection.query(sql, function (err, result1) {
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

                var sql = "INSERT INTO artist (Name, GenreID) VALUES ('" + artist.name + "', " + genreID + " )";
                mysqlConnection.query(sql, function (err, result3) {
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
                var sql = "INSERT INTO genre (Name) VALUES ('" + artist.genre + "' )"
                mysqlConnection.query(sql, function (err, result2) {
                    if (err) {
                        switch (err.code) {
                            default:
                                res.status(500).json({ msg: err.message });
                        }
                    }
                    else {
                        console.log("Successfuly inserted new genre");
                        genreID = result2.insertId;

                        var sql = "INSERT INTO artist (Name, GenreID) VALUES ('" + artist.name + "', " + genreID + " )";
                        mysqlConnection.query(sql, function (err, result3) {
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

    var sql = "DELETE FROM artist WHERE Name = '" + artist.artistName + "'";
    mysqlConnection.query(sql, function (err, result) {
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

    var sql = "DELETE FROM location WHERE Name = '" + location.locationName + "'";
    mysqlConnection.query(sql, function (err, result) {
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