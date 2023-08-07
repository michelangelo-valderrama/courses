import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: 'Astro alumno | Blog',
    description: 'Mi viaje de aprendizaje de Astro',
    site: 'http://localhost:3000/',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>es</language>`,
  });
}