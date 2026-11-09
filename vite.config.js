import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * No servidor local, qualquer arquivo alterado recarrega a página inteira.
 * A troca "a quente" de partes da página conflita com as animações (GSAP/SplitText)
 * e pode deixar títulos duplicados, seções em branco ou a barra de progresso errada.
 */
const fullReload = () => ({
  name: 'clicar-full-reload',
  apply: 'serve',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  },
});

export default defineConfig({
  // Caminhos relativos: o site funciona em qualquer pasta (ex.: GitHub Pages em /clicar-planos/).
  base: './',
  plugins: [react(), fullReload()],
  build: {
    outDir: 'dist',
    // Todos os arquivos na raiz de dist/, o que facilita publicar pelo navegador no GitHub Pages.
    assetsDir: '',
  },
});
