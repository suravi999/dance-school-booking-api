import { describe, it, expect, beforeEach } from 'vitest';
import { BookingService } from '../src/application/services/BookingService';
import { InMemoryBookingRepository } from './doubles/InMemoryBookingRepository';
import { InMemoryClassRepository } from './doubles/InMemoryClassRepository';
import { ConflictError, NotFoundError, ValidationError } from '../src/domain/errors/DomainError';

describe('BookingService', () => {
  let bookings: InMemoryBookingRepository;
  let classes: InMemoryClassRepository;
  let service: BookingService;

  beforeEach(() => {
    bookings = new InMemoryBookingRepository();
    classes = new InMemoryClassRepository();
    service = new BookingService(bookings, classes);

    classes.seed([
      {
        id: 1,
        type: 'salsa',
        level: 1,
        dayOfWeek: "Tuesday",
        startTime: '18:30',
        maxSpots: 2,
        bookedCount: 0,
      },
      {
        id: 2,
        type: 'bachata',
        level: 2,
        dayOfWeek: "Monday",
        startTime: '18:30',
        maxSpots: 1,
        bookedCount: 1, // already full
      },
    ]);
  });

  it('books a spot when available', async () => {
    const res = await service.book('User@Email.Com', 1);
    expect(res.classId).toBe(1);
    expect(res.email).toBe('user@email.com'); // normalized
    expect(res.spotsRemaining).toBe(1);
    expect(bookings.count()).toBe(1);
  });

  it('prevents duplicate booking for same email+class', async () => {
    await service.book('a@b.com', 1);
    await expect(service.book('a@b.com', 1)).rejects.toBeInstanceOf(ConflictError);
  });

  it('fails when class is full', async () => {
    await expect(service.book('x@y.com', 2)).rejects.toBeInstanceOf(ConflictError);
  });

  it('fails when class does not exist', async () => {
    await expect(service.book('x@y.com', 999)).rejects.toBeInstanceOf(NotFoundError);
  });

  it('validates email presence', async () => {
    await expect(service.book('', 1)).rejects.toBeInstanceOf(ValidationError);
  });
});
