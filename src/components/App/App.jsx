import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { getUserInfo } from '../../utilities/api.js';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import { InfoPanel } from '../InfoPanel/InfoPanel.jsx';
import { Main } from '../Main/Main.jsx';
import { NotFound404 } from '../NotFound404/NotFound404.jsx';
import { ArticlePage } from '../ArticlePage/ArticlePage.jsx';
import { MainLayout } from '../../layouts/MainLayout.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { AddArticleForm } from '../AddArticleForm/AddArticleForm.jsx';
import { Popup } from '../Popup/Popup.jsx';
import { Login } from '../Login/Login.jsx';
import s from './app.module.css';

function App() {
  const [userInfo, setUserInfo] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');
  const [popupActive, setPopupActive] = useState(false);

  console.log(popupActive);

  const userContextValue = {
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    getUserInfo(setUserInfo, setErrorMsg, setIsLoading);
  }, []);

  if (errorMsg) {
    return <h1>{errorMsg}</h1>;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <UserContext.Provider value={userContextValue}>
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
                    <ArticlePage
                      popupActive={popupActive}
                      setPopupActive={setPopupActive}
                    />
                  </Main>
                }
              />
              <Route
                path="new-article"
                element={
                  <Main>
                    <AddArticleForm />
                  </Main>
                }
              />
              <Route path="stories" element={<></>} />
              <Route
                path="login"
                element={
                  <Login
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                  />
                }
              />
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
