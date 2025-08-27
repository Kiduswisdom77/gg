import { FileText, Github, ExternalLink } from 'lucide-react'

// Define the interface for a publication
export interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  type: string
  doi?: string
  abstract?: string
  tags?: string[]
  links?: Array<{
    type: string
    url: string
  }>
}

// Props interface for the component
export interface PublicationCardProps {
  publication: Publication
  key?: string | number // key should not be part of the props interface
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4" />
      case 'code':
        return <Github className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        <a
          href={publication.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600"
        >
          {publication.title}
        </a>
      </h3>
      
      <p className="text-gray-600 text-sm mb-2">{publication.authors}</p>
      <p className="text-gray-500 text-sm mb-3">
        {publication.venue}, {publication.year}
      </p>

      {publication.abstract && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{publication.abstract}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {publication.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {publication.links && publication.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {publication.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
            >
              {getIcon(link.type)}
              <span className="ml-1">{link.type}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}