import Link from 'next/link'
import SocialIcon from './SocialIcon'
import bioData from '@/data/bio.json'
import { BioData } from '@/types/bio'

const bio = bioData as BioData

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-blue-50 section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Hi, I'm <span className="text-gradient">{bio.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {bio.title}
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            {bio.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/projects" className="btn-primary">
              View My Work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
          
          <div className="flex justify-center space-x-6">
            {bio.social.map((social) => (
              <SocialIcon
                key={social.name}
                name={social.name}
                url={social.url}
                icon={social.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero