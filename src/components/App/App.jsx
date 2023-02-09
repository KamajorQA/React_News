import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Main from '../Main/Main.jsx';
import { NotFound404 } from '../NotFound404/NotFound404.jsx';
import { ArticlePage } from '../ArticlePage/ArticlePage.jsx';
import { MainLayout } from '../../layouts/MainLayout.jsx';
import s from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={s.layout}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Main>
                  <InfoPanel />
                  <ArticleList />
                </Main>
              }
            />
            <Route
              path="news/:newsID"
              element={
                <Main>
                  <ArticlePage />
                </Main>
              }
            />
            <Route path="stories" element={<></>} />
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
