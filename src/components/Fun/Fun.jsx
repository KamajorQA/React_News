import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Main } from '../Main/Main';
import s from './fun.module.css';

function Fun() {
  return (
    <Main>
      <article className={s.container}>
        <section className={s.controls}>
          <Link className={s.backwardsLink} to="/">
            <FontAwesomeIcon icon={faAnglesLeft} />
            <span>на главную</span>
          </Link>
        </section>

        <section className={s.musicContent}>
          <h1 className={s.title}>Музыка</h1>
          <iframe
            title="rusIndie"
            className={s.musicIFrame}
            src="https://music.yandex.ru/iframe/#playlist/KamJQA/1004"
          >
            Слушайте{' '}
            <a href="https://music.yandex.ru/users/KamJQA/playlists/1004">
              Русское Инди
            </a>{' '}
            — <a href="https://music.yandex.ru/users/KamJQA">KamJQA</a> на
            Яндекс Музыке
          </iframe>
          <iframe
            title="rusRock"
            className={s.musicIFrame}
            src="https://music.yandex.ru/iframe/#playlist/KamJQA/1002"
          >
            Слушайте{' '}
            <a href="https://music.yandex.ru/users/KamJQA/playlists/1002">
              Русский рок
            </a>{' '}
            — <a href="https://music.yandex.ru/users/KamJQA">KamJQA</a> на
            Яндекс Музыке
          </iframe>
          <iframe
            title="rusOther"
            className={s.musicIFrame}
            src="https://music.yandex.ru/iframe/#playlist/KamJQA/1008"
          >
            Слушайте{' '}
            <a href="https://music.yandex.ru/users/KamJQA/playlists/1008">
              Другое
            </a>{' '}
            — <a href="https://music.yandex.ru/users/KamJQA">KamJQA</a> на
            Яндекс Музыке
          </iframe>
        </section>
      </article>
    </Main>
  );
}

export { Fun };
