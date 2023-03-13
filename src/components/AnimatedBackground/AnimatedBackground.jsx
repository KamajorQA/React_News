import s from './animatedBackground.module.css';

function AnimatedBackground({ children }) {
  return (
    <article className={s.bgFiller}>
      <div className={s.bgAnimation}>{children}</div>
    </article>
  );
}

export { AnimatedBackground };
