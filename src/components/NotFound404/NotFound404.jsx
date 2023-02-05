import Vincent from '../../assets/images/misc/Vincent.jpg';
import s from './notFound404.module.css';

function NotFound404() {
  return (
    <article className={s.card}>
      <div className={s.cardTop}>
        <img src={Vincent} alt={'Not Found'} />
      </div>
      <div className={s.cardBottom}>
        <h1>404</h1>
        <h2>Not Found</h2>
      </div>
    </article>
  );
}

export { NotFound404 };
