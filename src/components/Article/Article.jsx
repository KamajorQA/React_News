import { Link } from 'react-router-dom';
import s from './article.module.css';

function Article({ image, tags, title, author, created_at, comments, _id }) {
  let adminComments = comments?.filter(
    (elem) => elem.author.email === 'KamajorQA@gmail.com'
  );
  let subtitle = adminComments?.[1]?.text;
  let publicationDate = new Date(created_at);
  publicationDate = `${publicationDate.getHours()}:${publicationDate.getMinutes()}, ${publicationDate.toLocaleDateString()}`;

  return (
    <article className={s.card}>
      <Link to={`/news/${_id}`}>
        <div className={s.cardTop}>
          <img src={image} alt={'News img'} />
        </div>
        <div className={s.cardBottom}>
          <p className={s.tags}>
            {tags.map((tagelem, index) => (
              <span key={index}>{tagelem}</span>
            ))}
          </p>
          <div className={s.titleBox}>
            <p className={s.title}>{title}</p>
            <p className={s.subtitle}>
              <em>{subtitle}</em>
            </p>
          </div>
          <div className={s.publishInfo}>
            <p>{author.name}</p>
            <p>{publicationDate}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export { Article };
