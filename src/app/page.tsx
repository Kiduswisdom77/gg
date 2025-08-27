import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import projectsData from '@/data/projects.json'
import { Project } from '@/types/project'

const projects = projectsData as Project[]

export default function Home() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)

  return (
    <>
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that I'm particularly proud of.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/projects" className="btn-primary">
              View All Projects
            </a>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to say hello, feel free to reach out.
          </p>
          <a href="/contact" className="btn-primary">
            Get In Touch
          </a>
        </div>
      </section>
    </>
  )
}
