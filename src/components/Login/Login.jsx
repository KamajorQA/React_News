import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../AnimatedBackground/AnimatedBackground';
import { Main } from '../Main/Main';
import { Popup } from '../Popup/Popup';
// import { authorization } from '../../utilities/api';
import s from './login.module.css';

function Login({ popupActive, setPopupActive }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [tipActive, setTipActive] = useState(false);

  useEffect(() => setPopupActive(true), []);

  const [editedArticle, setEditedArticle] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();

    console.log(loginData);
    alert(JSON.stringify(loginData));
    // await updateArticle(newsID, formData, setEditedArticle, setErrorMsg);
    // setLoginData({     username: '',    password: '', });
    // setTimeout(() => setPopupActive(false), 3000);
  }

  function handleInputChange(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  }
  function handleInputFocus(e) {
    setTipActive(true);
  }

  function handleInputBlur(e) {
    setTipActive(false);
  }

  // if (editedArticle) {
  //   setTimeout(() => navigate('/'), 3000);
  //   return (
  //     <article className={s.container}>
  //       <p className={s.success}>Статья успешно изменена!</p>
  //     </article>
  //   );
  // }

  // if (errorMsg) {
  //   setTimeout(() => navigate('/'), 5000);
  //   return (
  //     <article className={s.container}>
  //       <p className={s.error}>{errorMsg}</p>
  //     </article>
  //   );
  // }

  return (
    <Main>
      <AnimatedBackground>
        <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
          <article className={s.container}>
            <h1 className={s.title}>Войти в систему</h1>

            <form onSubmit={handleFormSubmit} className={s.form}>
              <label htmlFor="register-username">E-mail: *</label>
              <input
                id="register-username"
                type="email"
                value={loginData.username}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="username"
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
            <div className={s.divider}>или</div>
            <Link className={s.registerLink} to="/register">
              Зарегистрироваться
              <FontAwesomeIcon icon={faAnglesRight} />
            </Link>
          </article>
        </Popup>
      </AnimatedBackground>
    </Main>
  );
}

export { Login };
