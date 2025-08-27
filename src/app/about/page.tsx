import Image from 'next/image'
import bioData from '@/data/bio.json'
import { BioData } from '@/types/bio'

const bio = bioData as BioData

export default function About() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <Image
                src="/images/hh1.jpeg"
                alt={bio.name}
                fill
                className="rounded-full object-cover border-4 border-primary-100"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{bio.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{bio.title}</p>
              {bio.company && (
                <p className="text-gray-600 mb-4">Currently at {bio.company}</p>
              )}
              <p className="text-gray-600">{bio.bio}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {bio.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
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
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {bio.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {bio.researchInterests && bio.researchInterests.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Research Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {bio.researchInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-gray-600 mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href={`mailto:${bio.email}`}
              className="inline-block btn-primary"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}