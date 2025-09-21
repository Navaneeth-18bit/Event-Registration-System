const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getRegistrations = async (req, res) => {
  const registrations = await prisma.registrations.findMany();
  res.json(registrations);
};

const createRegistration = async (req, res) => {
  const { eventId, participantName, participantEmail } = req.body;
  const registration = await prisma.registrations.create({
    data: { eventId, participantName, participantEmail },
  });
  res.json(registration);
};

module.exports = { getRegistrations, createRegistration };