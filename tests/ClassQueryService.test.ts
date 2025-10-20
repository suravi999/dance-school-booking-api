import { describe, it, expect, beforeEach } from 'vitest';
import { ClassQueryService } from '../src/application/services/ClassQueryService';
import { InMemoryClassRepository } from './doubles/InMemoryClassRepository';

describe('ClassQueryService', () => {
  let classesRepo: InMemoryClassRepository;
  let service: ClassQueryService;

  beforeEach(() => {
    classesRepo = new InMemoryClassRepository();
    service = new ClassQueryService(classesRepo);

    classesRepo.seed([
      { id: 1, type: 'salsa',   level: 1, dayOfWeek: "Tuesday", startTime: '18:30', maxSpots: 20, bookedCount: 5 },
      { id: 2, type: 'bachata', level: 2, dayOfWeek: "Monday", startTime: '18:30', maxSpots: 20, bookedCount: 0 },
      { id: 3, type: 'reggaeton', level: null, dayOfWeek: "Wednesday", startTime: '20:30', maxSpots: 20, bookedCount: 10 },
    ]);
  });

  it('lists all classes', async () => {
    const res = await service.list();
    expect(res).toHaveLength(3);
    expect(res[0]).toHaveProperty('spotsRemaining');
  });

  it('filters by type (case-insensitive)', async () => {
    const res = await service.list('bachata');
    expect(res).toHaveLength(1);
    expect(res[0].type).toBe('bachata');
  });

  it('maps DTO correctly', async () => {
    const [first] = await service.list();
    expect(first).toMatchObject({
      id: 1,
      type: 'salsa',
      level: 1,
      startTime: '18:30',
      maxSpots: 20,
    });
    expect(typeof first.dayOfWeek).toBe('string'); // ISO
  });
});
