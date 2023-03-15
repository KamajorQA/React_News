import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../utilities/api';
import { AnimatedBackground } from '../AnimatedBackground/AnimatedBackground';
import { Loader } from '../Loader/Loader';
import { Popup } from '../Popup/Popup';
import s from './register.module.css';

function Register({ popupActive, setPopupActive }) {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tipActive, setTipActive] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [passwordViolate, setPasswordViolate] = useState(false);
  const passValidClass = passwordViolate ? 'invalid' : '';
  const [passNoMatch, setPassNoMatch] = useState(false);
  const confirmPassValidClass = passNoMatch ? 'invalid' : '';
  const [newUser, setNewUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setPopupActive(true), []);

  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    passNoMatch
      ? alert('Пароли не совпадают')
      : passwordViolate
      ? alert('Пароль слишком короткий')
      : (async () => {
          setIsLoading(true);
          await registerUser(
            registrationData,
            setNewUser,
            setErrorMsg,
            setIsLoading
          );
          setRegistrationData({ email: '', password: '' });
          setConfirmPassword('');
        })();
  }

  function handleInputChange(event) {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
  }

  function handlePasswordChange(event) {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
    setPasswordViolate(
      event.target.value.length >= 7 || event.target.value.length === 0
        ? false
        : true
    );

    event.target.value.length >= 7 || event.target.value.length === 0
      ? setTipActive({ ...tipActive, password: false })
      : setTipActive({ ...tipActive, password: true });

    if (confirmPassword.length > 0 && event.target.value !== confirmPassword) {
      setPassNoMatch(true);
    } else setPassNoMatch(false);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
    setPassNoMatch(
      event.target.value === registrationData.password ||
        event.target.value.length === 0
        ? false
        : true
    );

    event.target.value === registrationData.password ||
    event.target.value.length === 0
      ? setTipActive({ ...tipActive, confirmPassword: false })
      : setTipActive({ ...tipActive, confirmPassword: true });
  }

  function handleInputFocus(e) {
    setTipActive({ ...tipActive, [e.target.name]: true });
  }

  function handleInputBlur(e) {
    setTipActive({ ...tipActive, [e.target.name]: false });
  }

  useEffect(() => {
    if (newUser) {
      setPopupActive(false);
    }
  }, [newUser]);

  if (newUser) {
    setTimeout(() => navigate('/login'), 5000);
    return (
      <article className={s.container}>
        <p className={s.success}>Вы успешно зарегистировались!</p>
        <p className={s.success}>Войдите со своими данными</p>
      </article>
    );
  }

  if (errorMsg) {
    setTimeout(() => setErrorMsg(null), 5000);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <main className={s.mainWrapper}>
      <AnimatedBackground>
        <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
          <article className={s.container}>
            <h1 className={s.title}>Регистрация в системе</h1>

            <form onSubmit={handleFormSubmit} className={s.form}>
              <label htmlFor="register-email">E-mail: *</label>
              <input
                id="register-email"
                type="email"
                value={registrationData.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="email"
                placeholder="Введите логин"
                required
              />
              {tipActive?.email && (
                <p className={s.tip}>
                  Ваш e-mail будет логином для входа на сайт
                </p>
              )}

              <label htmlFor="register-password">Пароль: *</label>
              <input
                id="register-password"
                className={`${s[passValidClass]}`}
                type="password"
                value={registrationData.password}
                onChange={handlePasswordChange}
                name="password"
                placeholder="Введите пароль"
                required
              />
              {tipActive?.password && (
                <p className={s.tip}>
                  Пароль должен иметь длину не менее 7 символов
                </p>
              )}
              <label htmlFor="confirm-password">Повторите пароль: *</label>
              <input
                id="confirm-password"
                className={`${s[confirmPassValidClass]}`}
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                name="password"
                placeholder="Подтвердите пароль"
                required
              />
              {tipActive?.confirmPassword && (
                <p className={s.tip}>Пароли должны совпадать</p>
              )}
              <button type="submit">Зарегистрироваться</button>
            </form>
            <div className={s.divider}>или</div>
            <Link className={s.registerLink} to="/login">
              Войти
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
    </main>
  );
}

export { Register };
