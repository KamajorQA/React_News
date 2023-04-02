import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {
  getArticleById,
  deleteArticle,
  addLike,
  deleteLike,
} from '../../utilities/api';
import { Loader } from '../Loader/Loader.jsx';
import { MainLink } from '../MainLink/MainLink.jsx';
import {
  faAnglesLeft,
  faBookmark,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './articlePage.module.css';
import { Popup } from '../Popup/Popup';
import { EditArticleForm } from '../EditArticleForm/EditArticleForm';

function ArticlePage({ popupActive, setPopupActive }) {
  const [article, setArticle] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletedArticle, setDeletedArticle] = useState(null);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState(null);

  const { userInfo } = useContext(UserContext);

  const { newsID } = useParams();
  const navigate = useNavigate();
  const articleTextHTML = { __html: article.text };
  const isAdmin = !!(userInfo?._id === '63d65ba559b98b038f77ae2e');

  useEffect(() => {
    getArticleById(newsID, setArticle, setErrorMsg, setIsLoading);
  }, [newsID]);

  useEffect(() => {
    if (errorMsg) {
      navigate('..', { relative: 'route' });
    }
  }, [errorMsg, navigate]);

  let publicationDate = new Date(article?.created_at);
  publicationDate = `${publicationDate.getHours()}:${publicationDate.getMinutes()}, ${publicationDate.toLocaleDateString()}`;

  let newsSource = article?.comments?.[1]?.text;
  // console.log('массив комментариев на ArticlePage', newsSource);

  const isLiked = article?.likes?.includes(userInfo?._id);
  const likeClassName = `pin-${isLiked}`;

  function handleLikeClick(e) {
    e.preventDefault();
    if (isLiked) {
      deleteLike(article._id, setArticle);
    } else {
      addLike(article._id, setArticle);
    }
  }

  function handleEditClick(e) {
    e.preventDefault();
    setPopupActive(true);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    deleteArticle(newsID, setDeletedArticle, setDeleteErrorMsg);
  }

  if (deletedArticle) {
    setTimeout(() => navigate('/'), 3000);
    return (
      <article className={s.container}>
        <p className={s.success}>Статья удалена!</p>
      </article>
    );
  }

  if (deleteErrorMsg) {
    setTimeout(() => navigate('/'), 5000);
    return (
      <article className={s.container}>
        <p className={s.error}>{deleteErrorMsg}</p>
      </article>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
    <article className={s.container}>
      <section className={s.controls}>
        <Link className={s.backwardsLink} to="/">
          <FontAwesomeIcon icon={faAnglesLeft} />
          <span>на главную</span>
        </Link>
        <div className={`${s.bookmark} ${s[likeClassName]}`}>
          <MainLink href={'#'}>
            <FontAwesomeIcon
              icon={faBookmark}
              title="Добавить статью в закладки"
              onClick={handleLikeClick}
            />
          </MainLink>
        </div>
      </section>
      <section className={s.content}>
        <h1 className={s.articleTitle}>{article?.title}</h1>
        <div className={s.imageContainer}>
          <p className={s.sourceInfo}>
            <span>{publicationDate}</span>
            {newsSource && <span>Источник: {newsSource}</span>}
          </p>
          <img src={article?.image} alt={article?.title} />
        </div>
        <div className={s.text} dangerouslySetInnerHTML={articleTextHTML}></div>
      </section>

      <section className={s.controls}>
        <span className={s.authorName}>Автор: {article?.author?.name}</span>
        <div className={s.edits}>
          {isAdmin && (
            <MainLink href={'#'}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                title="Редактировать статью"
                className={s.edit}
                onClick={handleEditClick}
              />
            </MainLink>
          )}
          {isAdmin && (
            <MainLink href={'#'}>
              <FontAwesomeIcon
                icon={faTrash}
                title="Удалить статью"
                className={s.trash}
                onClick={handleDeleteClick}
              />
            </MainLink>
          )}
        </div>
      </section>
      <Popup popupActive={popupActive} setPopupActive={setPopupActive} closable>
        <EditArticleForm setPopupActive={setPopupActive} />
      </Popup>
    </article>
  );
}

export { ArticlePage };
