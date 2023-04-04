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

export { registerUser, authorizeUser };
