import React, { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

// ✅ Récupération des clés depuis le .env
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;

interface CompactContactFormProps {
  id?: string;
  formRef?: React.RefObject<HTMLFormElement>;
  handleSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string;
}

const CompactContactForm: React.FC<CompactContactFormProps> = ({
  id,
  formRef,
  handleSubmit,
  loading,
  error,
}) => {
  const { t } = useTranslation();
  const internalFormRef = useRef<HTMLFormElement>(null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [internalError, setInternalError] = useState('');

  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (err) {
      console.error('EmailJS init error', err);
    }
  }, []);

  const internalHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalFormRef.current) return;

    try {
      setInternalLoading(true);
      setInternalError('');

      const formData = new FormData(internalFormRef.current);
      const sanitizedData = {
        user_name: DOMPurify.sanitize(formData.get('user_name') as string),
        user_email: DOMPurify.sanitize(formData.get('user_email') as string),
        message: DOMPurify.sanitize(formData.get('message') as string),
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        sanitizedData,
        EMAILJS_PUBLIC_KEY
      );


      if (result.text === 'OK') {
        setSuccess(true);
        internalFormRef.current.reset();
      } else {
        throw new Error('Email non envoyé');
      }
    } catch (err) {
      console.error('EmailJS error', err);
      setInternalError(t('contactForm.error'));
    } finally {
      setInternalLoading(false);
    }
  };

  if (success && !handleSubmit) {
    return (
      <div className="p-6 border border-gray-800 bg-darker text-center text-green-500 flex items-center justify-center space-x-2 rounded-2xl">
        <CheckCircle size={20} />
        <span>{t('contactForm.success')}</span>
      </div>
    );
  }

  return (
    <form
      id={id}
      ref={formRef ?? internalFormRef}
      onSubmit={handleSubmit ?? internalHandleSubmit}
      className="space-y-4 max-w-md w-full rounded-2xl bg-zinc-900 p-6 md:p-8 text-sm text-white border border-gray-800"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.nameLabel')}
        </label>
        <input
          type="text"
          id="name"
          name="user_name"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.namePlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.emailLabel')}
        </label>
        <input
          type="email"
          id="email"
          name="user_email"
          required
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.emailPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          {t('contactForm.messageLabel')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg bg-white/5 placeholder-gray-400 border border-white/20 p-3 focus:outline-none focus:border-white/40"
          placeholder={t('contactForm.messagePlaceholder')}
        ></textarea>
      </div>

      {(error ?? internalError) && (
        <div className="text-red-500 text-sm">{error ?? internalError}</div>
      )}

      <button
        type="submit"
        disabled={loading ?? internalLoading}
        className={`w-full flex items-center justify-center py-2 text-sm rounded-lg bg-white text-black font-medium transition ${
          loading ?? internalLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'
        }`}
      >
        {(loading ?? internalLoading) ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ms-1 me-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t('contactForm.sending')}
          </span>
        ) : (
          <span className="flex items-center">
            <Send size={18} className="me-2" />
            {t('contactForm.send')}
          </span>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        {t('contactForm.disclaimer')}
      </p>
    </form>
  );
};

export default CompactContactForm;
