import { defineStore } from 'pinia'
import { User } from '~~/types/users'

export const useUserStore = defineStore('usersStore', () => {
  const user = ref<User>()

  const setUser = (fetchedUser : User) => {
    user.value = fetchedUser
  }
  return { setUser, user }
})