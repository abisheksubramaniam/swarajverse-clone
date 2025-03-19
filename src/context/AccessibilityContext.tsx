
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface AccessibilityContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  dyslexicFont: boolean;
  setDyslexicFont: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  screenReader: boolean;
  setScreenReader: (enabled: boolean) => void;
  keyboardMode: boolean;
  setKeyboardMode: (enabled: boolean) => void;
  voiceCommands: boolean;
  setVoiceCommands: (enabled: boolean) => void;
  announceMessage: (message: string) => void;
  isListening: boolean;
  startVoiceRecognition: () => void;
  stopVoiceRecognition: () => void;
  colorBlindMode: boolean;
  setColorBlindMode: (enabled: boolean) => void;
  focusMode: boolean;
  setFocusMode: (enabled: boolean) => void;
  textToSpeech: boolean;
  setTextToSpeech: (enabled: boolean) => void;
  speakText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved preferences from localStorage
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('a11y-fontSize');
    return saved ? parseInt(saved, 10) : 100;
  });
  
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-highContrast');
    return saved ? saved === 'true' : false;
  });
  
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-dyslexicFont');
    return saved ? saved === 'true' : false;
  });
  
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-reducedMotion');
    return saved ? saved === 'true' : false;
  });
  
  const [screenReader, setScreenReader] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-screenReader');
    return saved ? saved === 'true' : false;
  });
  
  const [keyboardMode, setKeyboardMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-keyboardMode');
    return saved ? saved === 'true' : true; // Default to true for better accessibility
  });
  
  const [voiceCommands, setVoiceCommands] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-voiceCommands');
    return saved ? saved === 'true' : false;
  });
  
  const [colorBlindMode, setColorBlindMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-colorBlindMode');
    return saved ? saved === 'true' : false;
  });
  
  const [focusMode, setFocusMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-focusMode');
    return saved ? saved === 'true' : false;
  });
  
  const [textToSpeech, setTextToSpeech] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-textToSpeech');
    return saved ? saved === 'true' : false;
  });
  
  const [isListening, setIsListening] = useState<boolean>(false);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('a11y-fontSize', fontSize.toString());
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('a11y-highContrast', highContrast.toString());
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('a11y-dyslexicFont', dyslexicFont.toString());
    if (dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }
  }, [dyslexicFont]);

  useEffect(() => {
    localStorage.setItem('a11y-reducedMotion', reducedMotion.toString());
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('a11y-screenReader', screenReader.toString());
    // Add screen reader announcements logic
    if (screenReader) {
      announceMessage("Screen reader enabled");
    }
  }, [screenReader]);

  useEffect(() => {
    localStorage.setItem('a11y-keyboardMode', keyboardMode.toString());
    if (keyboardMode) {
      document.body.classList.add('keyboard-mode');
      // Trap focus within the page for keyboard navigation
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('keyboard-mode');
      document.removeEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardMode]);
  
  useEffect(() => {
    localStorage.setItem('a11y-voiceCommands', voiceCommands.toString());
    if (voiceCommands && !isListening) {
      startVoiceRecognition();
    } else if (!voiceCommands && isListening) {
      stopVoiceRecognition();
    }
  }, [voiceCommands]);
  
  useEffect(() => {
    localStorage.setItem('a11y-colorBlindMode', colorBlindMode.toString());
    if (colorBlindMode) {
      document.body.classList.add('color-blind-mode');
    } else {
      document.body.classList.remove('color-blind-mode');
    }
  }, [colorBlindMode]);
  
  useEffect(() => {
    localStorage.setItem('a11y-focusMode', focusMode.toString());
    if (focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  }, [focusMode]);
  
  useEffect(() => {
    localStorage.setItem('a11y-textToSpeech', textToSpeech.toString());
  }, [textToSpeech]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    // Skip to main content
    if (e.key === '/' && e.ctrlKey) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Toggle accessibility panel
    if (e.key === 'a' && e.ctrlKey) {
      e.preventDefault();
      const accessibilityButton = document.querySelector('[aria-label="Open accessibility options"]');
      if (accessibilityButton) {
        (accessibilityButton as HTMLElement).click();
      }
    }
    
    // Add visual focus indicator
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  };
  
  // Screen reader announcement
  const announceMessage = (message: string) => {
    if (!screenReader) return;
    
    // Create or get announcement element
    let announcer = document.getElementById('screen-reader-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'screen-reader-announcer';
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    // Announce message
    announcer.textContent = '';
    // Force a DOM reflow to ensure the empty string is set
    void announcer.offsetWidth;
    announcer.textContent = message;
  };
  
  // Text to speech function
  const speakText = (text: string) => {
    if (!textToSpeech) return;
    
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      
      // If voices aren't loaded yet, wait for them
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          voices = window.speechSynthesis.getVoices();
          // Try to find an English voice
          const englishVoice = voices.find(voice => voice.lang.includes('en'));
          if (englishVoice) utterance.voice = englishVoice;
          
          window.speechSynthesis.speak(utterance);
        }, { once: true });
      } else {
        // Try to find an English voice
        const englishVoice = voices.find(voice => voice.lang.includes('en'));
        if (englishVoice) utterance.voice = englishVoice;
        
        window.speechSynthesis.speak(utterance);
      }
    } else {
      console.warn('Speech synthesis not supported in this browser');
      toast({
        title: "Feature not supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };
  
  // Voice recognition functions
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) || isListening) return;
    
    setIsListening(true);
    announceMessage("Voice commands enabled. Listening for commands.");
    
    try {
      // @ts-ignore - WebkitSpeechRecognition is not in the TypeScript types
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const command = event.results[i][0].transcript.trim().toLowerCase();
            processVoiceCommand(command);
          }
        }
      };
      
      recognition.onend = () => {
        if (voiceCommands) {
          // Restart if it ends and voice commands are still enabled
          recognition.start();
        } else {
          setIsListening(false);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          announceMessage("Microphone access was denied. Voice commands disabled.");
          setVoiceCommands(false);
          setIsListening(false);
        }
      };
      
      recognition.start();
      
      // Store in window for easy access
      // @ts-ignore
      window.accessibilityRecognition = recognition;
      
      toast({
        title: "Voice Commands Activated",
        description: "Try saying: 'go to home', 'find jobs', 'increase font size', etc.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Failed to start voice recognition', error);
      setVoiceCommands(false);
      setIsListening(false);
      
      toast({
        title: "Voice Commands Failed",
        description: "Could not activate voice commands. Your browser may not support this feature.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  const stopVoiceRecognition = () => {
    if (!isListening) return;
    
    try {
      // @ts-ignore
      if (window.accessibilityRecognition) {
        // @ts-ignore
        window.accessibilityRecognition.stop();
        // @ts-ignore
        window.accessibilityRecognition = null;
      }
    } catch (error) {
      console.error('Failed to stop voice recognition', error);
    }
    
    setIsListening(false);
    announceMessage("Voice commands disabled");
    
    toast({
      title: "Voice Commands Deactivated",
      duration: 3000,
    });
  };
  
  const processVoiceCommand = (command: string) => {
    announceMessage(`Received command: ${command}`);
    
    // Navigation commands
    if (command.includes('go to home') || command.includes('home page')) {
      window.location.href = '/';
    } else if (command.includes('go to jobs') || command.includes('find jobs')) {
      window.location.href = '/jobs';
    } else if (command.includes('go to employer') || command.includes('employer dashboard')) {
      window.location.href = '/employer';
    } else if (command.includes('contact us') || command.includes('get in touch')) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Accessibility commands
    else if (command.includes('increase font') || command.includes('larger text')) {
      setFontSize(prev => Math.min(prev + 10, 150));
      announceMessage("Font size increased");
    } else if (command.includes('decrease font') || command.includes('smaller text')) {
      setFontSize(prev => Math.max(prev - 10, 80));
      announceMessage("Font size decreased");
    } else if (command.includes('toggle contrast') || command.includes('high contrast')) {
      setHighContrast(prev => !prev);
      announceMessage(highContrast ? "High contrast disabled" : "High contrast enabled");
    } else if (command.includes('toggle dyslexic font') || command.includes('dyslexic font')) {
      setDyslexicFont(prev => !prev);
      announceMessage(dyslexicFont ? "Dyslexic font disabled" : "Dyslexic font enabled");
    } else if (command.includes('toggle color blind') || command.includes('color blind mode')) {
      setColorBlindMode(prev => !prev);
      announceMessage(colorBlindMode ? "Color blind mode disabled" : "Color blind mode enabled");
    } else if (command.includes('toggle focus mode') || command.includes('focus mode')) {
      setFocusMode(prev => !prev);
      announceMessage(focusMode ? "Focus mode disabled" : "Focus mode enabled");
    } else if (command.includes('toggle text to speech') || command.includes('text to speech')) {
      setTextToSpeech(prev => !prev);
      announceMessage(textToSpeech ? "Text to speech disabled" : "Text to speech enabled");
    }
    
    // Login/Signup commands
    else if (command.includes('login') || command.includes('sign in')) {
      const loginButton = document.querySelector('button[aria-label="Log in to your account"]');
      if (loginButton) {
        (loginButton as HTMLElement).click();
      }
    } else if (command.includes('signup') || command.includes('sign up') || command.includes('create account')) {
      const signupButton = document.querySelector('button[aria-label="Create a new account"]');
      if (signupButton) {
        (signupButton as HTMLElement).click();
      }
    }
    
    // Help command
    else if (command.includes('help') || command.includes('list commands')) {
      announceMessage("Available voice commands: go to home, go to jobs, go to employer, contact us, increase font, decrease font, toggle contrast, toggle dyslexic font, login, signup, help");
    }
  };

  const value = {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    dyslexicFont,
    setDyslexicFont,
    reducedMotion,
    setReducedMotion,
    screenReader,
    setScreenReader,
    keyboardMode,
    setKeyboardMode,
    voiceCommands,
    setVoiceCommands,
    announceMessage,
    isListening,
    startVoiceRecognition,
    stopVoiceRecognition,
    colorBlindMode,
    setColorBlindMode,
    focusMode,
    setFocusMode,
    textToSpeech,
    setTextToSpeech,
    speakText,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {screenReader && (
        <div id="screen-reader-announcer" aria-live="assertive" aria-atomic="true" className="sr-only"></div>
      )}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
