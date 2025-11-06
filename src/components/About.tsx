import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  const defaultCertifications = [
    'Basic H₂S (OPITO) — EnerTech Qatar, Doha — Nov 2025',
    'T-BOSIET (OPITO) — EnerTech Qatar, Doha — Nov 2025',
    'Le Wagon — Certification de concepteur·rice-développeur·se d’applications web — Paris — 2023',
    'Permis de conduire',
  ];

  const translatedCertifications = t('about.certifications', { returnObjects: true }) as unknown;
  const certifications = Array.isArray(translatedCertifications)
    ? (translatedCertifications as string[])
    : undefined;

  const certificationItems = certifications && certifications.length > 0 ? certifications : defaultCertifications;

  return (
    <section id="about" className="py-20 bg-light dark:bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
              {t('about.title')}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white"></span>
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{t('about.summary')}</p>

            <h3 className="text-xl font-semibold mb-2">{t('about.languagesTitle')}</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {t('about.languages', { returnObjects: true })
                .map((lang: string) => (
                  <li key={lang}>{lang}</li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              {(typeof t === 'function' ? t('about.certificationsTitle') : undefined) ?? 'Certifications'}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {certificationItems.map((cert, index) => (
                <li key={`${cert}-${index}`}>{cert}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-darker p-8 border border-gray-300 dark:border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">{t('about.educationTitle')}</h3>
            <ul className="space-y-4">
              {t('about.education', { returnObjects: true })
                .map((edu: { school: string; location: string; degree: string; period: string }) => (
                  <li key={edu.school} className="border-b border-gray-300 dark:border-gray-800 pb-3">
                    <p className="font-medium">{edu.school} - {edu.location}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.degree} ({edu.period})</p>
                  </li>
                ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
