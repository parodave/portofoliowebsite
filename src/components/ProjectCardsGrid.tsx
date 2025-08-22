import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import { getCurrentLang } from '../utils/getCurrentLang';

const ProjectCardsGrid: React.FC = () => {
  useTranslation();
  const lang = getCurrentLang();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title[lang]}
          description={project.description[lang]}
          image={project.image}
          tags={project.tags}
          link={project.url}
        />
      ))}
    </div>
  );
};

export default ProjectCardsGrid;
