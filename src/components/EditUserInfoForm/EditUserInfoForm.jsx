import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { changeUserAvatar } from '../../utilities/api';
import { Loader } from '../Loader/Loader';
import { Main } from '../Main/Main';
import { Popup } from '../Popup/Popup';
import s from './editUserInfoForm.module.css';

function EditUserInfoForm({ popupActive, setPopupActive }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [tipActive, setTipActive] = useState(false);
  const [userAuthData, setUserAuthData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [newUserAvatar, setNewUserAvatar] = useState({ avatar: '' });

  function handleAvatarInputChange(event) {
    setNewUserAvatar({ avatar: event.target.value });
  }

  async function handleAvatarFormSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
    // alert('form called');
    setIsLoading(true);
    await changeUserAvatar(
      newUserAvatar,
      setUserInfo,
      setErrorMsg,
      setIsLoading
    );
    setNewUserAvatar({ avatar: '' });
  }

  // useEffect(() => setPopupActive(true), []);

  const navigate = useNavigate();

  // async function handleFormSubmit(event) {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   await authorizeUser(loginData, setUserAuthData, setErrorMsg, setIsLoading);
  //   setLoginData({ email: '', password: '' });
  // }

  function handleInputChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }
  function handleInputFocus(e) {
    setTipActive(true);
  }

  function handleInputBlur(e) {
    setTipActive(false);
  }

  useEffect(() => {
    if (userAuthData) {
      // setIsAuthenticated(true);
      setPopupActive(true);
    }
  }, [userAuthData]);

  if (userAuthData) {
    localStorage.setItem('userToken', userAuthData.token);
    setTimeout(() => navigate('/'), 3000);
    return (
      <article className={s.container}>
        <p className={s.success}>Вы успешно авторизовались!</p>
      </article>
    );
  }

  if (errorMsg) {
    setPopupActive(true);
    setTimeout(() => {
      setErrorMsg(null);
      setPopupActive(false);
    }, 5000);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <article className={s.container}>
        <section className={s.controls}>
          <Link className={s.backwardsLink} to="/">
            <FontAwesomeIcon icon={faAnglesLeft} />
            <span>на главную</span>
          </Link>
        </section>

        <section className={s.presentUserInfo}>
          <h1 className={s.title}>Пользователь</h1>
          <img
            src={userInfo?.avatar}
            alt="present user avatar"
            className={s.presentUserAvatar}
          ></img>
          <div>
            <p>{userInfo?.email}</p>
          </div>
        </section>

        <section className={s.editUserSection}>
          <div className={`${s.wrapper} ${s.divider}`}>
            <h2 className={`${s.title} ${s.subtitle}`}>Новый аватар</h2>

            <form onSubmit={handleAvatarFormSubmit} className={s.form}>
              {!!newUserAvatar.avatar && (
                <img
                  src={newUserAvatar.avatar}
                  alt="new user avatar"
                  className={s.newUserAvatar}
                ></img>
              )}
              <label htmlFor="newAvatarLink">
                Ссылка на новое изображение пользователя:
              </label>
              <input
                id="newAvatarLink"
                type="url"
                value={newUserAvatar.avatar}
                onChange={handleAvatarInputChange}
                name="image"
                placeholder={userInfo?.avatar}
                required
              />
              <button type="submit">Изменить аватар</button>
            </form>
          </div>
          <div className={s.wrapper}>
            <h1 className={`${s.title} ${s.subtitle}`}>Вход в систему</h1>

            <form onSubmit={console.log('oh')} className={s.form}>
              <label htmlFor="register-email">E-mail: *</label>
              <input
                id="register-email"
                type="email"
                value={loginData.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="email"
                placeholder="Введите логин"
                required
              />
              {tipActive && (
                <p className={s.tip}>
                  Вашим логином является e-mail, указанный при регистрации
                </p>
              )}

              <label htmlFor="register-password">Пароль: *</label>
              <input
                id="register-password"
                type="password"
                value={loginData.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Введите пароль"
                required
              />
              <button type="submit">Войти</button>
            </form>
          </div>
        </section>
      </article>

      {errorMsg && (
        <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
          <article className={s.container}>
            <p className={s.error}>{errorMsg}</p>
          </article>
        </Popup>
      )}
    </Main>
  );
}

export { EditUserInfoForm };
