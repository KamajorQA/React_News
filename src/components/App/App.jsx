import s from './app.module.css';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel';
import Main from '../Main/Main';

function App() {
  return (
    <div className={s.layout}>
      <header className={s.header}>
        <span>logo</span>{' '}
        <nav>
          <span>navigation</span>
        </nav>{' '}
        <span>authentication</span>
      </header>

      <Main>
        <InfoPanel />
        <ArticleList />
      </Main>

      <footer className={s.footer}>footer container</footer>
    </div>
  );
}

export default App;
