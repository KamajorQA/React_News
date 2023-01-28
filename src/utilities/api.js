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

export { getExchangeRates };
