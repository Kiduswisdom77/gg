import ContactForm from '@/components/ContactForm'
import SocialIcon from '@/components/SocialIcon'
import bioData from '@/data/bio.json'
import { BioData } from '@/types/bio'

const bio = bioData as BioData

export default function Contact() {
  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to contact me!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send me a message</h2>
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                  <a
                    href={`mailto:${bio.email}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {bio.email}
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">{bio.location}</p>
                </div>
                
                {bio.company && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Company</h3>
                    <p className="text-gray-600">{bio.company}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Social Media</h3>
                  <div className="flex space-x-4">
                    {bio.social.map((social) => (
                      <SocialIcon
                        key={social.name}
                        name={social.name}
                        url={social.url}
                        icon={social.icon}
                        className="text-gray-600 hover:text-primary-600"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}