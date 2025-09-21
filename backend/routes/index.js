const router = require("express").Router();
const {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent,
} = require("../controllers/events");

const {
    getRegistrations,
    createRegistration,
} = require("../controllers/registrations")

router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.post("/events", createEvent);
router.delete("/events/:id",deleteEvent);

router.get("/registrations", getRegistrations);
router.post("/registrations", createRegistration);

module.exports = router;