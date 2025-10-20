export function pathId(event: any): number | null {
  const id = Number(event?.pathParameters?.id);
  return Number.isFinite(id) ? id : null;
}
export function parseJson<T>(event: any): T | null {
  try { return JSON.parse(event.body ?? '{}'); } catch { return null; }
}
