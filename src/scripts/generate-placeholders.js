const fs = require('fs').promises
const path = require('path')
const { createCanvas } = require('canvas')

async function generatePlaceholderImage(title, filename, color) {
  const width = 600
  const height = 400
  
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  
  // Background
  ctx.fillStyle = `#${color}`
  ctx.fillRect(0, 0, width, height)
  
  // Text
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Wrap text if needed
  const words = title.split(' ')
  let lines = []
  let currentLine = words[0]
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i]
    const metrics = ctx.measureText(testLine)
    
    if (metrics.width > width - 40) {
      lines.push(currentLine)
      currentLine = words[i]
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine)
  
  // Draw text lines
  const lineHeight = 30
  const totalHeight = lines.length * lineHeight
  const startY = (height - totalHeight) / 2 + lineHeight / 2
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight)
  })
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg')
  const outputPath = path.join(process.cwd(), 'public', 'images', 'projects', filename)
  await fs.writeFile(outputPath, buffer)
  console.log(`Generated: ${filename}`)
}

async function main() {
  const images = [
    { title: 'E-Commerce Platform', filename: 'ecommerce.jpg', color: '3B82F6' },
    { title: 'ML Sentiment Analysis', filename: 'sentiment-analysis.jpg', color: '10B981' },
    { title: 'Task Management App', filename: 'taskmanager.jpg', color: 'EF4444' }
  ]
  
  // Ensure directory exists
  const dirPath = path.join(process.cwd(), 'public', 'images', 'projects')
  await fs.mkdir(dirPath, { recursive: true })
  
  // Generate all images
  for (const image of images) {
    await generatePlaceholderImage(image.title, image.filename, image.color)
  }
}

main().catch(console.error)