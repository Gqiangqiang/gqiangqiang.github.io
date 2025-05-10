import { createContentLoader } from 'vitepress'

export default createContentLoader('articles/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    rawData.map((item) => {
      const match = item.url.match(/\/([^\/]+)\.html$/);
      item.title = match ? match[1] : null;
    })
    
    return rawData
  }
})