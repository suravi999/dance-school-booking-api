import { IClassRepository } from '../../domain/repositories/IClassRepository';
import { ClassViewDto } from '../dtos/ClassViewDto';

export class ClassQueryService {
  constructor(private classes: IClassRepository) {}

  async list(rawType?: string): Promise<ClassViewDto[]> {
    const filter = rawType && rawType.toLowerCase() !== 'any' ? { type: rawType.toLowerCase() } : undefined;
    const rows = await this.classes.findMany(filter);
    return rows.map(r => ({
      id: r.id,
      type: r.type,
      level: r.level ?? null,
      dayOfWeek: r.dayOfWeek,
      startTime: r.startTime,
      maxSpots: r.maxSpots,
      spotsRemaining: r.maxSpots - r.bookedCount,
    }));
  }
}
