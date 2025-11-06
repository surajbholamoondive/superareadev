import React from 'react';
import ProjectCard from './ProjectCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function ProjectsList({ projects, moreProperty, setMoreProperty, showMoreProperty = false}) {
  const displayedProjects = showMoreProperty ? projects : projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 my-2">
      {projects.length > 0 ? (
        <>
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} showMoreProperty={showMoreProperty} />
          ))}

          {!showMoreProperty && projects.length > 3 && (
            <div className='w-full justify-end flex'>
            <button
              onClick={() => setMoreProperty(projects)}
              className="bg-primary rounded-md flex h-[30px] justify-between px-2 items-center text-white w-[100px] self-start"
            >
              Show All
              <ArrowRight className='h-5 w-5'/>
            </button>
            </div>
          )}

          {showMoreProperty && (
            <button
              onClick={() => setMoreProperty([])} // Clear moreProperty to go back to chat
              className="bg-primary rounded-md flex h-[30px] justify-between px-2 items-center text-white p-4 self-start"
            >
              <ArrowLeft className='h-5 w-5'/> Back to SuperAI
            </button>
          )}
        </>
      ) : (
        <div className="text-center p-5 text-[#6c757d]">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
}

export default ProjectsList;