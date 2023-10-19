import { useEffect, useState } from "react"

import { CurrencyItem } from "./components/CurrencyItem"
import { CurrencyExchange } from "./components/CurrencyExchange"

function App() {
  const [usd, setUsd] = useState("")
  const [eur, setEur] = useState("")
  const [uah, setUah] = useState("")
  const [cash, setCash] = useState("0.00")
  const [result, setResult] = useState("")
  const [currencySale, setCurrencySale] = useState("UAH");
  const [currencyPurchase, setCurrencyPurchase] = useState("UAH");

  useEffect(() => {
    if (currencySale === "UAH") setResult((+cash*1).toFixed(2))
    if (currencySale === "USD") setResult((+usd*+cash).toFixed(2))
    if (currencySale === "EUR") setResult((+eur*+cash).toFixed(2))
    if (currencyPurchase === "USD") setResult((prev) => (+prev/+usd).toFixed(2))
    if (currencyPurchase === "EUR") setResult((prev) => (+prev/+eur).toFixed(2))
  }, [cash, currencySale, uah, usd, eur, currencyPurchase])
  
  useEffect(() => {
    async function rate(){
      const res = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      const data = await res.json()
      setUsd((data.find(elem => elem.txt === "Долар США").rate))
      setEur((data.find(elem => elem.txt === "Євро").rate))
    }
    rate()
  }, [])

  return (
    <div className="wrapper">

      <header>

        <div className="headerLeft">
          <img src="/img/logo.svg" alt="logo" />
          <div className="headerInfo">
            <h3>REACT EXCHANGE</h3>
            <p style={{opacity:0.5}}>Онлайн конвертер курсу валют</p>
          </div>
        </div>

        <div className="headerRight">
          <a href="https://bank.gov.ua/" title="Перейти на сайт НБУ" target="blank">
            <img src="/img/nbu.svg" alt="NBU" />
          </a>
          <ul title="Офіційний курс валют НБУ">
            <li style={{marginRight:30}}>
              <CurrencyItem currencyValue={usd}/>
            </li>
            <li style={{marginRight:30}}>
              <CurrencyItem currencyValue={eur}/>
            </li>
          </ul>

        </div>

      </header>

      <div className="content">

          <CurrencyExchange 
            cash={cash}
            setCash={setCash}
            currencySale={currencySale}
            setCurrencySale={setCurrencySale}
          />

          <CurrencyExchange 
            cash={result}
            setCash={setUah}
            currencySale={currencyPurchase}
            setCurrencySale={setCurrencyPurchase}
          />

      </div>

    </div>
  );
}

export default App;

