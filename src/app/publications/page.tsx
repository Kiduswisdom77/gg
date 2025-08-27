import PublicationCard from '@/components/PublicationCard'
import publications from '@/data/publications.json'

export default function Publications() {
  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publications</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Research papers and publications I've contributed to in many International Researches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      </div>
    </div>
  )
}