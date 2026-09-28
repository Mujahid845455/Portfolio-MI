'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, RotateCcw, User, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const FAQ_QUESTIONS = [
  "🌟 What is your best project?",
  "🏆 How many hackathons have you participated in?",
  "💻 What is your technical tech stack?",
  "🎓 Tell me about your education",
  "✉️ How can I contact Mujahidul?",
];

function getBotResponse(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  if (query.includes('best project') || query.includes('top project') || query.includes('featured project') || query.includes('gesturelink')) {
    return "🚀 **Mujahidul's Flagship Project**:\n\n• **GestureLink AI**: Real-Time Sign Language Communication Platform using TensorFlow, MediaPipe, Three.js 3D avatars & Socket.io.\n\nOther top projects include:\n• **AgentPay**: AI Growth & Agentic Commerce Platform with Razorpay test payment integration & policy gateway.\n• **Intelli-Credit**: AI Corporate Credit Appraisal System that generates CAM reports under 30 mins.";
  }

  if (query.includes('hackathon') || query.includes('competition') || query.includes('participat')) {
    return "🏆 **Hackathon Participations (6 Major Events)**:\n\n1. **Adobe University Hackathon** (Adobe & Unstop - Aug 2026)\n2. **National AI/ML Hackathon** (Vivriti Capital & IIT Hyderabad)\n3. **Solution Challenge 2026: Build with AI** (Google & Hack2Skill - Jul 2026)\n4. **Flipkart GRID 8.0** (Advanced to Round 2)\n5. **Microsoft Imagine Cup** (Global Competition)\n6. **AI for Bharat Hackathon**\n\nCertificates can be viewed in the Achievements section!";
  }

  if (query.includes('skill') || query.includes('tech stack') || query.includes('language') || query.includes('dsa') || query.includes('python') || query.includes('java')) {
    return "💻 **Technical Stack Summary**:\n\n• **Languages**: Java (DSA in Java), Python, C, C++, JavaScript, TypeScript, HTML5/CSS3\n• **Frontend**: React.js, Next.js, Tailwind CSS, Bootstrap\n• **Backend**: Node.js, Express.js, FastAPI, Flask\n• **AI/ML**: TensorFlow, PyTorch, OpenCV, Scikit-learn, NumPy, Pandas\n• **Databases**: MongoDB, PostgreSQL, MySQL, Redis, Firebase\n• **Tools & Cloud**: Docker, AWS, Git, GitHub, Linux, Vercel, Postman";
  }

  if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('study')) {
    return "🎓 **Education Details**:\n\n• **B.Tech in Cybersecurity** (Current 2024–2028)\n  *Darbhanga College of Engineering, Darbhanga*\n• **Intermediate** (79.8%)\n  *T.P. Verma College, Narkatiaganj*\n• **Matriculation** (78.7%)\n  *+2 High School, Narkatiaganj*";
  }

  if (query.includes('experience') || query.includes('intern') || query.includes('work')) {
    return "💼 **Work Experience**:\n\n• **Web Development Intern at UptoSkills** (Dec 2025 - Mar 2026)\n  - Developed responsive React web applications.\n  - Integrated REST APIs and authentication modules.\n  - Enhanced UI/UX & debugged production code under mentorship.";
  }

  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('reach')) {
    return "✉️ **Contact Details**:\n\n• **Email**: mujahidulI845455@gmail.com\n• **Phone**: +91 8603629937\n• **GitHub**: github.com/mujahidul885\n• **LinkedIn**: linkedin.com/in/mujahidul-islam\n• **Location**: Darbhanga, Bihar, India";
  }

  return "🤖 Hello! I'm Mujahidul's AI Portfolio Assistant. I can help you with:\n\n• Featured & Other Projects details\n• Hackathon participations & achievements\n• Technical skills (DSA, React, Next.js, Python, FastAPI)\n• Education & Internships\n• Contact information\n\nWhat would you like to know?";
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hi! 👋 I'm Mujahidul's AI Portfolio Assistant. Ask me anything about his projects, hackathons, or technical skills!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = getBotResponse(query);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: "Chat reset! 👋 Ask me anything about Mujahidul's projects, hackathons, or skills.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex px-3.5 py-1.5 glass rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-xl items-center gap-1.5"
          >
            <Sparkles size={13} className="animate-pulse text-purple-400" />
            Ask Portfolio AI
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-purple-400/50 flex items-center justify-center group overflow-hidden"
          aria-label="Toggle AI Assistant"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          {isOpen ? <X size={24} /> : <Bot size={26} className="animate-bounce" />}
          {!isOpen && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black animate-ping" />
          )}
        </motion.button>
      </div>

      {/* Chatbot Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[550px] glass rounded-3xl border border-purple-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden bg-black/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-purple-950/80 via-gray-950 to-indigo-950/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300">
                  <Bot size={22} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Portfolio AI Assistant
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px]">
                      v2.0
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Ask about projects, hackathons & skills</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Chat"
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                        : 'glass border border-white/10 text-gray-200 rounded-tl-none bg-white/[0.04]'
                    }`}
                  >
                    {msg.text.split('\n').map((line, lIdx) => {
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <div key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className="font-bold text-purple-300">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </div>
                      );
                    })}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-purple-200/80' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
                  <Bot size={15} className="text-purple-400 animate-spin" />
                  <span>AI Assistant is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 border-t border-white/10 bg-white/[0.02]">
              <p className="text-[10px] text-gray-400 mb-1.5 px-1 font-semibold flex items-center gap-1">
                <Sparkles size={11} className="text-purple-400" />
                Quick Suggestions:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {FAQ_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-3 py-1 rounded-full glass border border-white/10 text-[11px] text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-purple-500/10 whitespace-nowrap transition-all shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-gray-950 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about projects, hackathons..."
                className="flex-1 px-4 py-2.5 glass rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`p-2.5 rounded-xl bg-purple-600 text-white transition-all ${
                  inputMessage.trim()
                    ? 'hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
