import { detectLanguage, SupportedLanguage } from './language';

type ResponseCategory = {
  greeting: string[];
  howAreYou: string[];
  name: string[];
  help: string[];
  generic: string[];
};

export const responses: Record<SupportedLanguage, ResponseCategory> = {
  fr: {
    greeting: ['Bonjour ! Comment puis-je vous aider ?', 'Salut ! Que puis-je faire pour vous ?'],
    howAreYou: ['Je vais bien, merci ! Et vous ?', 'Ça va très bien, merci de demander !'],
    name: ['Je suis votre assistant IA personnel.', 'Je suis une IA créée pour vous aider.'],
    help: ['Je peux vous aider avec vos questions.', "Je suis là pour discuter avec vous."],
    generic: ["C'est une question intéressante !", 'Pouvez-vous me donner plus de détails ?'],
  },
  en: {
    greeting: ['Hello! How can I help you?', 'Hi there! What can I do for you?'],
    howAreYou: ["I'm doing well, thank you! How are you?", "I'm great, thanks for asking!"],
    name: ["I'm your personal AI assistant.", "I'm an AI created to help you."],
    help: ['I can help you with questions.', "I'm here to chat with you."],
    generic: ["That's interesting!", 'Could you tell me more?'],
  },
  es: {
    greeting: ['¡Hola! ¿Cómo puedo ayudarte?', '¡Buenos días! ¿En qué puedo asistirte?'],
    howAreYou: ['¡Estoy bien, gracias! ¿Y tú?', '¡Muy bien, gracias por preguntar!'],
    name: ['Soy tu asistente personal de IA.', 'Soy una IA creada para ayudarte.'],
    help: ['Puedo ayudarte con preguntas.', 'Estoy aquí para charlar contigo.'],
    generic: ['¡Eso es interesante!', '¿Podrías contarme más?'],
  },
  ja: {
    greeting: ['こんにちは！どのようにお手伝いできますか？', 'おはようございます！'],
    howAreYou: ['元気です、ありがとう！あなたはいかがですか？', 'とても良いです！'],
    name: ['私はあなたの個人AIアシスタントです。', '私はAIです。'],
    help: ['質問にお答えできます。', 'チャットができます。'],
    generic: ['それは興味深いですね！', 'もう少し詳しく教えてください。'],
  },
  zh: {
    greeting: ['你好！我能帮你什么吗？', '早上好！'],
    howAreYou: ['我很好，谢谢！你怎么样？', '很棒，谢谢！'],
    name: ['我是你的个人AI助手。', '我是AI。'],
    help: ['我可以帮你回答问题。', '我可以和你聊天。'],
    generic: ['这很有趣！', '你能告诉我更多吗？'],
  },
  ar: {
    greeting: ['مرحبا! كيف يمكنني مساعدتك؟', 'صباح الخير!'],
    howAreYou: ['أنا بخير، شكراً! وأنت؟', 'رائع، شكراً!'],
    name: ['أنا مساعدك الشخصي للذكاء الاصطناعي.', 'أنا ذكاء اصطناعي.'],
    help: ['يمكنني مساعدتك في الأسئلة.', 'أنا هنا للدردشة.'],
    generic: ['هذا مثير للاهتمام!', 'هل يمكنك إخباري أكثر؟'],
  },
  th: {
    greeting: ['สวัสดี! ฉันช่วยอะไรคุณได้บ้าง?', 'สวัสดีตอนเช้า!'],
    howAreYou: ['ฉันสบายดี ขอบคุณ! คุณเป็นอย่างไรบ้าง?', 'ดีมาก ขอบคุณ!'],
    name: ['ฉันเป็นผู้ช่วย AI ส่วนตัวของคุณ', 'ฉันเป็น AI'],
    help: ['ฉันสามารถช่วยตอบคำถามได้', 'ฉันอยู่ที่นี่เพื่อแชท'],
    generic: ['น่าสนใจมาก!', 'คุณช่วยเล่าให้ฟังมากกว่านี้ได้ไหม?'],
  },
};

export function askFallbackAI(question: string): string {
  const lowerQ = question.toLowerCase();
  const detectedLang = detectLanguage(question);

  const langResponses = responses[detectedLang] || responses.en;

  if (
    lowerQ.includes('hello') ||
    lowerQ.includes('hi') ||
    lowerQ.includes('bonjour') ||
    lowerQ.includes('hola') ||
    lowerQ.includes('こんにちは') ||
    lowerQ.includes('你好') ||
    lowerQ.includes('مرحبا') ||
    lowerQ.includes('สวัสดี')
  ) {
    return langResponses.greeting[Math.floor(Math.random() * langResponses.greeting.length)];
  }

  if (
    lowerQ.includes('how are you') ||
    lowerQ.includes('comment allez') ||
    lowerQ.includes('comment vas') ||
    lowerQ.includes('como estas') ||
    lowerQ.includes('元気') ||
    lowerQ.includes('你好吗') ||
    lowerQ.includes('كيف حالك') ||
    lowerQ.includes('สบายดี')
  ) {
    return langResponses.howAreYou[Math.floor(Math.random() * langResponses.howAreYou.length)];
  }

  if (
    lowerQ.includes('name') ||
    lowerQ.includes('qui es') ||
    lowerQ.includes('quien eres') ||
    lowerQ.includes('名前') ||
    lowerQ.includes('你是谁') ||
    lowerQ.includes('من أنت') ||
    lowerQ.includes('คุณคือใคร')
  ) {
    return langResponses.name[Math.floor(Math.random() * langResponses.name.length)];
  }

  if (
    lowerQ.includes('help') ||
    lowerQ.includes('aide') ||
    lowerQ.includes('ayuda') ||
    lowerQ.includes('助け') ||
    lowerQ.includes('帮助') ||
    lowerQ.includes('مساعدة') ||
    lowerQ.includes('ช่วย')
  ) {
    return langResponses.help[Math.floor(Math.random() * langResponses.help.length)];
  }

  return langResponses.generic[Math.floor(Math.random() * langResponses.generic.length)];
}
