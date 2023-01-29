import s from './app.module.css';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';

function App() {
  return (
    <div className={s.layout}>
      <Header>
        <div style={{ justifySelf: 'center' }}>Navpanel</div>
      </Header>
      <Main>
        <InfoPanel />
        <ArticleList />
      </Main>

      <footer className={s.footer}>footer container</footer>
    </div>
  );
}

export default App;
