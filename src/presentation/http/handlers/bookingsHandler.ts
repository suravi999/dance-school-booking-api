import { ok, badRequest } from '../httpResponses';
import { mapError } from '../errorHttpMapper';
import { pathId, parseJson } from '../requestParsers';
import { factory } from '../../../config/factory';

export const book = async (event: any) => {
  try {
    const classId = pathId(event);
    if (!classId) return badRequest('Invalid class id');
    const body = parseJson<{ email?: string }>(event);
    const email = body?.email || '';
    const dto = await factory.bookingService.book(email, classId);
    return ok(dto);
  } catch (e) {
    console.error(e);
    return mapError(e);
  }
};
