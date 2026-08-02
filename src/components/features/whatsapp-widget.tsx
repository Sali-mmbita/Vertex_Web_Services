'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { clientConfig } from '@/config/client.config';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function WhatsappWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Safely extract customized configurations with dynamic defaults
  const botConfig = clientConfig.aiAssistant || {
    enabled: true,
    botName: 'Vortex Gemini AI',
    personalityTitle: 'Diagnostic Intelligence',
    welcomeMessage: 'Hello! I am your intelligent diagnostic assistant. How can I help you check pricing or verify coverage today?',
    fallbackResponse: '💡 That sounds like a job for our expert field team! Please call us directly for immediate assistance.',
    knowledgeBase: []
  };

  useEffect(() => {
    // Set initial welcome message only on client to prevent SSR/Hydration timestamp mismatches
    setMessages([
      {
        id: 'welcome',
        text: botConfig.welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);

    // Show notification bubble after 4 seconds to catch interest
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom whenever messages list or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const getBotResponse = (text: string): string => {
    const clean = text.toLowerCase();
    const meta = clientConfig.meta;
    const servicesList = clientConfig.services || [];

    // =========================================================================
    // DYNAMIC INTENT 1: SERVICES & WORK OFFERED (Queries services list dynamically)
    // =========================================================================
    if (clean.includes('service') || clean.includes('offer') || clean.includes('what do you do') || clean.includes('what can you do') || clean.includes('job') || clean.includes('work') || clean.includes('do you fix')) {
      const servicesBulleted = servicesList
        .map((s) => `*   **${s.title}** (starts at $${s.basePrice}): ${s.shortDesc}`)
        .join('\n');
      return `🛠️ **Our Licensed Engineering Services**:\nHere are the professional diagnostics and hydraulic solutions we offer dynamically in your area:\n\n${servicesBulleted}\n\n💡 *Tip: You can use our interactive "Cost Estimator" wizard on our site to calculate a custom pricing range for any of these services!*`;
    }

    // =========================================================================
    // DYNAMIC INTENT 2: LOCATION, ADDRESS, & SERVICE AREA
    // =========================================================================
    if (clean.includes('where') || clean.includes('location') || clean.includes('address') || clean.includes('area') || clean.includes('city') || clean.includes('map') || clean.includes('zip') || clean.includes('palo alto') || clean.includes('serve') || clean.includes('coverage')) {
      return `📍 **Our Headquarters & Coverage Area**:\nWe are headquartered at **${meta.address.street}, ${meta.address.city}, ${meta.address.state} ${meta.address.zip}**.\n\n🚚 **Service Radius:** We operate rolling service rigs across a **${meta.address.serviceRadiusMiles}-mile radius** centered in Silicon Valley!\n\n*   **Active ZIP Codes:** We cover **${meta.address.zipCodes.slice(0, 5).join(', ')}, and surrounding regions**.\n*   *Check your spot:* Use our interactive **Coverage Map** block on the site to verify live staging truck availability inside your postal code!`;
    }

    // =========================================================================
    // DYNAMIC INTENT 3: CONTACT CHANNELS & HOTLINES
    // =========================================================================
    if (clean.includes('contact') || clean.includes('phone') || clean.includes('call') || clean.includes('email') || clean.includes('reach') || clean.includes('number') || clean.includes('hotline') || clean.includes('support')) {
      return `📞 **Our Contact Coordinates**:\nWe are on active dispatch standby. Here is how you can reach our operations team:\n\n*   **Standard Service Line:** ${meta.phone} (Call or Text!)\n*   **24/7 Priority Emergency Hotline:** ${meta.emergencyPhone}\n*   **Administrative Support Email:** ${meta.email}\n\n*   *Live Dispatcher:* You can also click the **WhatsApp Dispatcher** button below to start an instant text conversation!`;
    }

    // =========================================================================
    // DYNAMIC INTENT 4: WORKING HOURS & OPERATING SCHEDULE
    // =========================================================================
    if (clean.includes('hour') || clean.includes('schedule') || clean.includes('when') || clean.includes('open') || clean.includes('close') || clean.includes('time') || clean.includes('day')) {
      return `⏰ **Operating Hours & Dispatch Schedule**:\n*   **Emergency Dispatch:** **24 Hours a day, 7 Days a week**! We never close for emergency pipe bursts, slab leaks, or active flooding.\n*   **Standard Administrative Operations:** Monday through Sunday, from **8:00 AM to 6:00 PM**.\n\n🚨 For immediate emergency service at any hour of the day or night, please dial our priority line: **${meta.emergencyPhone}**!`;
    }

    // =========================================================================
    // CUSTOM CLIENT-SPECIFIC KNOWLEDGE BASE SCAN
    // =========================================================================
    const knowledgeBase = botConfig.knowledgeBase || [];
    for (const item of knowledgeBase) {
      const isMatched = item.keywords.some((keyword) => clean.includes(keyword.toLowerCase()));
      if (isMatched) {
        return item.response;
      }
    }

    // Default custom client fallback response
    return botConfig.fallbackResponse;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}-${Math.random()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    
    // Trigger bot thinking state
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botReplyText = getBotResponse(text);
      
      const botMsgId = `bot-${Date.now()}-${Math.random()}`;
      const botMsg: Message = {
        id: botMsgId,
        text: '', // Start empty to allow typewriter streaming
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);

      // Stream text dynamically in a high-fidelity typewriter fashion
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex += 3; // Stream 3 characters at a time for rapid but organic pacing
        if (currentIndex >= botReplyText.length) {
          setMessages(prev =>
            prev.map(m => m.id === botMsgId ? { ...m, text: botReplyText } : m)
          );
          clearInterval(interval);
        } else {
          setMessages(prev =>
            prev.map(m => m.id === botMsgId ? { ...m, text: botReplyText.slice(0, currentIndex) } : m)
          );
        }
      }, 20); // Fast, snappy, organic rate
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Launch a genuine WhatsApp chat connection as a fallback
  const handleLaunchWhatsApp = () => {
    const message = `Hello ${clientConfig.meta.name}! I would like to schedule a plumbing diagnostic scan or check service rates.`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${clientConfig.meta.phoneRaw}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  // Rich real-time markdown-to-react element formatter (bolds, bullets, paragraphs)
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const isBullet = line.trim().startsWith('*') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.trim().slice(1).trim() : line;

      // Parse bold segments (**text**)
      const parts = cleanLine.split('**');
      const formattedLine = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-extrabold text-brand-cyan">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex gap-1.5 items-start pl-1 my-1.5 text-left">
            <span className="text-brand-cyan shrink-0 mt-1 font-bold">•</span>
            <span className="flex-1">{formattedLine}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1.5 leading-relaxed text-left">
          {formattedLine}
        </p>
      );
    });
  };

  const quickPrompts = [
    { label: '💰 Get Price Estimate', text: 'How do I get a pricing estimate?' },
    { label: '🚨 Emergency Dispatch', text: 'I have a plumbing emergency!' },
    { label: '🔍 Leak Detection', text: 'How does hidden leak detection work?' },
    { label: '💧 Trenchless Sewer Liner', text: 'What is trenchless CIPP sewer lining?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Small notification dialog above button */}
      {showNotification && !isOpen && (
        <div className="mb-3 p-4 rounded-2xl bg-[#0a0a0c] border border-white/10 shadow-[0_5px_25px_rgba(0,0,0,0.5)] max-w-[240px] text-left relative animate-pulse">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-neutral-500 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan absolute" />
            {botConfig.botName}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
            Need pricing details or help? Let's chat instantly!
          </p>
        </div>
      )}

      {/* Main expanded chat container */}
      {isOpen && (
        <div className="mb-4 w-[310px] sm:w-[350px] rounded-3xl bg-[#0a0a0c] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.85)] overflow-hidden text-left flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-indigo to-brand-cyan p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="h-4.5 w-4.5 text-brand-cyan animate-pulse" />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0c]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight flex items-center gap-1">
                  {botConfig.botName} <Badge variant="primary" className="text-[8px] px-1 py-0.5 leading-none h-auto bg-white/10 border-white/10">Gemini-Assist</Badge>
                </span>
                <span className="text-[10px] text-neutral-300">{botConfig.personalityTitle}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body chat area */}
          <div className="p-4 bg-black/95 h-[260px] overflow-y-auto flex flex-col gap-3.5 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`text-xs p-3 rounded-2xl leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-brand-indigo/10 border-brand-indigo/30 text-white rounded-tr-none'
                      : 'bg-neutral-900 border-white/5 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  {msg.sender === 'user' ? msg.text : renderFormattedText(msg.text)}
                </div>
                <span className="text-[9px] text-neutral-500 px-1 font-medium">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col items-start gap-1 max-w-[85%]">
                <div className="bg-neutral-900 border border-white/5 text-neutral-400 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Click Prompts */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleQuickPrompt(p.text)}
                className="text-[10px] font-semibold text-neutral-400 bg-white/5 hover:bg-white/10 border border-white/5 px-2 py-1 rounded-full hover:text-white transition-all duration-200 disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Action Row: Fallbacks to call dispatcher or WhatsApp */}
          <div className="px-4 py-2 bg-black/60 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
            <button
              onClick={handleLaunchWhatsApp}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors text-emerald-500 font-bold cursor-pointer"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Dispatcher
            </button>
            <a
              href={`tel:${clientConfig.meta.phoneRaw}`}
              className="flex items-center gap-1 hover:text-brand-cyan transition-colors text-brand-cyan font-bold"
            >
              <Phone className="h-3 w-3" /> Call Hotline Directly
            </a>
          </div>

          {/* Footer text input */}
          <div className="p-3 border-t border-white/5 bg-black/90 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              disabled={isTyping}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isTyping ? 'Assistant is typing...' : 'Ask about prices, leaks, emergencies...'}
              className="flex-1 text-xs text-white bg-white/[0.02] border border-white/10 px-4 py-2 rounded-full font-medium outline-none focus:border-brand-cyan/50 placeholder:text-neutral-600 disabled:opacity-50"
            />
            <Button
              variant="primary"
              size="sm"
              disabled={isTyping || !inputValue.trim()}
              onClick={() => handleSendMessage()}
              className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-brand-cyan border-brand-cyan hover:bg-brand-cyan/80 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-black"
            >
              <Send className="h-3.5 w-3.5 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleOpenChat}
        className="h-14 w-14 rounded-full bg-brand-indigo border border-brand-indigo/40 hover:bg-brand-indigo/80 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-[0_5px_25px_rgba(79,70,229,0.45)] transition-all duration-300 cursor-pointer"
        aria-label="Open chat widget"
      >
        <MessageSquare className="h-6 w-6 stroke-[2.5]" />
      </button>
    </div>
  );
}
export default WhatsappWidget;
