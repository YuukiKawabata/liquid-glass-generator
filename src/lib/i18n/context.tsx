'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Messages } from '@/lib/types';
import { messages } from './messages';

interface I18nContextType {
  language: Language;
  locale: Language; // 追加: localeエイリアス
  setLanguage: (language: Language) => void;
  switchToEnglish: () => void; // 追加
  switchToJapanese: () => void; // 追加
  t: Messages;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ja');

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('liquid-glass-language') as Language;
    if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update document lang attribute when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Save language to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('liquid-glass-language', newLanguage);
  };

  // 追加: 英語に切り替える関数
  const switchToEnglish = () => {
    setLanguage('en');
  };

  // 追加: 日本語に切り替える関数
  const switchToJapanese = () => {
    setLanguage('ja');
  };

  const value: I18nContextType = {
    language,
    locale: language, // 追加: localeエイリアス
    setLanguage,
    switchToEnglish, // 追加
    switchToJapanese, // 追加
    t: messages[language],
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}; 