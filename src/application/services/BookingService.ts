import { IBookingRepository } from '../../domain/repositories/IBookingRepository';
import { IClassRepository } from '../../domain/repositories/IClassRepository';
import { BookClassDto } from '../dtos/BookClassDto';
import { ValidationError, NotFoundError, ConflictError } from '../../domain/errors/DomainError';

export class BookingService {
  constructor(
    private bookings: IBookingRepository,
    private classes: IClassRepository,
  ) {}

  async book(emailRaw: string, classId: number): Promise<BookClassDto> {
    const email = emailRaw?.trim().toLowerCase();
    if (!email) throw new ValidationError('Email is required');

    const cls = await this.classes.findById(classId);
    if (!cls) throw new NotFoundError('Class not found');

    if (cls.bookedCount >= cls.maxSpots) throw new ConflictError('Class is full');

    const already = await this.bookings.findByEmailAndClass(email, classId);
    if (already) throw new ConflictError('You already booked this class');

    const created = await this.bookings.create(email, classId);
    return {
      message: 'Booking successful',
      bookingId: created.id,
      classId,
      email,
      spotsRemaining: cls.maxSpots - (cls.bookedCount + 1),
    };
  }
}
