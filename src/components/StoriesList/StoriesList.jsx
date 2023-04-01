import { useEffect, useState } from 'react';
import { getArticleList } from '../../utilities/api';
import { Article } from '../Article/Article';
import { Loader } from '../Loader/Loader';
import s from './storiesList.module.css';

function StoriesList() {
  const [articles, setArticles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');

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
                console.log(elem);
                return (
                  elem.author._id === '63d65ba559b98b038f77ae2e' &&
                  elem.tags.includes('истории')
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

export { StoriesList };
