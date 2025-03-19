
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    } catch (error) {
      console.error('Failed to start voice recognition', error);
      setVoiceCommands(false);
      setIsListening(false);
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
    }
    
    // Help command
    else if (command.includes('help') || command.includes('list commands')) {
      announceMessage("Available voice commands: go to home, go to jobs, go to employer, contact us, increase font, decrease font, toggle contrast, toggle dyslexic font, help");
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
