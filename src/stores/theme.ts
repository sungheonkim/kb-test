import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    backgroundColor: '#f6f7f6'
  }),
  actions: {
    setThemeColor(color: string) {
      this.backgroundColor = color
      document.documentElement.style.setProperty('--background-color', color)
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
    }
  }
})
