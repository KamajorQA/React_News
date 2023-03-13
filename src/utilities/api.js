// fetch-запрос для получения курса валют от ЦБ РФ на текущую дату
// при вызове в нужном компоненте передается функция установки используемого состояния
async function getExchangeRates(setState, setError, setLoader) {
  try {
    const currencyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    const response = await fetch(currencyURL);
    const data = await response.json();
    setState(data);
  } catch (error) {
    setError(`Ошибка на сервере: ${error.message}`);
    console.error(error.message);
  } finally {
    if (setLoader) {
      setLoader(false);
    }
  }
}

// Api для регистрация нового пользователя и авторизации на основном сервере
const authUrl = 'https://api.react-learning.ru';
const authHeaders = { 'Content-Type': 'application/json' };

// регистрация пользователя
const registerUser = async (
  registrationData,
  setState,
  setError,
  setLoader
) => {
  try {
    const response = await fetch(`${authUrl}/signup`, {
      headers: authHeaders,
      method: 'POST',
      body: JSON.stringify({ ...registrationData, group: 'group-9' }),
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

// авторизация пользователя
const authorizeUser = async (loginData, setState, setError, setLoader) => {
  try {
    const response = await fetch(`${authUrl}/signin`, {
      headers: authHeaders,
      method: 'POST',
      body: JSON.stringify(loginData),
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
const changeUserInfo = async (userData, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      ...configurateHeaders(),
      method: 'PATCH',
      body: JSON.stringify(userData),
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

// изменение аватара текущего пользователя (только аватара)
// в передаваемом объекте допускается только 1 свойство - avatar, значением которого дб ссылка
// структура успешного ответа сервера совпадает с ответом на запрос данных текущего пользователя
// следовательно можно использовать одно и то же состояние
const changeUserAvatar = async (userAvatar, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/users/me/avatar`, {
      ...configurateHeaders(),
      method: 'PATCH',
      body: JSON.stringify(userAvatar),
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

// Комментарии. Использоваться будут для подзаголовков/дополнительных текстовых полей.

// Создание нового "комментария"
// обязательна передача id поста, который комментируется. В body должно передаваться свойство text
const addNewComment = async (postID, commentText, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/posts/comments/${postID}`, {
      ...configurateHeaders(),
      method: 'POST',
      body: JSON.stringify(commentText),
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

// Получение всех комментариев к конкретному посту
const getCommentsByPost = async (postID, setState, setError) => {
  try {
    const response = await fetch(
      `${baseUrl}/posts/comments/${postID}`,
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
  getExchangeRates,
  registerUser,
  authorizeUser,
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

/*------------------- Проверка АПИ -------------------*/
let setCheckState = (data) => {
  console.log('Server answer', data);
};

const fullUserData = {
  about: 'Frontend developer trainee',
  avatar: 'https://react-learning.ru/image-compressed/default-image.jpg',
  email: 'KamajorQA@gmail.com',
  group: 'group-9',
  name: 'Kamajor',
};

const patchedUserData = {
  about: 'Frontend developer trainee',
  name: 'Kamajor',
};

const defaultUserAvatar = {
  avatar: 'https://react-learning.ru/image-compressed/default-image.jpg',
};

const patchedUserAvatar = {
  avatar:
    'https://i.pinimg.com/originals/ff/37/ea/ff37ea978387dae70e20ca110eb3dfb8.jpg',
};

const newPost = {
  title: 'Старейшие деревья в США пережили пожар',
  text: 'Когда на прошлой неделе мощный лесной пожар охватил старейший государственный парк Калифорнии, это вызвало очень много опасений. И не только из-за угрозы людям.',
  image:
    'https://positivnews.ru/wp-content/uploads/2020/08/1-lovarv8a77pdmsoii09par.jpg',
  tags: ['новости', 'fun'],
};

const updatedPost = {
  //  title: "Улучшение экологии в Китае",
  text: 'Сокращение загрязнения воздуха в Китае спасло уже сотни тысяч жизней с 1990 года. В мегаполисах Китая наблюдается значительное снижение большинства показателей загрязнения воздуха, а также связанных с этим случаев смерти. Согласно данным Фонда Билла и Мелинды Гейтс, опубликованным в журнале «Ланцет», во всех 33 провинциях, автономных районах и муниципалитетах Поднебесной наблюдается снижение в воздухе содержания твердых частиц, связанных с сжиганием топлива. Судя по цифрам, С 1990 года падение содержания твёрдых частиц в воздухе составило около 9%.',
  image:
    'https://positivnews.ru/wp-content/uploads/2020/09/1vadshoa8vdshrlva6vyp.jpg',
  tags: ['новости'],
};

const querySearch = 'ов';

const testComment = {
  text: 'Вдумчивый Комментарий',
};

// changeUserAvatar(defaultUserAvatar, setCheckState);

// changeUserAvatar(patchedUserAvatar, setCheckState);

// getArticleList(setCheckState);

// addNewArticle(newPost, setCheckState);

// updateArticle('id', updatedPost, setCheckState);

// deleteArticle('id', setCheckState);

// findArticles(querySearch, setCheckState);

// addNewComment('63d681de59b98b038f77ae41', testComment, setCheckState);

// getCommentsByPost('postID', setCheckState);

// deleteComment('63d681de59b98b038f77ae41', 'commentID', setCheckState);

// addLike('63d681de59b98b038f77ae41', setCheckState);

// deleteLike('63d681de59b98b038f77ae41', setCheckState);
