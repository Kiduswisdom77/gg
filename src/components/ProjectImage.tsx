import Image from 'next/image'
import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface ProjectImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const ProjectImage = ({ src, alt, width = 600, height = 400, className = '' }: ProjectImageProps) => {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`)
    setError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Generate a fallback gradient based on the alt text
  const generateFallbackGradient = (text: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600', 
      'from-red-500 to-pink-600',
      'from-yellow-500 to-orange-600',
      'from-indigo-500 to-blue-600'
    ]
    const index = text.length % colors.length
    return colors[index]
  }

  if (error) {
    return (
      <div className={`${generateFallbackGradient(alt)} bg-gradient-to-br flex items-center justify-center rounded-lg ${className}`} 
           style={{ width, height }}>
        <div className="text-center text-white p-4">
          <ImageOff size={32} className="mx-auto mb-2" />
          <p className="text-sm font-medium">{alt}</p>
          <p className="text-xs opacity-80 mt-1">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading image...</div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
    </div>
  )
}

export default ProjectImage