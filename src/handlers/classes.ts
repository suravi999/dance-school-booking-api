import { PrismaClient } from "../../generated/prisma/client";

export const getAllClasses = async (event) => {
  // lazy init & cache to avoid multiple clients in dev/hot-reload
  const globalAny = globalThis as any;
  if (!globalAny.__prisma) {
    globalAny.__prisma = new PrismaClient();
  }
  const prisma: PrismaClient = globalAny.__prisma;

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