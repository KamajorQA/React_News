import s from './article.module.css';

function Article({ imgSrc, alt }) {
  return (
    <article className={s.card}>
      <div className={s.cardTop}>
        <img src={imgSrc} alt={alt} />
      </div>
      <div className={s.cardBottom}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero
          facilis magni saepe minus nemo ullam, laudantium ut nesciunt
          voluptatibus. Quam laborum non voluptate tenetur maxime neque quasi
          magnam aliquam?
        </p>
      </div>
    </article>
  );
}

export default Article;
