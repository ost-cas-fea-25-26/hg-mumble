import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mumble',
    description: '- A social media platform for sharing thoughts and ideas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'icons/192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'icons/512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  }
}
