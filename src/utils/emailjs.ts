// src/utils/emailjs.ts
import emailjs from '@emailjs/browser';

/**
 * 📤 Envoie un email via EmailJS à partir d’un formulaire HTML.
 * 📤 Sends an email via EmailJS from a given HTML form element.
 */
export const sendEmail = async (formElement: HTMLFormElement) => {
  if (!formElement) {
    throw new Error('❌ Formulaire introuvable / Form element not found');
  }

  return await emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID!,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
    formElement,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
  );
};
