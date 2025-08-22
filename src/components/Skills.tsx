import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Settings, Users, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { resumeData } from '../data/resume';
import SkillCard from './SkillCard';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'development' | 'tools' | 'ai' | 'soft';
}

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    ...resumeData.technicalSkills.development.map((name) => ({
      name,
      icon: <Code size={28} />,
      category: 'development' as const,
    })),
    ...resumeData.technicalSkills.tools.map((name) => ({
      name,
      icon: <Settings size={28} />,
      category: 'tools' as const,
    })),
    ...resumeData.technicalSkills.ai_web3.map((name) => ({
      name,
      icon: <Brain size={28} />,
      category: 'ai' as const,
    })),
    ...resumeData.technicalSkills.softSkills.map((name) => ({
      name,
      icon: <Users size={28} />,
      category: 'soft' as const,
    })),
  ];

  const filterSkills = (category: 'development' | 'tools' | 'ai' | 'soft') => {
    return skills.filter((skill) => skill.category === category);
  };

  const sections = [
    { title: t('skills.categories.tech'), items: filterSkills('development') },
    { title: 'IA & Web3', items: filterSkills('ai') },
    { title: t('skills.categories.tools'), items: filterSkills('tools') },
    { title: t('skills.categories.soft'), items: filterSkills('soft') },
  ];

  return (
    <section id="skills" className="py-20 bg-light dark:bg-darker relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('skills.title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-300 dark:border-gray-800">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                {section.items.map((s) => (
                  <SkillCard key={s.name} name={s.name} icon={s.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
