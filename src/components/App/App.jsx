import s from './app.module.css';

function App() {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <span>logo</span> <span>navigation</span> <span>authentication</span>
      </header>
      <main className={s.cardList}>card list</main>
      <footer className={s.footer}>footer container</footer>
    </div>
  );
}

export default App;
