import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import s from './baseArticleForm.module.css';

function BaseArticleForm({ handleFormSubmit, formData, setFormData }) {
  const [textAreaHeight, setTextAreaHeight] = useState('50');

  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const isAdmin = !!(userInfo._id === '63d65ba559b98b038f77ae2e');
  useEffect(() => {
    !isAdmin && navigate('/');
  }, [isAdmin, navigate]);

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

  return (
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
  );
}

export { BaseArticleForm };
