const currentMessage = ref('')
const showMessage = ref(false)

export const useMessages = () => {
  const clearMessage = () => {
    showMessage.value = false
  }

  const setMessage = (message : string, config : { duration ?: number  } = { duration: 2000 }) => {
    showMessage.value = true
    currentMessage.value  = message
    setTimeout(() => {
      clearMessage()
    }, config.duration)
  }
  

  return {
    clearMessage,
    currentMessage,
    setMessage,
    showMessage
  }
}