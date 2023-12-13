import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const themeStorage = window.localStorage.getItem('theme');

    switch (themeStorage) {
      case null:
        window.localStorage.setItem('theme', 'ligth');
        return 'light';

      case 'dark':
        return 'dark';

      case 'light':
        return 'light';

      default:
        window.localStorage.setItem('theme', 'light');
        return 'light';
    }
  });

  useEffect(() => {
    document.body.classList.remove('light');
    document.body.classList.remove('dark');
    document.body.classList.add(theme);
  }, [theme]);

  const switchTheme = (theme: string) => {
    const themeFormat: 'dark' | 'light' =
      theme === 'light' ? 'dark' : 'light';

    window.localStorage.setItem('theme', themeFormat);
    setTheme(themeFormat);
  };

  return {
    theme,
    switchTheme,
  };
};
