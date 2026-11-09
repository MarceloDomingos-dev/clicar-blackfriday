/**
 * Telas do CliCar app em três larguras (800, 1400 e 2400 px).
 * O navegador escolhe a menor que fica nítida na tela do visitante.
 */
const files = import.meta.glob('./*.webp', { eager: true, import: 'default' });

export function shot(name) {
  const src = files[`./${name}.webp`];
  return {
    src,
    srcSet: `${files[`./${name}-800.webp`]} 800w, ${files[`./${name}-1400.webp`]} 1400w, ${src} 2400w`,
  };
}
