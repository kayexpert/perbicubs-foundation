/**
 * Lightweight, dependency-free input validators for API routes.
 * Each function returns a sanitized value or throws a ValidationError.
 *
 * We avoid `zod` here to keep the bundle small and the code obvious.
 */

export class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 5_000;
const MAX_SUBJECT = 200;
const MAX_NAME = 200;
const MAX_PHONE = 40;


function asString(v: unknown, field: string, opts: { max?: number; min?: number; stripNewlines?: boolean } = {}): string {
  if (typeof v !== 'string') throw new ValidationError(field, `${field} must be a string`);
  let trimmed = v.trim();
  // Strip CR/LF to prevent SMTP header injection & HTTP response splitting.
  if (opts.stripNewlines) {
    trimmed = trimmed.replace(/[\r\n]+/g, ' ');
  }
  if (opts.min !== undefined && trimmed.length < opts.min) {
    throw new ValidationError(field, `${field} is required`);
  }
  if (opts.max !== undefined && trimmed.length > opts.max) {
    throw new ValidationError(field, `${field} exceeds maximum length of ${opts.max}`);
  }
  return trimmed;
}

export function validateContactPayload(input: unknown): {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
} {
  if (input === null || typeof input !== 'object') {
    throw new ValidationError('body', 'Request body must be a JSON object');
  }
  const body = input as Record<string, unknown>;

  const name = asString(body.name, 'name', { min: 1, max: MAX_NAME, stripNewlines: true });
  const email = asString(body.email, 'email', { min: 1, max: MAX_NAME, stripNewlines: true }).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    throw new ValidationError('email', 'Invalid email address');
  }

  const phone = body.phone === undefined || body.phone === null
    ? ''
    : asString(body.phone, 'phone', { max: MAX_PHONE, stripNewlines: true });
  const subject = body.subject === undefined || body.subject === null
    ? ''
    : asString(body.subject, 'subject', { max: MAX_SUBJECT, stripNewlines: true });
  const message = asString(body.message, 'message', { min: 1, max: MAX_TEXT });

  return { name, email, phone, subject, message };
}


