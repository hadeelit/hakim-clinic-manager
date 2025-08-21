import { useState, useEffect, useCallback } from 'react';
import { i18nManager, LANGUAGES } from '@/i18n';
import type { Language } from '@/types';

interface UseLanguageReturn {
  currentLanguage: string;
  currentLanguageInfo: Language | undefined;
  availableLanguages: Language[];
  isRTL: boolean;
  changeLanguage: (languageCode: string) => void;
  t: (keyPath: string) => string;
}

export const useLanguage = (): UseLanguageReturn => {
  const [currentLanguage, setCurrentLanguage] = useState(i18nManager.getCurrentLanguage());
  const [isRTL, setIsRTL] = useState(i18nManager.isRTL());

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
      setIsRTL(i18nManager.isRTL());
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Change language function
  const changeLanguage = useCallback((languageCode: string) => {
    i18nManager.changeLanguage(languageCode);
  }, []);

  // Translation function
  const t = useCallback((keyPath: string): string => {
    return i18nManager.translate(keyPath);
  }, [currentLanguage]); // Re-create when language changes

  return {
    currentLanguage,
    currentLanguageInfo: i18nManager.getCurrentLanguageInfo(),
    availableLanguages: LANGUAGES,
    isRTL,
    changeLanguage,
    t,
  };
};