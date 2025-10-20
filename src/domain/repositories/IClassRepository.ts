export type ClassType = 'salsa' | 'bachata' | 'reggaeton';

export interface ClassEntity {
  id: number;
  type: ClassType | string;
  level?: number | null;
  dayOfWeek: string;
  startTime: string;
  maxSpots: number;
  bookedCount: number;
}

export interface ClassFilter {
  type?: ClassType | string;
}

export interface IClassRepository {
  findMany(filter?: ClassFilter): Promise<ClassEntity[]>;
  findById(id: number): Promise<ClassEntity | null>;
}
