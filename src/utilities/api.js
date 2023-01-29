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

// API для работы с основным сервером
const baseUrl = 'https://api.react-learning.ru/v2/group-9';
const headers = {
  'content-type': 'application/json',
  authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q2NWJhNTU5Yjk4YjAzOGY3N2FlMmUiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzQ5OTQxMTgsImV4cCI6MTcwNjUzMDExOH0.RNeI7FKp_G_TBtGbZa5GjBjtvwOfdKlhHh2hkLZ5abg',
};

// получение всех постов группы
const getArticleList = async (setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, { headers: headers });
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

// получение информации об авторизованном (по текущему токену) пользователю
const getUserInfo = async (setState, setError, setLoader) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, { headers: headers });
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

// изменение информации о текущем пользователе
const changeUserInfo = async (userData, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: headers,
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    setState(data);
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

// изменение аватара текущего пользователя
const changeUserAvatar = async (userData, setState, setError) => {
  try {
    const response = await fetch(`${baseUrl}/users/me/avatar`, {
      headers: headers,
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    setState(data);
  } catch (error) {
    if (setError) {
      setError(`Ошибка на сервере: ${error.message}`);
    }
    console.error(error.message);
  }
};

export { getExchangeRates, getArticleList, getUserInfo, changeUserInfo };
