import Link from 'next/link'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink,
  Instagram,
  Facebook,
  Youtube 
} from 'lucide-react'

interface SocialIconProps {
  name: string
  url: string
  icon: string
  className?: string
}

const SocialIcon = ({ name, url, icon, className = '' }: SocialIconProps) => {
  const getIcon = () => {
    switch (icon.toLowerCase()) {
      case 'github':
        return <Github size={24} />
      case 'linkedin':
        return <Linkedin size={24} />
      case 'twitter':
        return <Twitter size={24} />
      case 'mail':
        return <Mail size={24} />
      case 'instagram':
        return <Instagram size={24} />
      case 'facebook':
        return <Facebook size={24} />
      case 'youtube':
        return <Youtube size={24} />
      default:
        return <ExternalLink size={24} />
    }
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${className}`}
      aria-label={name}
    >
      {getIcon()}
    </Link>
  )
}

export default SocialIcon