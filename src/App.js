import { useEffect, useState } from "react"

function App() {
  const [usd, setUsd] = useState("")
  const [eur, setEur] = useState("")
  const [uah, setUah] = useState("")
  const [cash, setCash] = useState("0.00")
  const [rezult, setRezult] = useState("")
  const [value, setValue] = useState("UAH");
  const [value2, setValue2] = useState("UAH");

  useEffect(() => {
    if (value === "UAH") setRezult((+cash*1).toFixed(2))
    if (value === "USD") setRezult((+usd*+cash).toFixed(2))
    if (value === "EUR") setRezult((+eur*+cash).toFixed(2))
    if (value2 === "USD") setRezult((prev) => (+prev/+usd).toFixed(2))
    if (value2 === "EUR") setRezult((prev) => (+prev/+eur).toFixed(2))
  }, [cash, value, uah, usd, eur, value2])
  
  useEffect(() => {
    async function kurs(){
      const res = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      const data = await res.json()
      setUsd((data.find(elem => elem.txt === "Долар США").rate))
      setEur((data.find(elem => elem.txt === "Євро").rate))
    }
    kurs()
  }, [])
  console.log(usd)

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
              <div className="currencyItem">
                <span className="currencyName">USD</span> 
                <span className="currencyValue">
                  <span>{Number(usd).toFixed(2)}</span>
                  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4.5L-6.99382e-07 4.5L2.5 0.5L5 4.5Z" fill="#00B75F"></path>
                  </svg>
                </span> 
              </div>
            </li>

            <li style={{marginRight:30}}>
              <div className="currencyItem">
                <span className="currencyName">EUR</span> 
                <span className="currencyValue">
                  <span> {Number(eur).toFixed(2)}</span>
                  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4.5L-6.99382e-07 4.5L2.5 0.5L5 4.5Z" fill="#00B75F"></path>
                  </svg>
                </span> 
              </div>
            </li>

          </ul>

        </div>

      </header>

      <div className="content">

        <div className="currency_1">
          <fieldset>
            <legend>Продаж </legend>
            Сума <input value={cash} onChange={event => setCash(event.target.value)}/>
            Валюта продажу <select value={value} onChange={event => setValue(event.target.value)}>
              <option value="UAH"> UAH </option>
              <option value="USD"> USD </option>
              <option value="EUR"> EUR </option>
            </select>
          </fieldset>
        </div>

        <div className="currency_2">
          <fieldset>
              <legend>Результат </legend>
              Сума <input value={rezult} onChange={event => setUah(event.target.value)}/>
              Валюта купівлі <select value={value2} onChange={event => setValue2(event.target.value)}>
                <option value="UAH"> UAH </option>
                <option value="USD"> USD </option>
                <option value="EUR"> EUR </option>
              </select>
            </fieldset>
        </div>

      </div>

    </div>
  );
}

export default App;

