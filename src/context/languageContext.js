import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/configuration/languages',
                    {
                        params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
                    }
                );
                setLanguages(response.data);
            } catch (error) {
                console.error('Failed to fetch languages:', error);
            }
        };
        fetchLanguages();
    }, []);

    const changeLanguage = (langCode) => {
        setSelectedLanguage(langCode);
    };

    return (
        <LanguageContext.Provider value={{ languages, selectedLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
