import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import s from './userInfo.module.css';

function UserInfo() {
  const { userInfo, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);

  function handleExitButton() {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  }
  return (
    !!userInfo && (
      <div className={s.userInfo}>
        <img
          src={userInfo?.avatar}
          alt="User Avatar"
          className={s.userAvatar}
        ></img>
        <div>
          <p>{userInfo?.name}</p>
          {/* <p>{userInfo.email}</p> */}
        </div>
        {isAuthenticated && (
          <p className={s.exitButton} onClick={handleExitButton}>
            Выйти
          </p>
        )}
        <div className={s.dropdownContent}>
          <a href="#">Ссылка 1</a>
          <a href="#">Ссылка 2</a>
          <a href="#">Ссылка 3</a>
        </div>
      </div>
    )
  );
}

export { UserInfo };
