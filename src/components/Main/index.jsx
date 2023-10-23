import { useEffect, useState } from "react";

import { CurrencyExchange } from "./CurrencyExchange";

import styles from "./Main.module.scss";

const Main = () => {
  const [currentCurrency, setCurrentCurrency] = useState({
    USD: "",
    EUR: "",
  });
  const [cash, setCash] = useState("0.00");
  const [result, setResult] = useState("");
  const [currencySale, setCurrencySale] = useState("UAH");
  const [currencyPurchase, setCurrencyPurchase] = useState("UAH");

  useEffect(() => {
    if (currencySale === "UAH") setResult((+cash * 1).toFixed(2));
    if (currencySale === "USD")
      setResult((+currentCurrency.USD * +cash).toFixed(2));
    if (currencySale === "EUR")
      setResult((+currentCurrency.EUR * +cash).toFixed(2));
    if (currencyPurchase === "USD")
      setResult((prev) => (+prev / +currentCurrency.USD).toFixed(2));
    if (currencyPurchase === "EUR")
      setResult((prev) => (+prev / +currentCurrency.EUR).toFixed(2));
  }, [
    cash,
    currencySale,
    currentCurrency.USD,
    currentCurrency.EUR,
    currencyPurchase,
  ]);

  console.log(currentCurrency.USD);

  useEffect(() => {
    async function rate() {
      const res = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
      );
      const data = await res.json();
      setCurrentCurrency((prev) => ({
        ...prev,
        USD: data.find((elem) => elem.txt === "Долар США").rate,
      }));
      setCurrentCurrency((prev) => ({
        ...prev,
        EUR: data.find((elem) => elem.txt === "Євро").rate,
      }));
    }
    rate();
  }, []);
  return (
    <div className={styles.main}>
      <CurrencyExchange
        cash={cash}
        setCash={setCash}
        currencySale={currencySale}
        setCurrencySale={setCurrencySale}
      />

      <CurrencyExchange
        cash={result}
        currencySale={currencyPurchase}
        setCurrencySale={setCurrencyPurchase}
      />
    </div>
  );
};

export default Main;
