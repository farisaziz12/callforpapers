import type { ZodSchema } from 'zod'
import type { H3Event } from 'h3'

export async function validateBody<T>(event: H3Event, schema: ZodSchema<T>): Promise<T> {
  try {
    const body = await readBody(event)
    return schema.parse(body)
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { error: error.message }
    })
  }
}

export function validateQuery<T>(event: H3Event, schema: ZodSchema<T>): T {
  try {
    const query = getQuery(event)
    // Convert empty strings to undefined
    const cleanedQuery = Object.fromEntries(
      Object.entries(query).map(([key, value]) => [
        key,
        value === '' ? undefined : value
      ])
    )
    return schema.parse(cleanedQuery)
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { error: error.message }
    })
  }
}