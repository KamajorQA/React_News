import { useEffect, useState } from 'react';
import { addNewComment, getCommentsByPost } from '../../utilities/api';

import s from './commentForm.module.css';
import { Loader } from '../Loader/Loader';

function CommentForm({ postID, setArticle }) {
  const [formComment, setFormComment] = useState({
    text: '',
  });
  const [currentComments, setCurrentComments] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await addNewComment(
      postID,
      formComment,
      setArticle,
      setErrorMsg,
      setIsLoading
    );
    setFormComment({ text: '' });
  }

  async function handleShowComments() {
    setIsLoading(true);
    await getCommentsByPost(
      postID,
      setCurrentComments,
      setErrorMsg,
      setIsLoading
    );
  }

  useEffect(() => {
    if (!!currentComments) {
      console.log(currentComments);
    }
  }, [currentComments]);

  function handleTextareaChange(event) {
    setFormComment({ [event.target.name]: event.target.value });
  }

  if (errorMsg) {
    setTimeout(() => setErrorMsg(null), 5000);
    return (
      <div className={s.dropUpContent}>
        <p className={s.error}>{errorMsg}</p>
      </div>
    );
  }

  return isLoading ? (
    <div className={s.dropUpContent}>
      <Loader />
    </div>
  ) : (
    <form
      onSubmit={handleFormSubmit}
      className={`${s.form} ${s.dropUpContent}`}
    >
      <div className={s.hintbox}>
        <p>
          <em>Hint:</em> это служебная форма для ввода технических комментариев
        </p>
        <p>
          <em>Hint:</em> первые два комментария зарезервированы
        </p>
        <p>
          <em>Hint:</em> комментарий <strong>#3</strong> служит для указания
          источника новости
        </p>
        <p>
          <em>Hint:</em> комментарий <strong>#4</strong> служит для указания
          подзаголовка
        </p>
      </div>
      <label htmlFor="newComment">Введите комментарий</label>
      <textarea
        id="newComment"
        value={formComment.text}
        onChange={handleTextareaChange}
        name="text"
        placeholder="Введите текст статьи"
        required
      />

      <button type="submit">Внести новое поле в комментарии</button>
      <button type="button" onClick={handleShowComments}>
        Вывести комментарии в консоль
      </button>
    </form>
  );
}

export { CommentForm };
