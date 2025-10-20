export class DomainError extends Error {}

export class ConflictError extends DomainError {}

export class NotFoundError extends DomainError {}

export class ValidationError extends DomainError {}
