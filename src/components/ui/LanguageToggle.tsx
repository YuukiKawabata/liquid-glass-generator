import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Language } from '@/lib/types';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'ja' ? 'en' : 'ja';
    setLanguage(newLanguage);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title={t.language}
      >
        <span className="text-lg">
          {language === 'ja' ? '🇯🇵' : '🇺🇸'}
        </span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {language === 'ja' ? 'JP' : 'EN'}
        </span>
      </button>
    </div>
  );
}; 