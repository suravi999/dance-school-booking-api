import type { IBookingRepository, BookingEntity } from '../../src/domain/repositories/IBookingRepository';

export class InMemoryBookingRepository implements IBookingRepository {
  private seq = 1;
  private bookings: BookingEntity[] = [];

  async findByEmailAndClass(email: string, classId: number): Promise<BookingEntity | null> {
    return this.bookings.find(b => b.email === email && b.classId === classId) ?? null;
  }

  async create(email: string, classId: number): Promise<BookingEntity> {
    const row: BookingEntity = { id: this.seq++, email, classId, createdAt: new Date() };
    this.bookings.push(row);
    return row;
  }

  // helper for assertions
  count() { return this.bookings.length; }
}
