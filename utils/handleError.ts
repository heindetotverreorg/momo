import { useRouter } from "#app"
import { ERRORS } from "~~/constants/errors"

export const handleError = async (error : { message: string }) => {
  if (error.message === ERRORS.NOT_AUTHENTICATED_FOR_ADMIN) {
    if (process.server) {
      return
    }
    const router = useRouter()
    return await router.replace('/auth?login')
  }
  if (error.message === ERRORS.INVALID_SINGLE_PAGE_PARENT_TREE) {
    throw createError({ statusCode: 500, statusMessage: error.message, fatal: true })
  }
  throw createError({ statusCode: 404, statusMessage: error.message, fatal: true })
}