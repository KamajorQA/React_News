import { useTheme } from '../../hooks/useTheme';
import s from './switcher.module.css';

function Switcher() {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <button onClick={handleChangeTheme} className={s.switcher}>
      Toggle theme
    </button>
  );
}

export { Switcher };
