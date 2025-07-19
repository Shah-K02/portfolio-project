import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, User, Minimize2, Maximize2 } from 'react-feather';
import './AIAssistant.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

interface AIAssistantProps {
  portfolioData?: {
    name: string;
    skills: string[];
    projects: Array<{ title: string; description: string; technologies: string[] }>;
    experience: Array<{ company: string; role: string; duration: string }>;
  };
}

const AIAssistant: React.FC<AIAssistantProps> = ({ portfolioData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultPortfolioData = {
    name: 'Portfolio Owner',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    projects: [
      { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution', technologies: ['React', 'Node.js', 'MongoDB'] },
      { title: 'Mobile App', description: 'Cross-platform mobile application', technologies: ['React Native', 'Firebase'] },
      { title: 'Data Analytics Dashboard', description: 'Real-time analytics platform', technologies: ['Python', 'D3.js', 'PostgreSQL'] }
    ],
    experience: [
      { company: 'Tech Corp', role: 'Senior Developer', duration: '2022-Present' },
      { company: 'StartupXYZ', role: 'Full Stack Developer', duration: '2020-2022' }
    ]
  };

  const data = portfolioData || defaultPortfolioData;

  const knowledgeBase = useMemo(() => ({
    greetings: [
      'Hello! I\'m your AI assistant. How can I help you learn more about this portfolio?',
      'Hi there! I\'m here to answer any questions about the projects, skills, or experience showcased here.',
      'Welcome! Feel free to ask me anything about this portfolio or the work displayed.'
    ],
    skills: {
      patterns: ['skill', 'technology', 'tech stack', 'programming', 'language', 'framework'],
      response: `The main skills showcased include: ${data.skills.join(', ')}. Each skill has been applied across various projects with different levels of expertise.`
    },
    projects: {
      patterns: ['project', 'work', 'portfolio', 'built', 'created', 'developed'],
      response: `Here are the featured projects: ${data.projects.map(p => `${p.title} - ${p.description}`).join('; ')}. Would you like to know more about any specific project?`
    },
    experience: {
      patterns: ['experience', 'work history', 'career', 'job', 'employment'],
      response: `Professional experience includes: ${data.experience.map(e => `${e.role} at ${e.company} (${e.duration})`).join('; ')}.`
    },
    contact: {
      patterns: ['contact', 'reach out', 'get in touch', 'hire', 'email'],
      response: 'You can find contact information in the Contact section of the portfolio. Feel free to reach out for collaborations or opportunities!'
    },
    help: {
      patterns: ['help', 'what can you do', 'commands', 'assistance'],
      response: 'I can help you with information about skills, projects, experience, and how to get in touch. Try asking about specific technologies, projects, or career background!'
    }
  }), [data]);

  const quickSuggestions = useMemo(() => [
    'What skills are showcased?',
    'Tell me about the projects',
    'What\'s the work experience?',
    'How can I get in touch?',
    'What technologies are used?'
  ], []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)],
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
      setSuggestions(quickSuggestions.slice(0, 3));
    }
  }, [isOpen, messages.length, knowledgeBase.greetings, quickSuggestions]);

  const updateSuggestions = useCallback((userMessage: string) => {
    const message = userMessage.toLowerCase();
    let newSuggestions: string[] = [];
    
    if (message.includes('skill') || message.includes('technology')) {
      newSuggestions = [
        'What projects use React?',
        'Tell me about the backend skills',
        'What\'s the experience with cloud platforms?'
      ];
    } else if (message.includes('project')) {
      newSuggestions = [
        'What technologies were used?',
        'How long did the projects take?',
        'Are there any live demos?'
      ];
    } else if (message.includes('experience')) {
      newSuggestions = [
        'What was the role at each company?',
        'What skills were developed?',
        'Any notable achievements?'
      ];
    } else {
      newSuggestions = quickSuggestions.slice(0, 3);
    }
    
    setSuggestions(newSuggestions);
  }, [quickSuggestions]);

  const generateResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific patterns
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (category === 'greetings') continue;
      
      const categoryData = data as { patterns: string[]; response: string };
      if (categoryData.patterns.some(pattern => message.includes(pattern))) {
        return categoryData.response;
      }
    }
    
    // Specific project inquiries
    const projectMatch = data.projects.find(p => 
      message.includes(p.title.toLowerCase()) || 
      p.technologies.some(tech => message.includes(tech.toLowerCase()))
    );
    
    if (projectMatch) {
      return `${projectMatch.title}: ${projectMatch.description}. Built with: ${projectMatch.technologies.join(', ')}. This project demonstrates expertise in modern web development and problem-solving.`;
    }
    
    // Specific skill inquiries
    const skillMatch = data.skills.find(skill => message.includes(skill.toLowerCase()));
    if (skillMatch) {
      return `${skillMatch} is one of the core skills showcased. It's been used across multiple projects and demonstrates proficiency in modern development practices.`;
    }
    
    // Default responses for common queries
    if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! How can I help you explore this portfolio today?';
    }
    
    if (message.includes('thank')) {
      return 'You\'re welcome! Is there anything else you\'d like to know about this portfolio?';
    }
    
    // Fallback response
    return 'I\'m not sure about that specific question, but I can help you with information about skills, projects, experience, or contact details. What would you like to know?';
  }, [data, knowledgeBase]);

  const handleSendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const aiResponse: Message = {
      id: `ai-${Date.now()}`,
      text: generateResponse(text),
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
    
    // Update suggestions based on context
    updateSuggestions(text);
    

  }, [inputValue, generateResponse, updateSuggestions]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="ai-assistant-toggle"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          backgroundColor: isOpen ? '#ef4444' : '#4f46e5',
          rotate: isOpen ? 180 : 0
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`ai-assistant-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="ai-assistant-header">
              <div className="header-info">
                <MessageCircle size={20} />
                <div>
                  <h4>AI Assistant</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="header-controls">
                <button onClick={toggleMinimize} className="control-btn">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={toggleChat} className="control-btn close-btn">
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="ai-assistant-messages">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.sender}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-avatar">
                        {message.sender === 'ai' ? <MessageCircle size={16} /> : <User size={16} />}
                      </div>
                      <div className="message-content">
                        <p>{message.text}</p>
                        <span className="message-time">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      className="message ai typing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="message-avatar">
                        <MessageCircle size={16} />
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="ai-assistant-suggestions">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        className="suggestion-btn"
                        onClick={() => handleSendMessage(suggestion)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="ai-assistant-input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about this portfolio..."
                    disabled={isTyping}
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="send-btn"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;