import { faYinYang } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './loader.module.css';

function Loader() {
  return (
    <article className={s.loader}>
      <div>Loading</div>
      <div className={s.dots}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={s.spinner}>
        <FontAwesomeIcon icon={faYinYang} spin />
      </div>
    </article>
  );
}

export { Loader };
