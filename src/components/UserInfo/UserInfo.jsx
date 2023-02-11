import s from './userInfo.module.css';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../utilities/api';
import { Loader } from '../Loader/Loader';

function UserInfo({ href }) {
  const [userInfo, setUserInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');

  useEffect(() => {
    getUserInfo(setUserInfo, setErrorMsg, setIsLoading);
  }, []);

  // console.log('UserInfo', userInfo);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.userInfo}>
          <img
            src={userInfo.avatar}
            alt="User Avatar"
            className={s.userAvatar}
          ></img>
          <div>
            <p>{userInfo.name}</p>
            {/* <p>{userInfo.email}</p> */}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;
