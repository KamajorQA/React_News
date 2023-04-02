import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { getUserInfo } from '../../utilities/api.js';
import { ArticleList } from '../ArticleList/ArticleList.jsx';
import { StoriesList } from '../StoriesList/StoriesList.jsx';
import { InfoPanel } from '../InfoPanel/InfoPanel.jsx';
import { Main } from '../Main/Main.jsx';
import { NotFound404 } from '../NotFound404/NotFound404.jsx';
import { ArticlePage } from '../ArticlePage/ArticlePage.jsx';
import { MainLayout } from '../../layouts/MainLayout.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { AddArticleForm } from '../AddArticleForm/AddArticleForm.jsx';
import { Login } from '../Login/Login.jsx';
import { Register } from '../Register/Register.jsx';
import { EditUserInfoForm } from '../EditUserInfoForm/EditUserInfoForm.jsx';
import { Bookmarks } from '../Bookmarks/Bookmarks.jsx';
import s from './app.module.css';

function App() {
  const [userInfo, setUserInfo] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');
  const [popupActive, setPopupActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userContextValue = {
    userInfo,
    setUserInfo,
    isAuthenticated,
    setIsAuthenticated,
  };

  useEffect(() => {
    const haveToken = localStorage.getItem('userToken');
    setIsAuthenticated(!!haveToken);
  }, [popupActive]);

  useEffect(() => {
    isAuthenticated
      ? getUserInfo(setUserInfo, setErrorMsg, setIsLoading)
      : setIsLoading(false);
  }, [isAuthenticated]);

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
              <Route
                path="stories"
                element={
                  <Main>
                    <InfoPanel />
                    <StoriesList />
                  </Main>
                }
              />
              <Route
                path="login"
                element={
                  <Login
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                  />
                }
              />
              <Route
                path="register"
                element={
                  <Register
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                  />
                }
              />
              <Route
                path="edit-user"
                element={
                  <EditUserInfoForm
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                  />
                }
              />
              <Route
                path="bookmarks"
                element={
                  <Main>
                    <InfoPanel />
                    <Bookmarks />
                  </Main>
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
