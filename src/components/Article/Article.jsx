import s from './article.module.css';

function Article({ image, tags, title, author, created_at, text, _id }) {
  return (
    <article className={s.card}>
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
          <p>{created_at}</p>
        </div>
      </div>
    </article>
  );
}

export default Article;
