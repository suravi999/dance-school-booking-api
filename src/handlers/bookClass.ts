import { PrismaClient } from "../../generated/prisma/client";

export const bookClass = async (event) => {
  const { email } = JSON.parse(event.body);
  const classId = parseInt(event.pathParameters.id);

  // lazy init & cache to avoid multiple clients
  const globalAny = globalThis as any;
  if (!globalAny.__prisma) {
    globalAny.__prisma = new PrismaClient();
  }
  const prisma: PrismaClient = globalAny.__prisma;

  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { bookings: true },
  });
  if (!cls) return { statusCode: 404, body: "Class not found" };

  if (cls.bookings.length >= cls.maxSpots)
    return { statusCode: 400, body: JSON.stringify({ message: "Class is full", statusCode: 400 }) };

  const existing = await prisma.booking.findUnique({
    where: { email_classId: { email, classId } },
  });
  if (existing)
    return { statusCode: 400, body: JSON.stringify({ message: "You already booked this class", statusCode: 400 }) };

  await prisma.booking.create({ data: { email, classId } });
  return { statusCode: 200, body: JSON.stringify({ message: "Booking successful", statusCode: 200 }) };
};
