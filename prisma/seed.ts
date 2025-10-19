import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

async function main() {
  await prisma.class.createMany({
    data: [
      { type: "bachata", level: 1, dayOfWeek: "Monday", startTime: "18:30", maxSpots: 20 },
      { type: "bachata", level: 2, dayOfWeek: "Monday", startTime: "19:30", maxSpots: 20 },
      { type: "salsa", level: 3, dayOfWeek: "Monday", startTime: "20:30", maxSpots: 20 },

      { type: "salsa", level: 1, dayOfWeek: "Tuesday", startTime: "18:30", maxSpots: 20 },
      { type: "salsa", level: 2, dayOfWeek: "Tuesday", startTime: "19:30", maxSpots: 20 },
      { type: "reggaeton", dayOfWeek: "Tuesday", startTime: "20:30", maxSpots: 20 },

      { type: "bachata", level: 1, dayOfWeek: "Wednesday", startTime: "18:30", maxSpots: 20 },
      { type: "bachata", level: 2, dayOfWeek: "Wednesday", startTime: "19:30", maxSpots: 20 },
      { type: "salsa", level: 3, dayOfWeek: "Wednesday", startTime: "20:30", maxSpots: 20 },

      { type: "salsa", level: 1, dayOfWeek: "Thursday", startTime: "18:30", maxSpots: 20 },
      { type: "salsa", level: 2, dayOfWeek: "Thursday", startTime: "19:30", maxSpots: 20 },

      { type: "salsa", level: 3, dayOfWeek: "Friday", startTime: "18:30", maxSpots: 20 },
      { type: "reggaeton", dayOfWeek: "Friday", startTime: "19:30", maxSpots: 20 },
    ],
  });
}
main().then(() => prisma.$disconnect());
