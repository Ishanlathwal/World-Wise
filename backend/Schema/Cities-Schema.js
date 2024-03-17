const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  emoji: {
    type: String,
  },
  date: {
    type: Date,
  },
  notes: {
    type: String,
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  userId: {
    type: Number,
  },
});

const City = mongoose.model("cities", citySchema);

module.exports = City;
