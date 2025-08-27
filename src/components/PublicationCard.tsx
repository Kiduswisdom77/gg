import Link from 'next/link'
import { FileText, ExternalLink, Users, Calendar, AlertCircle } from 'lucide-react'
import { Publication } from '@/types/publication'

interface PublicationCardProps {
  publication?: Publication | null
}

const PublicationCard = ({ publication }: PublicationCardProps) => {
  // Handle undefined or null publication
  if (!publication) {
    return (
      <div className="card p-6 border-dashed border-2 border-gray-300 bg-gray-50">
        <div className="flex items-center text-yellow-600 mb-2">
          <AlertCircle size={20} className="mr-2" />
          <span className="font-medium">Publication data unavailable</span>
        </div>
        <p className="text-gray-600 text-sm">This publication could not be loaded.</p>
      </div>
    )
  }

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
        {publication.title || 'Untitled Publication'}
      </h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <Users size={16} className="mr-1" />
        <span>{publication.authors || 'Unknown Authors'}</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Calendar size={16} className="mr-1" />
        <span>{publication.year || 'No Year'}</span>
        {publication.journal && (
          <span className="ml-3 font-medium">{publication.journal}</span>
        )}
      </div>
      
      {publication.abstract && (
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {publication.abstract}
        </p>
      )}
      
      {publication.doi && (
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium">DOI:</span> {publication.doi}
        </p>
      )}
      
      <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-100">
        {publication.pdfUrl && (
          <Link
            href={publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
          >
            <FileText size={18} className="mr-1" />
            PDF
          </Link>
        )}
        
        {publication.doi && (
          <Link
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
          >
            <ExternalLink size={18} className="mr-1" />
            DOI
          </Link>
        )}
        
        {publication.citation && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(publication.citation!)
              alert('Citation copied to clipboard!')
            }}
            className="flex items-center text-gray-600 hover:text-gray-700 transition-colors text-sm font-medium"
            title="Copy citation"
          >
            📋 Cite
          </button>
        )}
      </div>
    </div>
  )
}

export default PublicationCard