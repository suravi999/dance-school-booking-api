import { IBookingRepository, BookingEntity } from '../../domain/repositories/IBookingRepository';
import { prisma } from './client';

export class BookingRepositoryPrisma implements IBookingRepository {
  findByEmailAndClass(email: string, classId: number) {
    return prisma.booking.findUnique({ where: { email_classId: { email, classId } } }) as any;
  }
  create(email: string, classId: number): Promise<BookingEntity> {
    return prisma.booking.create({ data: { email, classId } }) as any;
  }
}
