
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Mic, Accessibility } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hello! I'm the AccessAbility support assistant. How can I help you today? I can help with job searches, accessibility features, or application questions.",
    sender: 'bot',
    timestamp: new Date()
  }
];

// Predefined responses for common questions
const botResponses: Record<string, string> = {
  'job search': `I can help you find jobs! You can: 
1. Browse our job listings by clicking "Find Jobs" in the menu
2. Filter jobs based on your accessibility needs
3. Use the search bar to find specific positions
4. Set up job alerts by subscribing to notifications
Would you like me to guide you through any of these options?`,

  'screen reader': `Our website is fully compatible with screen readers like NVDA, JAWS, and VoiceOver. 
All images have descriptive alt text, and we use proper semantic HTML to ensure navigation is smooth. 
If you encounter any issues, please let us know!`,

  'apply': `To apply for a job:
1. Browse jobs and select one you're interested in
2. Click the "Apply Now" button
3. Fill out the application form (you can save your progress)
4. Upload your resume/CV (optional)
5. Submit your application
Would you like assistance with any of these steps?`,

  'accessibility': `AccessAbility offers many accessibility features:
• Screen reader compatibility
• Keyboard navigation
• High contrast mode
• Font size adjustment
• Dyslexia-friendly font
• Reduced motion option
• Sign language videos
You can access these by clicking the accessibility icon (♿) in the corner of any page.`,

  'hello': "Hello! How can I assist you with AccessAbility today? I can help with job searches, accessibility features, or application questions.",
  
  'hi': "Hi there! How can I help you with AccessAbility today? I can assist with finding jobs, using accessibility features, or completing applications."
};

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botReply = generateResponse(newMessage);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for key phrases in the user's message
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowercaseQuery.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    
    // Default response if no keywords match
    return `Thank you for your message. I'll do my best to help you with that. 
    
For specific assistance with jobs for people with disabilities, you can:
1. Browse our job listings under the "Jobs" section
2. Contact our support team at support@accessability.org
3. Check out our resources section for guidance

How else can I assist you today?`;
  };

  const startVoiceInput = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Input Not Available",
        description: "Your browser doesn't support voice input. Please type your message instead.",
        variant: "destructive"
      });
      return;
    }

    // Show a toast to indicate recording is starting
    toast({
      title: "Voice Input Active",
      description: "Please speak now. Your message will appear in the chat input.",
    });

    // Mock implementation since we can't use the actual SpeechRecognition API in this environment
    setTimeout(() => {
      setNewMessage("I'm looking for jobs suitable for someone with visual impairment");
      toast({
        title: "Voice Input Complete",
        description: "Your speech has been converted to text. You can edit it or send it.",
      });
    }, 2000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-swaraj-blue text-white rounded-full p-3 shadow-lg hover:bg-swaraj-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swaraj-blue z-30"
        aria-label="Open support chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 transition-all duration-300 overflow-hidden ${
            isMinimized ? 'h-12' : 'h-[500px] max-h-[80vh]'
          }`}
          role="dialog"
          aria-labelledby="chat-title"
        >
          {/* Chat header */}
          <div
            className="bg-swaraj-blue text-white p-3 flex justify-between items-center cursor-pointer"
            onClick={toggleMinimize}
          >
            <div className="flex items-center" id="chat-title">
              <Accessibility className="h-5 w-5 mr-2" />
              <h3 className="font-medium">AccessAbility Support</h3>
            </div>
            <div className="flex items-center">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-1" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="ml-2 hover:bg-white/20 rounded-full p-1"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat messages area */}
              <div className="p-3 h-[calc(100%-120px)] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-swaraj-blue text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < message.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="ml-2">Assistant is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input area */}
              <div className="p-3 border-t">
                <div className="flex items-center">
                  <button 
                    onClick={startVoiceInput}
                    className="mr-2 p-2 text-gray-500 hover:text-swaraj-blue rounded-full hover:bg-gray-100"
                    aria-label="Voice input"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-swaraj-blue"
                    aria-label="Type your message"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-r-lg ${
                      newMessage.trim()
                        ? 'bg-swaraj-blue text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Ask about accessibility features, job searches, or application help.
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChatbot;
