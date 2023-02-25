import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { addNewArticle } from '../../utilities/api';
import s from './addArticleForm.module.css';

function AddArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    tags: [],
  });

  const [textAreaHeight, setTextAreaHeight] = useState('50');
  const [createdArticle, setCreatedArticle] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const isAdmin = !!(userInfo._id === '63d65ba559b98b038f77ae2e');
  useEffect(() => {
    !isAdmin && navigate('/');
  }, [isAdmin, navigate]);

  async function handleFormSubmit(event) {
    event.preventDefault();

    await addNewArticle(formData, setCreatedArticle, setErrorMsg);
    setFormData({ title: '', text: '', image: '', tags: [] });
  }

  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleTextareaChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    !!event.target.value
      ? setTextAreaHeight(event.target.scrollHeight)
      : setTextAreaHeight(50);
  }

  function handleSelectChange(event) {
    setFormData({ ...formData, [event.target.name]: [event.target.value] });
  }

  if (createdArticle) {
    setTimeout(() => navigate('/'), 3000);
    return (
      <article className={s.container}>
        <p className={s.success}>Статья успешно добавлена!</p>
      </article>
    );
  }

  if (errorMsg) {
    setTimeout(() => navigate('/'), 5000);
    return (
      <article className={s.container}>
        <p className={s.error}>{errorMsg}</p>
      </article>
    );
  }

  return (
    <article className={s.container}>
      <h1 className={s.title}>Содержание новой статьи</h1>
      <form onSubmit={handleFormSubmit} className={s.form}>
        <label htmlFor="newArticle-title">Заголовок статьи *</label>
        <input
          id="newArticle-title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          name="title"
          placeholder="Введите заголовок"
          required
        />
        <label htmlFor="newArticle-text">Текст статьи *</label>
        <textarea
          id="newArticle-text"
          value={formData.text}
          onChange={handleTextareaChange}
          name="text"
          placeholder="Введите текст статьи"
          required
          style={{ height: `${textAreaHeight}px` }}
        />
        <label htmlFor="newArticle-imgLink">Ссылка на изображение *</label>
        <input
          id="newArticle-imgLink"
          type="url"
          value={formData.image}
          onChange={handleInputChange}
          name="image"
          placeholder="https://www.picture.jpg/"
          required
        />
        <label htmlFor="newArticle-tags">Тег статьи</label>
        <select id="newArticle-tags" onChange={handleSelectChange} name="tags">
          <option value=""></option>
          <option value="новости">Новости</option>
          <option value="истории">Истории</option>
        </select>
        <button type="submit">Опубликовать статью</button>
      </form>
    </article>
  );
}

export { AddArticleForm };
