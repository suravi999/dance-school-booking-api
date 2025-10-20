import type { IClassRepository, ClassEntity, ClassFilter } from '../../src/domain/repositories/IClassRepository';

export class InMemoryClassRepository implements IClassRepository {
  private classes: ClassEntity[] = [];

  seed(classes: ClassEntity[]) {
    this.classes = classes.map(c => ({ ...c }));
  }

  async findMany(filter?: ClassFilter): Promise<ClassEntity[]> {
    let rows = [...this.classes];
    if (filter?.type) rows = rows.filter(r => r.type.toLowerCase() === String(filter.type).toLowerCase());
    rows.sort((a, b) => a.startTime.localeCompare(b.startTime));
    return rows;
  }

  async findById(id: number): Promise<ClassEntity | null> {
    const c = this.classes.find(c => c.id === id);
    return c ? { ...c } : null;
  }

  // helper for tests to simulate bookings growth
  incrementBookedCount(id: number) {
    const idx = this.classes.findIndex(c => c.id === id);
    if (idx >= 0) this.classes[idx].bookedCount += 1;
  }
}
