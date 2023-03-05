import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../AnimatedBackground/AnimatedBackground';
import { Main } from '../Main/Main';
import { Popup } from '../Popup/Popup';
// import { authorization } from '../../utilities/api';
import s from './register.module.css';

function Register({ popupActive, setPopupActive }) {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });
  const [tipActive, setTipActive] = useState({
    username: false,
    password: false,
  });
  const [passwordViolate, setPasswordViolate] = useState(false);
  const passValidClass = passwordViolate ? 'invalid' : '';

  useEffect(() => setPopupActive(true), []);

  const [editedArticle, setEditedArticle] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    passwordViolate
      ? alert('Пароль слишком короткий')
      : (() => {
          console.log(registrationData);
          alert(JSON.stringify(registrationData));
          // await updateArticle(newsID, formData, setEditedArticle, setErrorMsg);
          // setRegistrationData({     username: '',    password: '', });
          // setTimeout(() => setPopupActive(false), 3000);
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
  }

  function handleInputFocus(e) {
    setTipActive({ ...tipActive, [e.target.name]: true });
  }

  function handleInputBlur(e) {
    setTipActive({ ...tipActive, [e.target.name]: false });
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
  //   setTimeout(() => navigate('/register'), 5000);
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
            <h1 className={s.title}>Регистрация в системе</h1>

            <form onSubmit={handleFormSubmit} className={s.form}>
              <label htmlFor="register-username">E-mail: *</label>
              <input
                id="register-username"
                type="email"
                value={registrationData.username}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                name="username"
                placeholder="Введите логин"
                required
              />
              {tipActive?.username && (
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
              <button type="submit">Зарегистрироваться</button>
            </form>
            <div className={s.divider}>или</div>
            <Link className={s.registerLink} to="/login">
              Войти
              <FontAwesomeIcon icon={faAnglesRight} />
            </Link>
          </article>
        </Popup>
      </AnimatedBackground>
    </Main>
  );
}

export { Register };
