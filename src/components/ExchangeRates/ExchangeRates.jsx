import { useState, useEffect } from 'react';
import { getExchangeRates } from '../../utilities/api';
import Loader from '../Loader/Loader.jsx';
import s from './exchangeRates.module.css';

function ExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState('true');

  // вариант с объявлением и вызовом функции в самом компоненте
  //   useEffect(() => {
  //     async function getExchangeRates() {
  //       const currencyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
  //       const response = await fetch(currencyURL);
  //       const data = await response.json();
  //       setExchangeRates(data);
  //     }
  //     getExchangeRates(); // вместо этого вызова можно сразу саму функцию обернуть в IIFE
  //   }, []);

  useEffect(() => {
    getExchangeRates(setExchangeRates, setErrorMsg, setIsLoading);
  }, []);

  console.log('ExchangeRates', exchangeRates);
  console.log('ExchangeRates', isLoading);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <article className={s.exchangeRates}>
          <div className={s['exhangeRates-usd']}>
            <span className={s.currencySign}>&#36;</span>
            <span id="usd">{exchangeRates.Valute.USD.Value.toFixed(2)}</span>
          </div>
          <div className={s['exchangeRates-eur']}>
            <span className={s.currencySign}>&#8364;</span>
            <span id="eur">{exchangeRates.Valute.EUR.Value.toFixed(2)}</span>
          </div>
        </article>
      )}
    </>
  );
}

export { ExchangeRates };
