// fetch-запрос для получения курса валют от ЦБ РФ на текущую дату
// при вызове в нужном компоненте передается функция установки используемого состояния
async function getExchangeRates(setState) {
  const currencyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const response = await fetch(currencyURL);
  const data = await response.json();
  setState(data);
}

export { getExchangeRates };
