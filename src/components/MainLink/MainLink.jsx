import s from './mainLink.module.css';

function MainLink({ href, children }) {
  return (
    <a className={s.mainLink} href={href ? href : '#'}>
      {children}
    </a>
  );
}

export default MainLink;
