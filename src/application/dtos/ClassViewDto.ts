export interface ClassViewDto {
  id: number;
  type: string;
  level?: number | null;
  dayOfWeek: string;
  startTime: string;
  maxSpots: number;
  spotsRemaining: number;
}