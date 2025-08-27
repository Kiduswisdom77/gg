export interface ImageInfo {
  src: string
  alt: string
  width: number
  height: number
}

export const validateImage = async (src: string): Promise<boolean> => {
  try {
    // For external URLs
    if (src.startsWith('http')) {
      const response = await fetch(src, { method: 'HEAD' })
      return response.ok && response.headers.get('content-type')?.startsWith('image/') || false
    }
    
    // For local images - we'll assume they exist in development
    // In production, we should check if the file exists
    return true
  } catch (error) {
    console.warn(`Image validation failed for ${src}:`, error)
    return false
  }
}

export const getProjectImage = async (projectTitle: string, customImage?: string): Promise<ImageInfo> => {
  if (customImage) {
    const isValid = await validateImage(customImage)
    if (isValid) {
      return {
        src: customImage,
        alt: projectTitle,
        width: 600,
        height: 400
      }
    }
  }
  
  // Fallback to generated placeholder
  const colors = ['3B82F6', '10B981', 'EF4444', '8B5CF6', 'EC4899']
  const color = colors[projectTitle.length % colors.length]
  const text = encodeURIComponent(projectTitle)
  
  return {
    src: `https://placehold.co/600x400/${color}/FFFFFF?text=${text}`,
    alt: projectTitle,
    width: 600,
    height: 400
  }
}

export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  const preloadPromises = imageUrls.map(url => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Don't reject, just continue
      img.src = url
    })
  })
  
  await Promise.all(preloadPromises)
}