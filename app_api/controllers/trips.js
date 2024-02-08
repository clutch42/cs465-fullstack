const mongoose = require('mongoose'); //.set('debug',true);
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
const tripList = async (req, res) => {
    Model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res  
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (trip.length === 0) {    // had to change this because .exec was returning [] so !trip wasn't catching that there was no trip in the array
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
}

module.exports = { tripList, tripsFindByCode };