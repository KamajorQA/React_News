import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { addNewArticle } from '../../utilities/api';
import { BaseArticleForm } from '../BaseArticleForm/BaseArticleForm';
import s from './addArticleForm.module.css';

function AddArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    tags: [],
  });

  const [createdArticle, setCreatedArticle] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const isAdmin = !!(userInfo?._id === '63d65ba559b98b038f77ae2e');
  useEffect(() => {
    !isAdmin && navigate('/');
  }, [isAdmin, navigate]);

  async function handleFormSubmit(event) {
    event.preventDefault();

    await addNewArticle(formData, setCreatedArticle, setErrorMsg);
    setFormData({ title: '', text: '', image: '', tags: [] });
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
      <BaseArticleForm
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </article>
  );
}

export { AddArticleForm };
