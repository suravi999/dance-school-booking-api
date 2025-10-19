import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllClasses = async (event) => {
  const type = event.queryStringParameters?.type;
  const classes = await prisma.class.findMany({
    where: type && type !== "any" ? { type } : {},
    include: { bookings: true },
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      classes.map(c => ({
        id: c.id,
        type: c.type,
        level: c.level,
        date: c.date,
        startTime: c.startTime,
        maxSpots: c.maxSpots,
        spotsRemaining: c.maxSpots - c.bookings.length,
      }))
    ),
  };
};
