import { c as createError } from '../nitro/nitro.mjs';

function createErrorResponse(statusCode, message, data) {
  throw createError({
    statusCode,
    statusMessage: message,
    data: { error: message }
  });
}
function createNotFoundResponse(message = "Not Found") {
  return createErrorResponse(404, message);
}
function createForbiddenResponse(message = "Forbidden") {
  return createErrorResponse(403, message);
}

export { createForbiddenResponse as a, createNotFoundResponse as c };
//# sourceMappingURL=response.mjs.map
