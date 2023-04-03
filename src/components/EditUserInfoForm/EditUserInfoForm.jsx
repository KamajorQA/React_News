import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { changeUserAvatar, changeUserInfo } from '../../utilities/api';
import { Loader } from '../Loader/Loader';
import { Main } from '../Main/Main';
import { Popup } from '../Popup/Popup';
import s from './editUserInfoForm.module.css';

function EditUserInfoForm({ popupActive, setPopupActive }) {
  const [newUserAvatar, setNewUserAvatar] = useState({ avatar: '' });
  const [newUserInfo, setNewUserInfo] = useState({
    name: '',
    about: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);

  function handleAvatarInputChange(event) {
    setNewUserAvatar({ avatar: event.target.value });
  }

  async function handleAvatarFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await changeUserAvatar(
      newUserAvatar,
      setUserInfo,
      setErrorMsg,
      setIsLoading
    );
    setNewUserAvatar({ avatar: '' });
  }

  function handleBioInputChange(event) {
    setNewUserInfo({
      ...newUserInfo,
      [event.target.name]: event.target.value,
    });
  }

  async function handleBioFormSubmit(event) {
    event.preventDefault();
    let newUserData = newUserInfo;
    if (newUserInfo.name.length <= 0) {
      newUserData.name = userInfo.name;
    }
    if (newUserInfo.about.length <= 0) {
      newUserData.about = userInfo.about;
    }
    setIsLoading(true);
    await changeUserInfo(newUserData, setUserInfo, setErrorMsg, setIsLoading);
    setNewUserInfo({ name: '', about: '' });
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
          <p>{userInfo?.name}</p>
          <img
            src={userInfo?.avatar}
            alt="present user avatar"
            className={s.presentUserAvatar}
          ></img>
          <p>{userInfo?.email}</p>
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
            <h1 className={`${s.title} ${s.subtitle}`}>Новое описание</h1>
            <form onSubmit={handleBioFormSubmit} className={s.form}>
              <label htmlFor="newName">Имя:</label>
              <input
                id="newName"
                type="text"
                value={newUserInfo.name}
                onChange={handleBioInputChange}
                name="name"
                placeholder={userInfo?.name}
              />

              <label htmlFor="newBio">О себе:</label>
              <input
                id="newBio"
                type="text"
                value={newUserInfo.about}
                onChange={handleBioInputChange}
                name="about"
                placeholder={userInfo?.about}
              />
              <button type="submit">Изменить данные</button>
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
