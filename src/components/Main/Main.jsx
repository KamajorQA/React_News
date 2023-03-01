import s from './main.module.css';

function Main({ children }) {
  return <main className={s.container}>{children}</main>;
}

export { Main };
