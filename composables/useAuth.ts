import { useUsers } from '~~/composables/useUsers'
const { createUser } = useUsers()

export const useAuth = () => {
  const login = async (formValues : Record<string, any>) => {
    try {
      const { data } : { data : Ref<{authenticated: boolean} | null> } = await useFetch('/api/auth', {
        body: formValues,
        method: 'post'
      })
      console.log(data)
      if (data.value?.authenticated) {
        const router = useRouter()
        router.push('/admin/dashboard')
      }
      throw new Error('no token returned from auth')
    } catch (error) {
      return error
    }
  }

  const register = async (formValues : Record<string, any>) => {
    await createUser(formValues)
  }

  return {
    login,
    register
  }
}