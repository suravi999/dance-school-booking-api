import { IClassRepository, ClassEntity, ClassFilter } from '../../domain/repositories/IClassRepository';
import { prisma } from './client';

export class ClassRepositoryPrisma implements IClassRepository {
  async findMany(filter?: ClassFilter): Promise<ClassEntity[]> {
    const where: any = {};
    if (filter?.type) where.type = { equals: filter.type };
    const rows = await prisma.class.findMany({
      where,
      include: { bookings: true },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
    return rows.map((c: any) => ({
      id: c.id,
      type: c.type,
      level: c.level,
      dayOfWeek: c.dayOfWeek,
      startTime: c.startTime,
      maxSpots: c.maxSpots,
      bookedCount: c.bookings.length,
    }));
  }

  async findById(id: number): Promise<ClassEntity | null> {
    const c = await prisma.class.findUnique({ where: { id }, include: { bookings: true } });
    return c
      ? {
          id: c.id,
          type: c.type,
          level: c.level,
          dayOfWeek: c.dayOfWeek,
          startTime: c.startTime,
          maxSpots: c.maxSpots,
          bookedCount: c.bookings.length,
        }
      : null;
  }
}
