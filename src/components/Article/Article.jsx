import { Link } from 'react-router-dom';
import s from './article.module.css';

function Article({ image, tags, title, author, created_at, text, _id }) {
  let publicationDate = new Date(created_at);
  publicationDate = `${publicationDate.getHours()}:${publicationDate.getMinutes()}, ${publicationDate.toLocaleDateString()}`;

  return (
    <article className={s.card}>
      <Link to={`/news/${_id}`}>
        <div className={s.cardTop}>
          <img src={image} alt={'News image'} />
        </div>
        <div className={s.cardBottom}>
          <p className={s.tags}>
            {tags.map((tagelem, index) => (
              <span key={index}>{tagelem}</span>
            ))}
          </p>
          <p className={s.title}>{title}</p>
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
