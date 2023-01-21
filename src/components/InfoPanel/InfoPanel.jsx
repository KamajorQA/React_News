import s from './infoPanel.module.css';

function InfoPanel() {
  return (
    <section className={s['info-panel']}>
      <div>currency info</div>
      <div>Добавить новость</div>
      <div>mode switch</div>
    </section>
  );
}

export default InfoPanel;
