import { NavLink } from 'react-router-dom';
import s from './navMenu.module.css';

function NavMenu() {
  return (
    <nav className={s.navigation}>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
        to="."
        end
      >
        Новости
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
        to="article"
      >
        Истории
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeLink : s.inactiveLink)}
        to="fun"
      >
        Развлечения
      </NavLink>
    </nav>
  );
}

export { NavMenu };
