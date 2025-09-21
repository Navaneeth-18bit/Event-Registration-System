const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getEvents = async (req, res) => {
  const events = await prisma.events.findMany();
  res.json(events);
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await prisma.events.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(event);
};

const createEvent = async (req, res) => {
  const { eventName, organizerName, date } = req.body;
  const dateObj = new Date(date);
  const event = await prisma.events.create({
    data: { eventName, organizerName, date: dateObj },
  });
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  await prisma.events.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Event deleted succesfully" });
};

module.exports = { getEvents, getEventById, createEvent, deleteEvent };
