import { badRequest, conflict, notFound, serverError } from './httpResponses';
import { ValidationError, ConflictError, NotFoundError } from '../../domain/errors/DomainError';

export function mapError(e: unknown) {
  if (e instanceof ValidationError) return badRequest(e.message);
  if (e instanceof ConflictError)   return conflict(e.message);
  if (e instanceof NotFoundError)   return notFound(e.message);
  return serverError();
}
