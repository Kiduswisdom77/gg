import Link from 'next/link'
import SocialIcon from './SocialIcon'
import bioData from '@/data/bio.json'
import { BioData } from '@/types/bio'

const bio = bioData as BioData

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{bio.name}</h3>
            <p className="text-gray-300 mb-4">{bio.title}</p>
            <p className="text-gray-300">{bio.location}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/publications" className="text-gray-300 hover:text-white transition-colors">Publications</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              {bio.social.map((social) => (
                <SocialIcon
                  key={social.name}
                  name={social.name}
                  url={social.url}
                  icon={social.icon}
                  className="text-gray-300 hover:text-white"
                />
              ))}
            </div>
            <a 
              href={`mailto:${bio.email}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {bio.email}
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} {bio.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer