import github from '../../assets/images/socials/github.svg';
import stepik from '../../assets/images/socials/stepik.svg';
import telegram from '../../assets/images/socials/telegram.svg';
import s from './footer.module.css';

function Footer({ children }) {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <span className={s.copyright}>Made by Kamajor © 2023</span>
        <ul className={s.socials}>
          <li>
            <a
              className={s.socials__link}
              href="https://github.com/KamajorQA"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} alt="github" className={s.socials__icon} />
            </a>
          </li>
          <li>
            <a
              className={s.socials__link}
              href="https://stepik.org/users/453801294"
              target="_blank"
              rel="noreferrer"
            >
              <img src={stepik} alt="stepik" className={s.socials__icon} />
            </a>
          </li>
          <li>
            <a
              className={s.socials__link}
              href="https://t.me/KamajorQA"
              target="_blank"
              rel="noreferrer"
            >
              <img src={telegram} alt="telegram" className={s.socials__icon} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
