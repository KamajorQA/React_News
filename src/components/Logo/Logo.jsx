import { MainLink } from '../MainLink/MainLink';
import logo from '../../assets/images/logo.png';
import s from './logo.module.css';

function Logo({ href }) {
  return (
    <MainLink href={href}>
      <div className={s.logoWrap}>
        <img src={logo} alt="News logotype" className={s.logoPic}></img>
      </div>
    </MainLink>
  );
}

export { Logo };
