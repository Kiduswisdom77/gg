import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
}

const postsDirectory = join(process.cwd(), 'src/content/blog')

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.mdx`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time (approx 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    // For now, we'll just return the raw content
    // In a real implementation, you'd process the MDX

    return {
      slug: realSlug,
      title: data.title || '',
      date: data.date ? new Date(data.date).toLocaleDateString() : '',
      excerpt: data.excerpt || '',
      content: content, // Raw content for now
      readingTime: `${readingTime} min read`,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const slugs = await readdir(postsDirectory)
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await getPostBySlug(slug)
        return post
      })
    )

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}