// API для работы с основным сервером

const baseUrl = 'https://api.react-learning.ru/v2/group-9';
function configurateHeaders() {
  return {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  };
}

// получение всех постов группы
const getArticleList = async (setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, configurateHeaders());
    const data = await response.json();
    setState(data);
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// получение конкретной новости по ID
// обязательна передача ID новости
const getArticleById = async (articleID, setState, setError, setLoader) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts/${articleID}`,
      configurateHeaders()
    );
    if (response.ok) {
      const data = await response.json();
      setState(data);
    } else throw new Error(`${response.status} ${response.statusText}`);
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// получение информации об авторизованном (по текущему токену) пользователю
const getUserInfo = async (setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, configurateHeaders());
    const data = await response.json();
    setState(data);
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// изменение информации о текущем пользователе (изменить можно только имя и описание)
// в передаваемом объекте userData допускаются только 2 поля: name и about
// структура успешного ответа сервера совпадает с ответом на запрос данных текущего пользователя
// следовательно можно использовать одно и то же состояние
const changeUserInfo = async (userData, setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      ...configurateHeaders(),
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// изменение аватара текущего пользователя (только аватара)
// в передаваемом объекте допускается только 1 свойство - avatar, значением которого дб ссылка
// структура успешного ответа сервера совпадает с ответом на запрос данных текущего пользователя
// следовательно можно использовать одно и то же состояние
const changeUserAvatar = async (userAvatar, setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/users/me/avatar`, {
      ...configurateHeaders(),
      method: 'PATCH',
      body: JSON.stringify(userAvatar),
    });
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// добавление нового поста
// в объекте, передаваемом в body свойства title и text - обязательны, а image и tags - опциональны
const addNewArticle = async (articleContent, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, {
      ...configurateHeaders(),
      method: 'POST',
      body: JSON.stringify(articleContent),
    });
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// редактирование текущего поста
// обязательна передача id редактируемого поста (строка)
// допустимые свойства updatedArticle: title, text, image и tags - все необязательны
const updateArticle = async (postID, updatedArticle, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${postID}`, {
      ...configurateHeaders(),
      method: 'PATCH',
      body: JSON.stringify(updatedArticle),
    });
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// удаление поста, обязательна передача id (строка), подтверждение через confirm
// из обычного скрипта работает, но в реакт использование 'confirm' выдает ошибку
// Eslint не позволяет использовать confirm - необходимо изменение конфига Eslint
const deleteArticle = async (postID, setState, setError) => {
  try {
    // let confirmation = confirm('Вы действительно хотите удалить этот пост?');
    // if (confirmation) {
    const response = await fetch(`${baseUrl}/posts/${postID}`, {
      ...configurateHeaders(),
      method: 'DELETE',
    });
    const data = await response.json();
    if (setState) {
      setState(data);
    }
    // }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// поиск постов по переданной на сервер query-строке (свойство URL.search) (поиск по полю title)
const findArticles = async (queryString, setState, setError, setLoader) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts/search?query=${queryString}`,
      configurateHeaders()
    );
    const data = await response.json();
    if (setState) {
      setState(data);
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// Комментарии. Используются для подзаголовков/дополнительных текстовых полей.

// Создание нового "комментария"
// обязательна передача id поста, который комментируется. В body должно передаваться свойство text
const addNewComment = async (
  postID,
  commentText,
  setState,
  setError,
  setLoader
) => {
  try {
    const response = await fetch(`${baseUrl}/posts/comments/${postID}`, {
      ...configurateHeaders(),
      method: 'POST',
      body: JSON.stringify(commentText),
    });
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// Получение всех комментариев к конкретному посту
const getCommentsByPost = async (postID, setState, setError, setLoader) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts/comments/${postID}`,
      configurateHeaders()
    );
    if (response.ok) {
      const data = await response.json();
      if (setState) {
        setState(data);
      }
    } else {
      const errorMessage = await response.json();
      throw new Error(
        `${response.status} ${response.statusText} Причина: ${errorMessage?.message}`
      );
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
};

// Удаление "комментария"
// обязательна передача id поста и id конкретного комментария
const deleteComment = async (postID, commentID, setState, setError) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts/comments/${postID}/${commentID}`,
      {
        ...configurateHeaders(),
        method: 'DELETE',
      }
    );
    const data = await response.json();
    if (setState) {
      setState(data);
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// Лайки. Может использоваться для формирования списка к прочтению (подшивки)
// Установление лайка. Обязательна передача id отмечаемого поста.
const addLike = async (postID, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/posts/likes/${postID}`, {
      ...configurateHeaders(),
      method: 'PUT',
    });
    const data = await response.json();
    if (setState) {
      setState(data);
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// Удаление (снятие) лайка. Обязательна передача id поста, с которого снимается лайк.
const deleteLike = async (postID, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/posts/likes/${postID}`, {
      ...configurateHeaders(),
      method: 'DELETE',
    });
    const data = await response.json();
    if (setState) {
      setState(data);
    }
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

export {
  getArticleList,
  getArticleById,
  getUserInfo,
  changeUserInfo,
  changeUserAvatar,
  addNewArticle,
  updateArticle,
  deleteArticle,
  findArticles,
  addNewComment,
  getCommentsByPost,
  deleteComment,
  addLike,
  deleteLike,
};
