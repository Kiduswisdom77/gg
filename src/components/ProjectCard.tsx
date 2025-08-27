import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {project.description}
        </p>
        
        {project.period && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Period:</span> {project.period}
          </p>
        )}
        
        {project.status && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Status:</span> {project.status}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 mt-auto">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Github size={20} className="mr-1" />
              Code
            </Link>
          )}
          
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ExternalLink size={20} className="mr-1" />
              Live Demo
            </Link>
          )}
          
          {/* Support for links array */}
          {project.links?.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ExternalLink size={20} className="mr-1" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard