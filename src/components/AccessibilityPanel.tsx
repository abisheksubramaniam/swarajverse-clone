
import React, { useState, useEffect } from 'react';
import { X, Eye, Ear, Hand, Brain, Speech, Sun, Moon, MousePointer, Keyboard, Mic } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { toast } from "@/components/ui/use-toast";

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useAccessibility();

  const [voiceCommandsActive, setVoiceCommandsActive] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (keyboardMode) {
      // Add enhanced focus outlines and keyboard navigation
      document.body.classList.add('keyboard-focus-visible');
      
      // Add event listener for keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation-active');
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.classList.remove('keyboard-focus-visible');
    }
  }, [keyboardMode]);

  // Implement screen reader support
  useEffect(() => {
    if (screenReader) {
      // Add ARIA attributes and enhance screen reader support
      const enhanceScreenReaderSupport = () => {
        // Ensure all images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
          (img as HTMLImageElement).alt = 'Image';
        });
        
        // Ensure all buttons have accessible names
        document.querySelectorAll('button:not([aria-label]):not(:has(*))').forEach(button => {
          if (!button.textContent?.trim()) {
            button.setAttribute('aria-label', 'Button');
          }
        });
      };
      
      enhanceScreenReaderSupport();
      
      // Announce screen reader mode is active
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = 'Screen reader support enabled';
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [screenReader]);

  // Handle voice commands
  const toggleVoiceCommands = () => {
    if (!voiceCommandsActive) {
      startVoiceRecognition();
    } else {
      stopVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceCommandsActive(true);
      setListening(true);
      
      // Simulate voice recognition (in a real app, we would use the Web Speech API)
      toast({
        title: "Voice Commands Activated",
        description: "Try saying: 'go to jobs', 'increase font size', or 'high contrast'",
        duration: 5000,
      });
      
      // This is a mockup of voice command functionality
      // In a real implementation, we would use the SpeechRecognition API
      setTimeout(() => {
        setListening(false);
      }, 5000);
    } else {
      toast({
        title: "Voice Commands Not Supported",
        description: "Your browser doesn't support voice recognition. Try using Chrome or Edge.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const stopVoiceRecognition = () => {
    setVoiceCommandsActive(false);
    setListening(false);
    
    toast({
      title: "Voice Commands Deactivated",
      duration: 3000,
    });
  };

  if (!isOpen) return null;

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="accessibility-title" className="text-xl font-bold flex items-center">
            <span className="sr-only">Accessibility</span>
            <span aria-hidden="true">♿</span> Accessibility Options
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Close accessibility panel"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Visual Section */}
          <section aria-labelledby="visual-settings">
            <h3 id="visual-settings" className="text-lg font-medium mb-3 flex items-center">
              <Eye className="h-5 w-5 mr-2" /> Visual Settings
            </h3>
            <div className="space-y-4 pl-3">
              {/* Font Size */}
              <div>
                <label htmlFor="font-size" className="block mb-2 text-sm font-medium">
                  Font Size: {fontSize}%
                </label>
                <input
                  id="font-size"
                  type="range"
                  min="80"
                  max="200"
                  step="10"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-full"
                  aria-valuemin={80}
                  aria-valuemax={200}
                  aria-valuenow={fontSize}
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center">
                <input
                  id="high-contrast"
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="high-contrast" className="ml-2 text-sm font-medium">
                  High Contrast Mode
                </label>
              </div>

              {/* Dyslexic Font */}
              <div className="flex items-center">
                <input
                  id="dyslexic-font"
                  type="checkbox"
                  checked={dyslexicFont}
                  onChange={(e) => setDyslexicFont(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="dyslexic-font" className="ml-2 text-sm font-medium">
                  Dyslexia-Friendly Font
                </label>
              </div>
            </div>
          </section>

          {/* Motion Section */}
          <section aria-labelledby="motion-settings">
            <h3 id="motion-settings" className="text-lg font-medium mb-3 flex items-center">
              <Hand className="h-5 w-5 mr-2" /> Motion & Animation
            </h3>
            <div className="space-y-4 pl-3">
              {/* Reduced Motion */}
              <div className="flex items-center">
                <input
                  id="reduced-motion"
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="reduced-motion" className="ml-2 text-sm font-medium">
                  Reduced Motion
                </label>
              </div>
            </div>
          </section>

          {/* Assistive Technology Section */}
          <section aria-labelledby="assistive-tech-settings">
            <h3 id="assistive-tech-settings" className="text-lg font-medium mb-3 flex items-center">
              <Speech className="h-5 w-5 mr-2" /> Assistive Technology
            </h3>
            <div className="space-y-4 pl-3">
              {/* Screen Reader Support */}
              <div className="flex items-center">
                <input
                  id="screen-reader"
                  type="checkbox"
                  checked={screenReader}
                  onChange={(e) => setScreenReader(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="screen-reader" className="ml-2 text-sm font-medium">
                  Enhanced Screen Reader Support
                </label>
              </div>
              
              {/* Voice Commands */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="voice-commands"
                    type="checkbox"
                    checked={voiceCommandsActive}
                    onChange={toggleVoiceCommands}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="voice-commands" className="ml-2 text-sm font-medium">
                    Voice Commands
                  </label>
                </div>
                
                {voiceCommandsActive && (
                  <button 
                    className={`p-2 rounded-full ${listening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}
                    onClick={listening ? stopVoiceRecognition : startVoiceRecognition}
                    aria-label={listening ? "Stop listening" : "Start listening"}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Input Method Section */}
          <section aria-labelledby="input-settings">
            <h3 id="input-settings" className="text-lg font-medium mb-3 flex items-center">
              <Keyboard className="h-5 w-5 mr-2" /> Input Method
            </h3>
            <div className="space-y-4 pl-3">
              {/* Keyboard Navigation */}
              <div className="flex items-center">
                <input
                  id="keyboard-mode"
                  type="checkbox"
                  checked={keyboardMode}
                  onChange={(e) => setKeyboardMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="keyboard-mode" className="ml-2 text-sm font-medium">
                  Enhanced Keyboard Navigation
                </label>
              </div>
            </div>
          </section>

          <div className="border-t pt-4 mt-4">
            <button
              onClick={() => {
                setFontSize(100);
                setHighContrast(false);
                setDyslexicFont(false);
                setReducedMotion(false);
                setScreenReader(false);
                setKeyboardMode(false);
                setVoiceCommandsActive(false);
                setListening(false);
              }}
              className="text-sm text-gray-600 hover:text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            >
              Reset to Default Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
