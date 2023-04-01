import { useTheme } from '../../hooks/useTheme';
import s from './switcher.module.css';

function Switcher() {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  return (
    <>
      <label className={s.switch}>
        <input
          type="checkbox"
          defaultChecked={theme === 'light'}
          onChange={handleChangeTheme}
        />
        <span className={s.slider}></span>
      </label>
    </>
  );
}

export { Switcher };
