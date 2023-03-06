import { defineStore } from 'pinia'
import { User } from '~~/types/users'

export const useUserStore = defineStore('usersStore', () => {
  const user = ref()

  const setUser = (fetchedUser : User) => {
    user.value = fetchedUser
  }
  return { setUser, user }
})