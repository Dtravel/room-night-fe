export interface ImageLoader {
  src: string
}

export default function CustomImageLoader({ src }: ImageLoader) {
  return `${src}?e=webp`
}
