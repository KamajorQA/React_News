import UserInfo from '../UserInfo/UserInfo';
import s from './requester.module.css';

function Requester({ href }) {
  return (
    <div className={s.requester}>
      <div className={s.search}>
        <span>search</span> + <span>authentication</span>
      </div>

      <UserInfo />
    </div>
  );
}

export default Requester;
