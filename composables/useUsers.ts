import { createUserMutation, fetchSingleUserQuery } from '~~/server/gql/queries/users'
import { CreateUserResult, SinglePageResult } from '~~/types/users'
import { createSafeId } from "~~/utils/createSafeId"

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
      const { mutate: createUser } = useMutation<CreateUserResult>(createUserMutation, { variables })
      const result = await createUser()
      if (result?.data) {
        console.log('LOGIN AND DO AUTH')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSingleUser = async (formValues : Record<string, any>) => {
    const variables = {
      email: formValues.email,
      password: formValues.password
    }
    try {
      const { data } = await useAsyncQuery<SinglePageResult>(fetchSingleUserQuery, variables)
      return data.value
    } catch (error) {
      console.log(error)
    }
  }

  return {
    createUser,
    getSingleUser
  }
}