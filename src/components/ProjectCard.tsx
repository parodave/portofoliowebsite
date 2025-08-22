import React from 'react';
import { ArrowUpRight, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Project } from '../data/projects';
import { getCurrentLang } from '../utils/getCurrentLang';

type Props = { project: Project };

const ProjectCard: React.FC<Props> = ({ project }) => {
  useTranslation();
  const lang = getCurrentLang();

  return (
    <div className="group/card rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker transform transition-transform hover:scale-105">
      <div className="relative">
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.title[lang]}
            className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity"
          >
            <ArrowUpRight size={20} />
          </a>
        )}
        <img
          src={project.image}
          alt={`${project.title[lang]} ${project.tags.slice(0, 2).join(' ')} project`}
          loading="lazy"
          width={1080}
          height={720}
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 ease-out group-hover/card:scale-105"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.onerror = null;
            // Fallback 1: Unsplash (main noir & blanc)
            el.src = "https://source.unsplash.com/featured/1080x720/?hand,black,white";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">
          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ouvrir ${project.title[lang]} dans un nouvel onglet`}
              className="inline-flex items-center gap-1 group hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
            >
              <span>{project.title[lang]}</span>
              <ExternalLinkIcon
                className="h-4 w-4 opacity-70 group-hover:opacity-100 translate-y-[1px] transition-transform duration-150 group-hover:translate-x-[1px]"
                aria-hidden="true"
              />
              <span className="sr-only">(lien externe)</span>
            </a>
          ) : (
            <span>{project.title[lang]}</span>
          )}
        </h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-3">
          {project.description[lang].map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

