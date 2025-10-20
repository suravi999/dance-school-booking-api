import { ClassRepositoryPrisma } from '../infrastructure/prisma/ClassRepositoryPrisma';
import { BookingRepositoryPrisma } from '../infrastructure/prisma/BookingRepositoryPrisma';
import { ClassQueryService } from '../application/services/ClassQueryService';
import { BookingService } from '../application/services/BookingService';

const classRepo = new ClassRepositoryPrisma();
const bookingRepo = new BookingRepositoryPrisma();

export const factory = {
  classQueryService: new ClassQueryService(classRepo),
  bookingService: new BookingService(bookingRepo, classRepo),
};
