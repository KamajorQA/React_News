import Logo from '../Logo/Logo';
import Requester from '../Requester/Requester';
import s from './header.module.css';

function Header({ children }) {
  return (
    <header className={s.header}>
      <Logo />
      {children}
      <Requester />
    </header>
  );
}

export default Header;
