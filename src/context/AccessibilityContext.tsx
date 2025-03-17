
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
    return saved ? saved === 'true' : false;
  });

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
  }, [screenReader]);

  useEffect(() => {
    localStorage.setItem('a11y-keyboardMode', keyboardMode.toString());
    if (keyboardMode) {
      document.body.classList.add('keyboard-mode');
    } else {
      document.body.classList.remove('keyboard-mode');
    }
  }, [keyboardMode]);

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
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
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
