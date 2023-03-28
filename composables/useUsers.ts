import { createUserMutation, fetchSingleUserQuery } from '~~/server/gql/queries/users'
import { createSafeId } from "~~/utils/createSafeId"
import { useAuth } from '~~/composables/useAuth'
import { User } from '~~/types/users'
import { useUserStore } from '~~/store/users'
import { storeToRefs } from 'pinia'

export const useUsers = () => {
  const { setUser } = useUserStore()
  const { user } = storeToRefs(useUserStore())
  
  const createUser = async (newUser : Record<string, any>) => {
    delete newUser.passwordCheck
    const variables = {
      user : {
        ...newUser,
        id: `${newUser.email}_${createSafeId()}`,
        role: 'admin'
      }
    }
    try {
      const { mutate: createUser } = useMutation(createUserMutation, { variables })
      const result = await createUser()
      if (result?.data?.singleUser) {
        setUser(result.data.singleUser)
        const { login } = useAuth()
        return await login({ email: newUser.email, password: newUser.password })
      }
      return result?.errors
    } catch (error) {
      return error
    }
  }

  const fetchSingleUser = async () => {
    try {
      const { data, error } = await useAsyncQuery<{ singleUser: User }>(fetchSingleUserQuery)
      if (error.value) {
        await handleError(error.value)
      }
      if (data.value?.singleUser) {
        setUser(data.value.singleUser)
        return user
      }
    } catch (error) {
      return error
    }
  }

  return {
    createUser,
    fetchSingleUser,
    user
  }
}