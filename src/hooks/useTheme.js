import { useState, useEffect } from 'react';

function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem('appTheme') || 'dark'
  );

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export { useTheme };
