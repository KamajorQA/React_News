import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { getArticleList } from '../../utilities/api';
import { Article } from '../Article/Article';
import { Loader } from '../Loader/Loader';
import s from './bookmarks.module.css';

function Bookmarks() {
  const [articles, setArticles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    getArticleList(setArticles, setErrorMsg, setIsLoading);
  }, []);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={s.growWrap}>
          <div className={s.gridWrapper}>
            {articles
              .filter((elem) => {
                return (
                  elem.author._id === '63d65ba559b98b038f77ae2e' &&
                  elem.likes.includes(userInfo._id)
                );
              })
              .map((elem) => (
                <Article key={elem._id} {...elem} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}

export { Bookmarks };
