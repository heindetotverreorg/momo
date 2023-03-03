import { createUserMutation, fetchSingleUserQuery } from '~~/server/gql/queries/users'
import { createSafeId } from "~~/utils/createSafeId"
import { useAuth } from '~~/composables/useAuth'
import { User } from '~~/types/users'

export const useUsers = () => {
  const createUser = async (formValues : Record<string, any>) => {
    delete formValues.passwordCheck
    const variables = {
      user : {
        ...formValues,
        id: `${formValues.email}_${createSafeId()}`,
        role: 'admin'
      }
    }
    try {
      const { mutate: createUser } = useMutation(createUserMutation, { variables })
      const result = await createUser()
      if (result?.data) {
        const { login } = useAuth()
        return await login({ email: formValues.email, password: formValues.password })
      }
      return result?.errors
    } catch (error) {
      return error
    }
  }

  const getSingleUser = async (formValues : Record<string, any>) => {
    const variables = {
      email: formValues.email,
      password: formValues.password
    }
    try {
      const { result } = await useQuery<{ user: User }>(fetchSingleUserQuery, variables)
      return result?.value?.user
    } catch (error) {
      return error
    }
  }

  return {
    createUser,
    getSingleUser
  }
}