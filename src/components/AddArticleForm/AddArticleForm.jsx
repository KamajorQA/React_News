import { useState } from 'react';

function AddArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
    tags: [],
  });

  function handleFormSubmit(event) {
    event.preventDefault();

    console.log(formData);
    alert(JSON.stringify(formData));
  }

  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSelectChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log('event', event);
    console.log('event.target.name', event.target.name);
    console.log('event.target.value', event.target.value);
  }

  return (
    <>
      <h1>Содержимое новой статьи</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Article title:
          <input
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            name="title"
          />
        </label>
        <label>
          Article content:
          <textarea
            value={formData.text}
            onChange={handleInputChange}
            name="text"
          />
        </label>
        <label>
          Image link:
          <input
            type="text"
            value={formData.image}
            onChange={handleInputChange}
            name="image"
          />
        </label>
        <label>
          Выберите теги заметки:
          <select
            // value={[]}
            multiple={true}
            onChange={handleSelectChange}
            name="tags"
          >
            <option value="новости">Новости</option>
            <option value="истории">Истории</option>
          </select>
        </label>
        <button type="submit">Опубликовать статью</button>
      </form>
    </>
  );
}

export { AddArticleForm };
