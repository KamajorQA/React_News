import { UserInfo } from '../UserInfo/UserInfo';
import { Switcher } from '../Switcher/Switcher';

import s from './requester.module.css';

function Requester() {
  return (
    <div className={s.requester}>
      <div className={s.search}>
        <Switcher />
        {/* <span>search</span> + <span>authentication</span> */}
      </div>

      <UserInfo />
    </div>
  );
}

export { Requester };
