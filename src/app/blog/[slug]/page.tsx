import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { Calendar, Clock } from 'lucide-react'
import markdownToHtml from '@/lib/markdown'

interface BlogPostParams {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }
  
  // Convert markdown to HTML
  const content = await markdownToHtml(post.content)
  
  return (
    <article className="section-padding bg-white min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar size={16} className="mr-1" />
            <span className="mr-4">{post.date}</span>
            
            <Clock size={16} className="mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  )
}