import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectCardsGrid: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

export default ProjectCardsGrid;
