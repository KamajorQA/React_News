import s from './infoPanel.module.css';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates.jsx';

function InfoPanel() {
  return (
    <section className={s['info-panel']}>
      <ExchangeRates />
      <article>Добавить новость</article>
      <article style={{ minWidth: '25%' }}>mode switch</article>
    </section>
  );
}

export default InfoPanel;
