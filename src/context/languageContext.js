import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [supportedLanguages, setSupportedLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);
        const data = await response.json();
        setSupportedLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const switchLanguage = (lang) => {
    if (supportedLanguages.some((l) => l.iso_639_1 === lang)) {
      setLanguage(lang);
    } else {
      console.error('Language not supported');
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
