// Simple markdown processor - you can enhance this later
export default async function markdownToHtml(markdown: string) {
  // Basic markdown to HTML conversion
  // In a real implementation, you'd use a proper markdown parser
  let html = markdown
  
  // Headers
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
  
  // Paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gim, function(m){
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>'
  })
  
  // Line breaks
  html = html.replace(/\n$/gim, '<br />')
  
  return html
}