import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as string[]
  }),
  actions: {
    addMessage(message: string) {
      this.messages.push(message)
    },
  },
})