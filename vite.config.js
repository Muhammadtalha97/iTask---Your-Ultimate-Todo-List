import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base : "/iTask_Your_Ultimate_Todo_List/",
  plugins: [react()],
})
