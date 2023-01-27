import s from './infoPanel.module.css';
import { ExchangeRates } from '../ExchangeRates/ExchangeRates.jsx';

function InfoPanel() {
  return (
    <section className={s['info-panel']}>
      <ExchangeRates />
      <div>Добавить новость</div>
      <div style={{ minWidth: '25%' }}>mode switch</div>
    </section>
  );
}

export default InfoPanel;
