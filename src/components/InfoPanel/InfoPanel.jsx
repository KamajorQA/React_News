import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates.jsx';
import { Switcher } from '../Switcher/Switcher';
import s from './infoPanel.module.css';

function InfoPanel() {
  const { userInfo } = useContext(UserContext);
  const isAdmin = !!(userInfo?._id === '63d65ba559b98b038f77ae2e');
  return (
    <section className={s['info-panel']}>
      <ExchangeRates />
      <article>
        {isAdmin && (
          <Link to="/new-article">
            <span className={s.addArticle}>Добавить новость</span>
          </Link>
        )}
      </article>
      <article>{/* <Switcher /> */}</article>
    </section>
  );
}

export { InfoPanel };
