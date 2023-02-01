import s from './app.module.css';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import Requester from '../Requester/Requester';

function App() {
  return (
    <div className={s.layout}>
      <Header>
        <Logo />
        <div style={{ justifySelf: 'center', textTransform: 'uppercase' }}>
          Navpanel
        </div>
        <Requester />
      </Header>
      <Main>
        <InfoPanel />
        <ArticleList />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
