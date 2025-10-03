export function createErrorResponse(statusCode: number, message: string, data?: any) {
  throw createError({
    statusCode,
    statusMessage: message,
    data: data ? { error: data } : { error: message }
  })
}

export function createSuccessResponse<T>(data: T) {
  return data
}

export function createNotFoundResponse(message = 'Not Found') {
  return createErrorResponse(404, message)
}

export function createUnauthorizedResponse(message = 'Unauthorized') {
  return createErrorResponse(401, message)
}

export function createForbiddenResponse(message = 'Forbidden') {
  return createErrorResponse(403, message)
}