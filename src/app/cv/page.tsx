import Link from 'next/link'
import { Download, FileText } from 'lucide-react'
import bio from '@/data/bio.json'

// Define the correct type based on your actual bio.json structure
interface EducationItem {
  degree: string
  institution: string
  years: string
  thesis?: string
}

interface BioData {
  name: string
  title: string
  company: string
  location: string
  email: string
  bio: string
  education: EducationItem[]
  researchInterests: string[]
  social: {
    name: string
    url: string
    icon: string
  }[]
}

export default function CV() {
  // Cast the bio data to the correct type
  const bioData = bio as unknown as BioData

  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:mb-0">Curriculum Vitae</h1>
            
            <a
              href="/cv.pdf"
              download
              className="btn-primary flex items-center"
            >
              <Download size={20} className="mr-2" />
              Download PDF
            </a>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Summary</h2>
            <p className="text-gray-600">{bioData.bio}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="space-y-6">
                {bioData.education.map((edu, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.years}</p>
                    {edu.thesis && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Thesis:</span> {edu.thesis}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Research Interests</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {bioData.researchInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> {bioData.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> {bioData.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Company:</span> {bioData.company}
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Social Profiles</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-wrap gap-4">
                  {bioData.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              For a complete CV with detailed work experience, publications, and project history, please download the PDF version.
            </p>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <FileText size={20} className="mr-2" />
              View Full CV
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}