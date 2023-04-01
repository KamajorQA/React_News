import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import s from './userInfo.module.css';
import { Link } from 'react-router-dom';

function UserInfo() {
  const { userInfo, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);

  function handleExitButton() {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  }
  return (
    !!isAuthenticated && (
      <div className={s.userInfo}>
        <img
          src={userInfo?.avatar}
          alt="User Avatar"
          className={s.userAvatar}
        ></img>
        <div>
          <p>{userInfo?.name}</p>
        </div>
        <div className={s.dropdownContent}>
          <Link to="/edit-user">Изменить данные</Link>
          <Link to="/bookmarks">Избранное</Link>
          <p className={s.exitButton} onClick={handleExitButton}>
            Выйти
          </p>
        </div>
      </div>
    )
  );
}

export { UserInfo };
