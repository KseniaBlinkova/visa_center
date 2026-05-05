import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Указываем папку, куда Vite положит готовый бандл
    outDir: 'public', 
    // Очищать папку перед каждой новой сборкой
    emptyOutDir: true,
  },
  server: {
    // Порт для режима разработки (npm run dev)
    port: 3000
  }
});