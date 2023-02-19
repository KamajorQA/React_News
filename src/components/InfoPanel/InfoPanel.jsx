import s from './infoPanel.module.css';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates.jsx';
import { Switcher } from '../Switcher/Switcher';

function InfoPanel() {
  return (
    <section className={s['info-panel']}>
      <ExchangeRates />
      <article>Добавить новость</article>
      <article>
        <Switcher />
      </article>
    </section>
  );
}

export { InfoPanel };
