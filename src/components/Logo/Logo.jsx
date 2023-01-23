import s from './logo.module.css';
import logo from '../../assets/images/logo.png';
import MainLink from '../MainLink/MainLink';

function Logo({ href }) {
  return (
    <MainLink href={href}>
      <div className={s.logoWrap}>
        <img src={logo} alt="News logotype" className={s.logoPic}></img>
      </div>
    </MainLink>
  );
}

export default Logo;
