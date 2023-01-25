import s from './articleList.module.css';
import Article from '../Article/Article';

function ArticleList() {
  const tigerImg =
    'https://cdnn21.img.ria.ru/images/07e4/0b/0e/1584613114_0:23:3077:1753_600x0_80_0_0_060ab166170a547f920d3fab3ff92acf.jpg.webp';
  const islandImg =
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const cloudsImg =
    'https://positivnews.ru/wp-content/uploads/2023/01/foto-oblakov.jpg';
  return (
    <section className={s.growWrap}>
      <div className={s.gridWrapper}>
        <Article imgSrc={tigerImg} alt={'Amur tiger'} />
        <Article imgSrc={islandImg} alt={'Island Picture'} />
        <Article imgSrc={cloudsImg} alt={'Marvelous clouds'} />
        <Article imgSrc={tigerImg} alt={'Amur tiger'} />
        <Article imgSrc={islandImg} alt={'Island Picture'} />
        <Article imgSrc={cloudsImg} alt={'Marvelous clouds'} />
        <Article imgSrc={tigerImg} alt={'Amur tiger'} />
        <Article imgSrc={islandImg} alt={'Island Picture'} />
        <Article imgSrc={cloudsImg} alt={'Marvelous clouds'} />
        <Article imgSrc={tigerImg} alt={'Amur tiger'} />
        <Article imgSrc={islandImg} alt={'Island Picture'} />
        <Article imgSrc={cloudsImg} alt={'Marvelous clouds'} />
      </div>
    </section>
  );
}

export { ArticleList };
