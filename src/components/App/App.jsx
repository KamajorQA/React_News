import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Logo from '../Logo/Logo.jsx';
import Requester from '../Requester/Requester.jsx';
import s from './app.module.css';
import { NotFound404 } from '../NotFound404/NotFound404.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className={s.layout}>
        <Header>
          <Logo />
          <div style={{ justifySelf: 'center', textTransform: 'uppercase' }}>
            Navpanel
          </div>
          <Requester />
        </Header>

        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <InfoPanel />
                  <ArticleList />
                </>
              }
            />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
