import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Diretório de saída para os arquivos de build
    sourcemap: false, // Desabilitar sourcemaps para produção
    minify: 'terser', // Usar Terser para minificação
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs
        drop_debugger: true, // Remover debuggers
      },
    },
  },
  // Substitua '/subdirectory/' pelo caminho do subdiretório, se necessário
})