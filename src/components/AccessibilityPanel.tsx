
import React, { useState } from 'react';
import { X, Eye, Ear, Hand, Brain, Speech, MousePointer, Keyboard, Mic, MonitorCheck, Focus, Volume2, Palette } from 'lucide-react';
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
    voiceCommands,
    setVoiceCommands,
    isListening,
    colorBlindMode,
    setColorBlindMode,
    focusMode,
    setFocusMode,
    textToSpeech,
    setTextToSpeech,
    startVoiceRecognition,
    stopVoiceRecognition,
    speakText
  } = useAccessibility();

  const [testText, setTestText] = useState("This is a sample text to test text-to-speech functionality. Click the 'Speak' button to hear it.");

  if (!isOpen) return null;

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  const handleTextToSpeechTest = () => {
    if (testText) {
      speakText(testText);
    }
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
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="accessibility-title" className="text-xl font-bold flex items-center">
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

              {/* Color Blind Mode */}
              <div className="flex items-center">
                <input
                  id="color-blind-mode"
                  type="checkbox"
                  checked={colorBlindMode}
                  onChange={(e) => setColorBlindMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="color-blind-mode" className="ml-2 text-sm font-medium">
                  Color Blind Friendly Mode
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

          {/* Focus & Attention Section */}
          <section aria-labelledby="focus-settings">
            <h3 id="focus-settings" className="text-lg font-medium mb-3 flex items-center">
              <Focus className="h-5 w-5 mr-2" /> Focus & Attention
            </h3>
            <div className="space-y-4 pl-3">
              {/* Focus Mode */}
              <div className="flex items-center">
                <input
                  id="focus-mode"
                  type="checkbox"
                  checked={focusMode}
                  onChange={(e) => setFocusMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="focus-mode" className="ml-2 text-sm font-medium">
                  Focus Mode (Reduces Distractions)
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
              
              {/* Text to Speech */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="text-to-speech"
                    type="checkbox"
                    checked={textToSpeech}
                    onChange={(e) => setTextToSpeech(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="text-to-speech" className="ml-2 text-sm font-medium">
                    Text-to-Speech
                  </label>
                </div>
                
                {textToSpeech && (
                  <div className="ml-6 space-y-2">
                    <textarea
                      value={testText}
                      onChange={(e) => setTestText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      rows={3}
                      aria-label="Text to speech test area"
                    />
                    <button
                      onClick={handleTextToSpeechTest}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      aria-label="Test text to speech"
                    >
                      <Volume2 className="h-4 w-4 mr-1" /> Speak Text
                    </button>
                  </div>
                )}
              </div>
              
              {/* Voice Commands */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="voice-commands"
                    type="checkbox"
                    checked={voiceCommands}
                    onChange={(e) => setVoiceCommands(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="voice-commands" className="ml-2 text-sm font-medium">
                    Voice Commands
                  </label>
                </div>
                
                {voiceCommands && (
                  <button 
                    className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}
                    onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                    aria-label={isListening ? "Stop listening" : "Start listening"}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {voiceCommands && (
                <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
                  <p className="font-medium">Available Voice Commands:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Navigation: "go to home", "find jobs", "contact us"</li>
                    <li>Font size: "increase font", "decrease font"</li>
                    <li>Contrast: "toggle contrast", "high contrast"</li>
                    <li>More: "help" (for full list of commands)</li>
                  </ul>
                </div>
              )}
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
              
              {keyboardMode && (
                <div className="bg-gray-50 p-3 rounded text-xs space-y-1">
                  <p className="font-medium">Keyboard Shortcuts:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><kbd>Ctrl</kbd> + <kbd>/</kbd>: Skip to main content</li>
                    <li><kbd>Ctrl</kbd> + <kbd>A</kbd>: Open accessibility panel</li>
                    <li><kbd>Tab</kbd>: Navigate through interactive elements</li>
                    <li><kbd>Enter</kbd> / <kbd>Space</kbd>: Activate focused element</li>
                  </ul>
                </div>
              )}
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
                setKeyboardMode(true); // Keep keyboard mode on by default
                setVoiceCommands(false);
                setColorBlindMode(false);
                setFocusMode(false);
                setTextToSpeech(false);
                
                toast({
                  title: "Settings Reset",
                  description: "Accessibility settings have been reset to defaults.",
                });
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
