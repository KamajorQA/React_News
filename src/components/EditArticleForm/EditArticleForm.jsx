import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateArticle } from '../../utilities/api';
import { BaseArticleForm } from '../BaseArticleForm/BaseArticleForm';
import s from './editArticleForm.module.css';

function EditArticleForm({ setPopupActive }) {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    tags: [],
  });

  const [editedArticle, setEditedArticle] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { newsID } = useParams();
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();

    await updateArticle(newsID, formData, setEditedArticle, setErrorMsg);
    setFormData({ title: '', text: '', image: '', tags: [] });
    setTimeout(() => setPopupActive(false), 3000);
  }

  if (editedArticle) {
    setTimeout(() => navigate('/'), 3000);
    return (
      <article className={s.container}>
        <p className={s.success}>Статья успешно изменена!</p>
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
      <h1 className={s.title}>Новое содержание редактируемой статьи</h1>
      <BaseArticleForm
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </article>
  );
}

export { EditArticleForm };
