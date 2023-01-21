import s from './main.module.css';
import { ArticleList } from '../ArticleList/ArticleList';
import InfoPanel from '../InfoPanel/InfoPanel';

function Main() {
  return (
    <main className={s.container}>
      <InfoPanel />
      <ArticleList />
    </main>
  );
}

export default Main;
