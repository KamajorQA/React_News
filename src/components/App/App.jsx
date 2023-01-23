import s from './app.module.css';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Logo from '../Logo/Logo.jsx';

function App() {
  return (
    <div className={s.layout}>
      <Header>
        <Logo />
        <div style={{ justifySelf: 'center' }}>Navpanel</div>
        <div style={{ justifySelf: 'end' }}>
          {' '}
          <span>search</span> + <span>authentication</span>
        </div>
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
