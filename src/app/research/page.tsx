import PublicationCard from '@/components/PublicationCard'
import { getPublications, getPublicationYears, getRecentPublications } from '@/lib/data'
import { Filter, Calendar, AlertCircle, BookOpen } from 'lucide-react'

export default function Research() {
  const publications = getPublications()
  const recentPublications = getRecentPublications(5)
  const publicationYears = getPublicationYears()

  // Check if we have any valid publications
  const hasPublications = publications.length > 0
  const hasRecentPublications = recentPublications.length > 0

  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research & Publications</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore my research contributions, academic publications, and ongoing projects in 
            computer science, machine learning, and natural language processing.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-primary-50 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-primary-900 mb-2">{publications.length}</h3>
            <p className="text-primary-700">Total Publications</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">{publicationYears.length}</h3>
            <p className="text-blue-700">Years of Research</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-2">{recentPublications.length}</h3>
            <p className="text-green-700">Recent Publications</p>
          </div>
        </div>

        {/* Research Focus Areas */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Filter className="mr-2" size={24} />
            Research Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Natural Language Processing",
              "Machine Learning",
              "Low-Resource Languages", 
              "Transformer Architectures",
              "Ethiopian Languages NLP",
              "Sentiment Analysis",
              "AI Ethics",
              "Computational Linguistics"
            ].map((area, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900">{area}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        {publicationYears.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2" size={20} />
              Filter by Year
            </h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                All Years
              </button>
              {publicationYears.map(year => (
                <button
                  key={year}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Publications Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Publications</h2>
          {hasPublications ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publications.map((publication, index) => (
                <PublicationCard key={publication?.id || index} publication={publication} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Publications Yet</h3>
              <p className="text-gray-500">Research publications will be displayed here once they are added.</p>
            </div>
          )}
        </div>

        {/* Recent Publications Section */}
        {hasRecentPublications && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPublications.map((publication, index) => (
                <PublicationCard key={publication?.id || index} publication={publication} />
              ))}
            </div>
          </div>
        )}

        {/* Research Collaboration CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Interested in Research Collaboration?</h2>
          <p className="mb-6 opacity-90">
            I'm always open to collaborating on research projects, paper reviews, 
            and academic discussions in the field of NLP and machine learning.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}