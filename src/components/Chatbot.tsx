
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatbotProps {
  videoId: string;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = ({ videoId, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I can answer questions about this video. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      // In a real app, this would be an API call
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue, videoId),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Simplified mock responses
  const getBotResponse = (message: string, videoId: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('summary')) {
      return 'This video covers machine learning basics, including supervised and unsupervised learning approaches, along with practical applications in different industries.';
    } else if (lowerMessage.includes('key') && lowerMessage.includes('point')) {
      return 'The key points are: 1) Machine learning is a subset of AI, 2) Data quality matters, 3) There are different types of learning approaches, 4) Applications span multiple industries.';
    } else if (lowerMessage.includes('who') || lowerMessage.includes('speaker')) {
      return 'The speaker in this video is a machine learning expert with over 10 years of industry experience.';
    } else if (lowerMessage.includes('example') || lowerMessage.includes('application')) {
      return 'Some real-world applications mentioned include recommendation systems, fraud detection, image recognition, and natural language processing.';
    } else {
      return "I'm still learning about this video. Can you ask something more specific about the content?";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 right-6 w-80 md:w-96 h-96 rounded-2xl bg-white shadow-elevation border border-gray-100 flex flex-col overflow-hidden z-50"
    >
      {/* Chatbot Header */}
      <div className="p-3 bg-youlearn-blue text-white flex items-center justify-between">
        <div className="flex items-center">
          <Bot size={18} className="mr-2" />
          <h3 className="font-medium">YouLearn Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-youlearn-blue text-white rounded-tr-none' 
                  : 'bg-white shadow-sm border border-gray-100 rounded-tl-none'
              }`}>
                <div className="flex items-start gap-2">
                  {message.sender === 'bot' && (
                    <Bot size={16} className="mt-1 text-youlearn-blue" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <User size={16} className="mt-1 text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-start"
            >
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 rounded-tl-none">
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-youlearn-blue" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Ask about the video..."
            className="flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon"
            className="bg-youlearn-blue hover:bg-youlearn-lightBlue text-white"
            disabled={!inputValue.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Chatbot;
