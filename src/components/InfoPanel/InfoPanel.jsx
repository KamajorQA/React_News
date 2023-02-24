import s from './infoPanel.module.css';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates.jsx';
import { Switcher } from '../Switcher/Switcher';
import { Link } from 'react-router-dom';

function InfoPanel() {
  return (
    <section className={s['info-panel']}>
      <ExchangeRates />
      <article>
        <Link to="/new-article">
          <span className={s.addArticle}>Добавить новость</span>
        </Link>
      </article>
      <article>
        <Switcher />
      </article>
    </section>
  );
}

export { InfoPanel };
