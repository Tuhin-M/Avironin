"use client";

import { createContext, useContext, ReactNode } from 'react';

const ThemeContext = createContext({ theme: 'light' });

export const useAvTheme = () => useContext(ThemeContext);

const AvThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={{ theme: 'light' }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default AvThemeProvider;
