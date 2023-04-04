import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authorizeUser } from '../../utilities/apiAuthUser';
import { AnimatedBackground } from '../AnimatedBackground/AnimatedBackground';
import { Loader } from '../Loader/Loader';
import { Main } from '../Main/Main';
import { Popup } from '../Popup/Popup';
import s from './login.module.css';

function Login({ popupActive, setPopupActive }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [tipActive, setTipActive] = useState(false);
  const [userAuthData, setUserAuthData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsAuthenticated } = useContext(UserContext);

  useEffect(() => setPopupActive(true), []);

  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await authorizeUser(loginData, setUserAuthData, setErrorMsg, setIsLoading);
    setLoginData({ email: '', password: '' });
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

  useEffect(() => {
    if (userAuthData) {
      setIsAuthenticated(true);
      setPopupActive(false);
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
    setTimeout(() => setErrorMsg(null), 5000);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <AnimatedBackground>
        <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
          <article className={s.container}>
            <h1 className={s.title}>Вход в систему</h1>

            <form onSubmit={handleFormSubmit} className={s.form}>
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
            <div className={s.divider}>или</div>
            <Link className={s.registerLink} to="/register">
              Зарегистрироваться
              <FontAwesomeIcon icon={faAnglesRight} />
            </Link>
          </article>
        </Popup>

        {errorMsg && (
          <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
            <article className={s.container}>
              <p className={s.error}>{errorMsg}</p>
            </article>
          </Popup>
        )}
      </AnimatedBackground>
    </Main>
  );
}

export { Login };
