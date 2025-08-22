// src/components/AgentIA.tsx
import { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const LIBRETRANSLATE_URL =
  import.meta.env.VITE_LIBRETRANSLATE_URL || "https://libretranslate.de/translate";

const SUPPORTED_LANGUAGES = {
  fr: { name: "Français", flag: "🇫🇷" },
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Español", flag: "🇪🇸" },
  ja: { name: "日本語", flag: "🇯🇵" },
  zh: { name: "中文", flag: "🇨🇳" },
  ar: { name: "العربية", flag: "🇸🇦" },
  th: { name: "ไทย", flag: "🇹🇭" }
};

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
    const res = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: fromLang, target: toLang, format: "text" }),
    });

    const data = await res.json();
    return data.translatedText?.trim() || text;
  } catch {
    return text;
  }
}

function detectLanguage(text: string): SupportedLanguage {
  const lower = text.toLowerCase();
  if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(text)) return "ja";
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0E00-\u0E7F]/.test(text)) return "th";
  if (/(bonjour|merci|comment|ça|été|être|é)/i.test(lower)) return "fr";
  if (/(hola|gracias|cómo|qué|estás)/i.test(lower)) return "es";
  return "en";
}


const askFallbackAI = (q: string) => {
  return `🤖 ${q}? Très bonne question !`;
};

type ChatMessage = { role: "user" | "assistant"; content: string; lang: SupportedLanguage };

export default function ChatWidget() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typing]);

  useEffect(() => () => typingIntervalRef.current && clearInterval(typingIntervalRef.current), []);

  const handleReset = () => {
    setHistory([]);
    setTyping("");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setTyping("");

    const lang = detectLanguage(question);
    setHistory((prev) => [...prev, { role: "user", content: question, lang }]);

    let prompt = question;
    if (lang !== "en") prompt = await translateText(question, lang, "en");

    const response = askFallbackAI(prompt);
    let answer = response;

    if (lang !== "en") {
      try {
        const translated = await translateText(response, "en", lang);
        if (translated) answer = translated;
      } catch {
        /* empty */
      }
    }

    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      setTyping(answer.slice(0, i + 1));
      i++;
      if (i >= answer.length && typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        setTyping("");
        setHistory((prev) => [...prev, { role: "assistant", content: answer, lang }]);
      }
    }, 25);

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="bg-black rounded-lg shadow-2xl p-4 flex flex-col w-80 border border-white/20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M12,2A10,10 0 1,1 2,12A10,10 0 0,1 12,2Z" /></svg>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">{t('chatWidget.title')}</h3>
            <p className="text-gray-400 text-xs">{t('chatWidget.subtitle')}</p>
          </div>
        </div>
        <button onClick={handleReset} disabled={loading} className="text-gray-400 hover:text-white text-xs">{t('chatWidget.clear')}</button>
      </div>

      <div className="w-full h-64 overflow-y-auto mb-4 space-y-3">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className={`w-6 h-6 rounded-full mt-1 flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-white/20" : "bg-white"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  msg.role === "user" ? "bg-white" : "bg-black"
                }`} />
              </div>
              <div className={`px-3 py-2 rounded-lg text-sm ${
                msg.role === "user" ? "bg-white text-black" : "bg-white/10 text-white border border-white/20"
              }`}>
                <div>{msg.content}</div>
                <div className="text-xs mt-1 opacity-60 flex gap-1">
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.flag}</span>
                  <span>{SUPPORTED_LANGUAGES[msg.lang]?.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm">
                  {typing}<span className="animate-pulse ms-1">|</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          placeholder={t('chatWidget.placeholder')}
          className="w-full p-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/20 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className={`w-full bg-white text-black font-medium py-2 rounded-lg text-sm ${
            loading || !question.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-white/90"
          }`}
        >
          {loading ? t('chatWidget.generating') : t('chatWidget.send')}
        </button>
      </form>
    </div>
  );
}
