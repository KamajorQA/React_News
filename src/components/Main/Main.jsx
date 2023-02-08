import { Outlet } from 'react-router-dom';
import s from './main.module.css';

function Main({ children }) {
  return <main className={s.container}>{children}</main>;
}

export default Main;
