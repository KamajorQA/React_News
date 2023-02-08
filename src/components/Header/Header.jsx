import s from './header.module.css';

function Header({ children }) {
  return <header className={s.header}>{children}</header>;
}

export { Header };
