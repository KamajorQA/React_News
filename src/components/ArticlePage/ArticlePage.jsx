import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleList,
  getArticleById,
  getUserInfo,
  deleteArticle,
  addLike,
  deleteLike,
} from '../../utilities/api';
import Loader from '../Loader/Loader.jsx';
import MainLink from '../MainLink/MainLink.jsx';
import {
  faAnglesLeft,
  faBookmark,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './articlePage.module.css';
import { Link } from 'react-router-dom';

function ArticlePage() {
  const [article, setArticle] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { newsID } = useParams();
  const articleTextHTML = { __html: article.text };

  useEffect(() => {
    getArticleById(newsID, setArticle, setErrorMsg, setIsLoading);
  }, []);

  let publicationDate = new Date(article?.created_at);
  publicationDate = `${publicationDate.getHours()}:${publicationDate.getMinutes()}, ${publicationDate.toLocaleDateString()}`;

  let newsSource = article?.comments?.[1]?.text;
  console.log('массив комментариев на ArticlePage', newsSource);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className={s.container}>
          <section className={s.controls}>
            <Link className={s.backwardsLink} to="/">
              <FontAwesomeIcon icon={faAnglesLeft} />
              <span>на главную</span>
            </Link>
            <div className={s.bookmark}>
              <MainLink href={'#'}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  title="Добавить статью в закладки"
                />
              </MainLink>
            </div>
          </section>
          <section className={s.content}>
            <h1 className={s.articleTitle}>{article.title}</h1>
            <div className={s.imageContainer}>
              <p className={s.sourceInfo}>
                <span>{publicationDate}</span>
                {newsSource && <span>Источник: {newsSource}</span>}
              </p>
              <img src={article.image} alt={article.title} />
            </div>
            <div
              className={s.text}
              dangerouslySetInnerHTML={articleTextHTML}
            ></div>
          </section>

          <section className={s.controls}>
            <span className={s.authorName}>Автор: {article.author.name}</span>
            <div className={s.edits}>
              <MainLink href={'#'}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  title="Редактировать статью"
                  className={s.edit}
                />
              </MainLink>
              <MainLink href={'#'}>
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Удалить статью"
                  className={s.trash}
                />
              </MainLink>
            </div>
          </section>
        </article>
      )}
    </>
  );
}

export { ArticlePage };
