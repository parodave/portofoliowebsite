import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { containerVariants, itemVariants, panelVariants } from '../animationVariants';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';
import CompactContactForm from './CompactContactForm';
import { sendEmail } from '../utils/emailjs';
import SocialLinks from './SocialLinks';
import { useTranslation } from 'react-i18next';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const reduceMotion = usePrefersReducedMotion();

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    // EmailJS est initialisé dans CompactContactForm
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setLoading(true);
      setError('');
      const result = await sendEmail(formRef.current);
      if (result.text === 'OK') {
        setSuccess(true);
        formRef.current.reset();
      } else {
        throw new Error('Email non envoyé');
      }
    } catch (err) {
      console.error('sendEmail error', err);
      setError(t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-light dark:bg-dark relative px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block relative">
              {t('contact.title')}
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-white" />
            </h2>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p>{t('contact.description')}</p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <a
                      href="mailto:karim@karimhammouche.com"
                      className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      karim@karimhammouche.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-300 dark:border-white rounded-full flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('contact.networks')}</h3>
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={reduceMotion}
                  variants={panelVariants}
                  className="p-6 border border-gray-800 bg-darker text-center text-green-500 flex items-center justify-center space-x-2 rounded-2xl"
                >
                  <CheckCircle size={20} />
                  <span>{t('contact.success')}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={reduceMotion}
                  variants={panelVariants}
                >
                  <CompactContactForm
                    id="contact-form"
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
