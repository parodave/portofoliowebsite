import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from '../utils/translation';
import { detectLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../utils/language';
import { askFallbackAI } from '../utils/fallbackAI';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  lang: SupportedLanguage;
};

export default function ChatWidget() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading, typing]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handleReset = () => {
    setHistory([]);
    setTyping('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading && question.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent,
  ) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setTyping('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const detectedLang: SupportedLanguage = detectLanguage(question);

    setHistory((prev) => [
      ...prev,
      { role: 'user', content: question, lang: detectedLang },
    ]);

    try {
      let prompt = question;
      let needsTranslation = false;

      if (detectedLang !== 'en') {
        try {
          prompt = await translateText(question, detectedLang, 'en');
          needsTranslation = true;
        } catch {
          prompt = question;
        }
      }

      const response = askFallbackAI(prompt);

      let answer = response;
      const responseLanguage: SupportedLanguage = detectedLang;

      if (needsTranslation && detectedLang !== 'en' && response) {
        try {
          const translatedAnswer = await translateText(response, 'en', detectedLang);
          if (translatedAnswer && translatedAnswer !== response) {
            answer = translatedAnswer;
          }
        } catch {
          // keep original answer
        }
      }

      if (!answer || answer.trim().length === 0) {
        const fallbackMessages: Record<SupportedLanguage, string> = {
          fr: 'Je réfléchis à votre question...',
          en: "I'm thinking about your question...",
          es: 'Estoy pensando en tu pregunta...',
          ja: 'あなたの質問について考えています...',
          zh: '我正在思考你的问题...',
          ar: 'أفكر في سؤالك...',
          th: 'ฉันกำลังคิดเกี่ยวกับคำถามของคุณ...'
        };
        answer = fallbackMessages[detectedLang] || fallbackMessages.en;
      }

      let i = 0;
      setTyping('');
      intervalRef.current = setInterval(() => {
        setTyping(answer.slice(0, i + 1));
        i++;
        if (i >= answer.length && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setHistory((prev) => [
            ...prev,
            { role: 'assistant', content: answer, lang: responseLanguage },
          ]);
          setTyping('');
        }
      }, 25);
    } catch (error) {
      console.error('❌ Erreur générale:', error);
      const errorMessages: Record<SupportedLanguage, string> = {
        fr: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        en: 'Sorry, an error occurred. Please try again.',
        es: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
        ja: '申し訳ございませんが、エラーが発生しました。もう一度お試しください。',
        zh: '抱歉，发生了错误。请重试。',
        ar: 'آسف، حدث خطأ. يرجى المحاولة مرة أخرى.',
        th: 'ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
      };

      setHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessages[detectedLang] || errorMessages.en,
          lang: detectedLang,
        },
      ]);
    }

    setLoading(false);
    setQuestion('');
  };

  return (
    <div className="bg-black rounded-lg shadow-2xl p-4 flex flex-col w-80 border border-white/20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">{t('chat.title')}</h3>
            <p className="text-gray-400 text-xs">{t('chat.subtitle')}</p>
          </div>
        </div>
        <button onClick={handleReset} disabled={loading} className="text-gray-400 hover:text-white transition-colors text-xs">
          {t('chat.clear')}
        </button>
      </div>

      <div className="w-full h-64 overflow-y-auto mb-4 space-y-3">
        {history.length === 0 && !loading && !typing && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/60">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z" />
              </svg>
            </div>
            <p className="text-white/80 text-sm mb-2">{t('chat.ready')}</p>
            <p className="text-gray-400 text-xs">{t('chat.supported')}</p>
          </div>
        )}

        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className={`w-6 h-6 ${msg.role === 'user' ? 'bg-white/20' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                <div className={`w-2 h-2 ${msg.role === 'user' ? 'bg-white' : 'bg-black'} rounded-full`} />
              </div>
              <div className={`px-3 py-2 rounded-lg text-sm ${msg.role === 'user' ? 'bg-white text-black' : 'bg-white/10 text-white border border-white/20'}`}>
                <div className="leading-relaxed">{msg.content}</div>
                <div className="text-xs mt-1 opacity-60 flex items-center gap-1">
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.flag || '🌍'}</span>
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.name || msg.lang}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm">
                {typing}
                <span className="animate-pulse ms-1">|</span>
              </div>
            </div>
          </div>
        )}

        {loading && !typing && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-black rounded-full animate-spin" />
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span>{t('chat.thinking')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={t('chat.placeholder')}
          className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/40 transition text-sm"
          disabled={loading}
        />
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={loading || !question.trim()}
          className={`w-full bg-white text-black font-medium py-2 rounded-lg transition text-sm ${loading || !question.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'}`}
        >
          {loading ? t('chat.generating') : t('chat.send')}
        </button>
      </div>
    </div>
  );
}
