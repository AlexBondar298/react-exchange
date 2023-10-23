import styles from "./Header.module.scss"

import { useEffect, useState } from "react";
import { CurrencyItem } from "./CurrencyItem";

const Header = () => {
  const [currentCurrency, setCurrentCurrency] = useState({
    USD: "",
    EUR: "",
  });

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
    <header>
      <div className={styles.headerLeft}>
        <img src="/img/logo.svg" alt="logo" />
        <div className={styles.headerInfo}>
          <h3>REACT EXCHANGE</h3>
          <p style={{ opacity: 0.5 }}>Онлайн конвертер курсу валют</p>
        </div>
      </div>

      <div className={styles.headerRight}>
        <a
          href="https://bank.gov.ua/"
          title="Перейти на сайт НБУ"
          target="blank"
        >
          <img src="/img/nbu.svg" alt="NBU" />
        </a>
        <ul title="Офіційний курс валют НБУ">
          <li style={{ marginRight: 30 }}>
            <CurrencyItem currencyValue={currentCurrency.USD} />
          </li>
          <li style={{ marginRight: 30 }}>
            <CurrencyItem currencyValue={currentCurrency.EUR} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
