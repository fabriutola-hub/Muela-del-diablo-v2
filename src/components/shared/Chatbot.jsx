import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CapacitorHttp } from '@capacitor/core';

// --- Componentes Decorativos TVA ---
const Scanlines = () => (
  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl opacity-20">
    <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent animate-scan" />
  </div>
);

const CRTFlicker = () => (
  <div className="absolute inset-0 pointer-events-none z-30 bg-orange-500/5 mix-blend-overlay animate-flicker rounded-3xl" />
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 🔥 CAMBIO 1: Saludo oficial de Miss Minutes
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Saludos, Variante. 👋 Soy Miss Minutes, tu guía y reloj virtual en la Sagrada Línea Temporal de la Muela del Diablo. ¿Cuál es tu duda el día de hoy?',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_URL = 'https://miss-minutes-backend.onrender.com/api/chat';
  // Nota: Asegúrate de cambiar la imagen por una de Miss Minutes si tienes una
  const chatbotIcon = '/imagenes/360/missminutes.png'; 

  // --- Lógica del Chat ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages]);
  
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await CapacitorHttp.post({
        url: API_URL,
        headers: { 'Content-Type': 'application/json' },
        data: { 
            message: currentInput, 
            sessionId, 
            useVision: false 
        }
      });

      const botMessage = {
        type: 'bot',
        text: response.data.response,
        images: response.data.images || [],
        analyzedImages: response.data.analyzedImages || [],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: '¡ALERTA DE NEXO! Error de comunicación en la línea temporal. Intenta de nuevo.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = async () => {
    try {
      await CapacitorHttp.post({
        url: 'https://miss-minutes-backend.onrender.com/api/reset',
        headers: { 'Content-Type': 'application/json' },
        data: { sessionId }
      });
      // 🔥 CAMBIO 2: Mensaje de reinicio actualizado
      setMessages([{
        type: 'bot',
        text: 'Línea temporal podada. ✂️ Empecemos de nuevo. ¿Cuál es tu duda el día de hoy?',
        timestamp: new Date()
      }]);
    } catch (error) { console.error(error); }
  };

  const quickSuggestions = [
    'UBICACIÓN DEL OBJETIVO 🗺️',
    'ANÁLISIS DE LA CIMA 🏔️',
    'ARCHIVO VISUAL 📸',
    'VECTOR DE APROXIMACIÓN 🚗'
  ];

  return (
    <>
      {/* --- BOTÓN FLOTANTE "TEMPAD" --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_0_30px_rgba(234,88,12,0.6)] border-4 border-[#5c2e08] bg-[#1a1510] flex items-center justify-center overflow-hidden group"
      >
        <div className="absolute inset-0 border-2 border-dashed border-orange-500/50 rounded-full animate-[spin_10s_linear_infinite]" />
        
        {isOpen ? (
          <span className="text-orange-500 text-3xl font-bold font-mono">X</span>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={chatbotIcon} 
              alt="AI" 
              className="w-10 h-10 md:w-12 md:h-12 object-cover sepia-[.5] contrast-125 group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-pulse" />
          </div>
        )}
      </motion.button>

      {/* --- VENTANA DEL CHAT --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed inset-x-0 bottom-0 md:inset-x-auto md:right-8 md:bottom-28 z-[100] w-full md:w-[450px] h-[85vh] md:h-[calc(100vh-150px)] md:max-h-[700px] flex flex-col"
          >
            {/* Carcasa */}
            <div className="relative w-full h-full bg-[#1a1510] border-2 border-[#ea580c] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col font-mono">
              
              <Scanlines />
              <CRTFlicker />
              
              {/* --- HEADER TVA --- */}
              <div className="relative z-40 bg-[#2c1a0f] border-b-2 border-[#ea580c] p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#ea580c] bg-[#1a1510] overflow-hidden relative">
                    <img src={chatbotIcon} className="w-full h-full object-cover sepia" alt="Avatar" />
                    <div className="absolute inset-0 bg-orange-500/10" />
                  </div>
                  <div>
                    {/* 🔥 CAMBIO 3: Nombre en Header */}
                    <h3 className="text-[#ea580c] font-bold tracking-widest text-sm">MISS_MINUTES_AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#ea580c] rounded-full animate-ping" />
                      <span className="text-[#ea580c]/70 text-[10px] uppercase tracking-wider">En Línea</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleReset}
                  className="w-8 h-8 border border-[#ea580c] rounded flex items-center justify-center text-[#ea580c] hover:bg-[#ea580c] hover:text-black transition-colors"
                  title="Podar Línea Temporal"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>

              {/* --- AREA DE MENSAJES --- */}
              <div className="relative z-40 flex-1 overflow-y-auto p-4 space-y-6 bg-[#110c08] scrollbar-thin scrollbar-thumb-[#ea580c] scrollbar-track-[#2c1a0f]">
                <div className="text-center my-4">
                  <span className="text-[#ea580c]/40 text-xs border border-[#ea580c]/20 px-2 py-1 rounded uppercase tracking-widest">
                    {new Date().toLocaleDateString()} • ARCHIVO TVA-782
                  </span>
                </div>

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-4 relative group ${
                        msg.type === 'user' 
                          ? 'bg-[#ea580c]/10 border border-[#ea580c]/50 text-[#ea580c]' 
                          : 'bg-[#2c1a0f] border border-[#5c2e08] text-[#fdba74]'
                      }`}
                      style={{
                        clipPath: msg.type === 'user' 
                          ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                          : 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                      }}
                    >
                      {/* 🔥 CAMBIO 4: Etiqueta del hablante */}
                      <span className={`absolute -top-3 ${msg.type === 'user' ? 'right-2' : 'left-2'} text-[9px] bg-[#1a1510] px-1 uppercase tracking-widest border border-[#ea580c]/30`}>
                        {msg.type === 'user' ? 'VARIANTE' : 'MISS_MINUTES'}
                      </span>

                      <p className="text-sm md:text-base font-mono leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>

                      {msg.images?.length > 0 && (
                        <div className="mt-3 grid gap-2">
                          {msg.images.map((img, i) => (
                            <div key={i} className="border border-[#ea580c]/30 bg-black/40 p-1">
                              <img src={img.url} alt="Evidencia" className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity sepia-[.3]" />
                              <div className="flex justify-between items-center px-1 pt-1">
                                <span className="text-[8px] text-[#ea580c] uppercase">FIG.{i+1}</span>
                                <span className="text-[8px] text-[#ea580c] uppercase">LAT_DATA</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className="block text-[9px] opacity-50 mt-2 text-right uppercase font-bold">
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-[#ea580c] animate-pulse pl-2">
                    <span className="text-xs uppercase tracking-widest">Procesando...</span>
                    <span className="w-2 h-4 bg-[#ea580c]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* --- SUGERENCIAS --- */}
              {messages.length <= 1 && (
                <div className="relative z-40 bg-[#110c08] p-3 border-t border-[#5c2e08] flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setInputValue(suggestion); inputRef.current?.focus(); }}
                      className="whitespace-nowrap px-3 py-2 bg-[#2c1a0f] border border-[#5c2e08] text-[#ea580c] text-xs uppercase tracking-wider hover:bg-[#ea580c] hover:text-[#1a1510] transition-colors clip-path-angle"
                      style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* --- INPUT --- */}
              <form onSubmit={handleSendMessage} className="relative z-40 bg-[#1a1510] p-4 border-t-2 border-[#ea580c] flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <span className="text-[#ea580c] font-bold text-lg">{'>'}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escriba comando..."
                    disabled={isTyping}
                    className="flex-1 bg-transparent text-[#ea580c] placeholder-[#ea580c]/30 focus:outline-none font-mono text-sm md:text-base caret-[#ea580c]"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-2 bg-[#ea580c] text-[#1a1510] font-bold text-xs uppercase tracking-widest hover:bg-[#fdba74] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
                  >
                    Enviar
                  </button>
                </div>
              </form>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}