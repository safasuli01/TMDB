import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [direction, setDirection] = useState('ltr');

  useEffect(() => {
    if (lang === 'ar') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
    
    const updateLanguageConfig = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}&language=${lang}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Language config:', data);
      } catch (error) {
        console.error('Error fetching language config:', error);
      }
    };

    updateLanguageConfig();
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, direction, toggleLanguage }}>
      <div style={{ direction }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
