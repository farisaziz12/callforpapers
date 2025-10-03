import { getCfpDirectory } from '../adapters/container'
import { validateBody } from '../lib/validate'
import { submitFormSchema } from '../../packages/schemas/zod'

export default defineEventHandler(async (event) => {
  const payload = await validateBody(event, submitFormSchema)
  const directory = getCfpDirectory(event)

  const result = await directory.createModeration(payload)

  return {
    success: true,
    id: result.id,
    message: 'CFP submitted for moderation'
  }
})