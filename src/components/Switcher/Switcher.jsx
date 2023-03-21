import { useTheme } from '../../hooks/useTheme';
import s from './switcher.module.css';

function Switcher() {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <>
      <label class={s.switch}>
        <input type="checkbox" />
        <span class={s.slider}></span>
      </label>
      <button onClick={handleChangeTheme} className={s.switcher}>
        Toggle theme
      </button>
    </>
  );
}

export { Switcher };
