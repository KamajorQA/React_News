import s from './articleList.module.css';
import Article from '../Article/Article';
import { useEffect, useState } from 'react';
import { getArticleList } from '../../utilities/api';
import Loader from '../Loader/Loader';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');

  useEffect(() => {
    getArticleList(setArticles, setErrorMsg, setIsLoading);
  }, []);

  console.log('ArticleList', articles);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  const tigerImg =
    'https://cdnn21.img.ria.ru/images/07e4/0b/0e/1584613114_0:23:3077:1753_600x0_80_0_0_060ab166170a547f920d3fab3ff92acf.jpg.webp';
  const islandImg =
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const cloudsImg =
    'https://positivnews.ru/wp-content/uploads/2023/01/foto-oblakov.jpg';

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={s.growWrap}>
          <div className={s.gridWrapper}>
            {articles
              .filter((elem) => elem.author._id === '63d65ba559b98b038f77ae2e')
              .map((elem) => (
                <Article key={elem._id} {...elem} />
              ))}

            <Article
              image={tigerImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={islandImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={cloudsImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={tigerImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={islandImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={cloudsImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={tigerImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={islandImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
            <Article
              image={cloudsImg}
              author={{ name: 'mock author' }}
              tags={['mock tag']}
            />
          </div>
        </section>
      )}
    </>
  );
}

export { ArticleList };
