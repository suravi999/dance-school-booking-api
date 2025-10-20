import { ok } from '../httpResponses';
import { mapError } from '../errorHttpMapper';
import { factory } from '../../../config/factory';

export const list = async (event: any) => {
  try {
    const type = event?.queryStringParameters?.type;
    const data = await factory.classQueryService.list(type);
    return ok(data);
  } catch (e) {
    console.error(e);
    return mapError(e);
  }
};
