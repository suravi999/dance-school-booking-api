export interface BookingEntity {
  id: number;
  email: string;
  classId: number;
  createdAt: Date;
}

export interface IBookingRepository {
  findByEmailAndClass(email: string, classId: number): Promise<BookingEntity | null>;
  create(email: string, classId: number): Promise<BookingEntity>;
}
