import { useState } from 'react';
import s from './addArticleForm.module.css';

function AddArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    tags: [],
  });

  const [textAreaHeight, setTextAreaHeight] = useState('50');

  function handleFormSubmit(event) {
    event.preventDefault();

    console.log(formData);
    alert(JSON.stringify(formData));
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
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log('event', event);
    console.log('event.target.name', event.target.name);
    console.log('event.target.value', event.target.value);
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
        <label htmlFor="newArticle-imgLink">Ссылка на изображение</label>
        <input
          id="newArticle-imgLink"
          type="text"
          value={formData.image}
          onChange={handleInputChange}
          name="image"
          placeholder="https://www.picture.jpg/"
        />
        <label htmlFor="newArticle-tags">Тег статьи</label>
        <select
          id="newArticle-tags"
          // value={[]}
          // multiple={true}
          onChange={handleSelectChange}
          name="tags"
        >
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
