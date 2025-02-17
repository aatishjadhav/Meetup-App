const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Online", "Offline", "Other"],
      required: true,
    },
    hostedBy: {
      type: String,
      required: true,
    },
    eventImgUrl: {
      type: String,
      required: true,
    },
    eventDetails: {
      type: String,
      required: true,
    },
    additionalInfo: {
      dressCode: {
        type: String,
      },
      ageRestriction: {
        type: String,
      },
    },
    eventTags: [{ type: String }],
    sessionTimings: {
      fromDate: { type: String, required: true },
      fromTime: { type: String, required: true },
      toDate: { type: String, required: true },
      toTime: { type: String, required: true },
    },
    address: {
      location: {
        type: String,
      },
      venue: {
        type: String,
      },
    },
    price: {
      type: Number,
    },
    speakers: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
