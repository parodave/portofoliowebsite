import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  title: string;
  description: string[];
  image: string;
  tags: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
}) => (
  <div className="group rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker transform transition-transform hover:scale-105">
    <div className="relative">
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowUpRight size={20} />
        </a>
      )}
      <img
        src={image}
        alt={`${title} ${tags.slice(0, 2).join(' ')} project`}
        loading="lazy"
        width={1080}
        height={720}
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-3">
        {description.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
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

export default ProjectCard;
