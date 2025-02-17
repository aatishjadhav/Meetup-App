const { inititalizeDb } = require("./db/db.connect");
const Event = require("./models/event.models");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

inititalizeDb();

app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000;

async function createEvents(events) {
  try {
    const addEvents = new Event(events);
    const saveEvents = addEvents.save();
    return saveEvents;
  } catch (error) {
    console.log(error);
  }
}

app.post("/events", async (req, res) => {
  try {
    const newEvents = await createEvents(req.body);
    if (newEvents) {
      res
        .status(201)
        .json({ message: "New event created successfully", events: newEvents });
    } else {
      res.status(400).json({ error: "Failed to add event in databse" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add events", error });
  }
});

async function getAllEvents() {
  try {
    const getEvents = await Event.find();
    return getEvents;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events", async (req, res) => {
  try {
    const findEvents = await getAllEvents();
    if (findEvents.length > 0) {
      res
        .status(200)
        .json({ message: "Events fetched successfully", events: findEvents });
    } else {
      res.status(404).json({ error: "Failed to fetch events from database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

async function getEventById(eventId) {
  try {
    const findEventById = await Event.findById(eventId);
    return findEventById;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const getEvent = await getEventById(req.params.eventId);
    if (getEvent) {
      res.status(200).json({
        message: "Event fetched successfully",
        events: getEvent,
      });
    } else {
      res.status(404).json({ error: "Event not found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

async function getEventByTitle(eventTitle) {
  try {
    const findEvent = await Event.find({ eventName: eventTitle });
    return findEvent;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/titles/:eventTitle", async (req, res) => {
  try {
    const getEvent = await getEventByTitle(req.params.eventTitle);
    if (getEvent) {
      res.status(200).json({
        message: "Event fetched by title successfully",
        events: getEvent,
      });
    } else {
      res.status(404).json({ error: "Event not found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

async function updateEvents(Id, dataToUpdate) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(Id, dataToUpdate, {
      new: true,
    });
    return updatedEvent;
  } catch (error) {
    console.log(error);
  }
}

app.post("/events/:eventId", async (req, res) => {
  try {
    const getUpdatedEvent = await updateEvents(req.params.eventId, req.body);
    if (getUpdatedEvent) {
      res.status(200).json({
        message: "Event updated successfully",
        events: getUpdatedEvent,
      });
    } else {
      res.status(404).json({ error: "Event not found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

async function getEventByType(type) {
  try {
    const getType = await Event.find({ eventType: type });
    return getType;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/types/:type", async (req, res) => {
  try {
    const findEventType = await getEventByType(req.params.type);
    if (findEventType) {
      res
        .status(200)
        .json({ message: "Event fetched successfully", events: findEventType });
    } else {
      res.status(404).json({ error: "Event not found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

async function readEventByTitleAndTags(title) {
  try {
    const events = await Event.find({ eventName: title });
    if (events.length > 0) {
      return events;
    } else {
      const tagEvents = await Event.find({ eventTags: title });
      if (tagEvents.length > 0) {
        return tagEvents;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/search/:title", async (req, res) => {
  try {
    const getEvents = await readEventByTitleAndTags(req.params.title);
    if (getEvents) {
      res.json(getEvents);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get events", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
