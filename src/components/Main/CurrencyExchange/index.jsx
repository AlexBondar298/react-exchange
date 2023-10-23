export const CurrencyExchange = ({cash, setCash, currencySale, setCurrencySale}) => {
    return(
        <div className="currency">
          <fieldset>
            <legend>Продаж </legend>
            Сума <input value={cash} onChange={event => setCash(event.target.value)}/>
            Валюта продажу <select value={currencySale} onChange={event => setCurrencySale(event.target.value)}>
              <option value="UAH"> UAH </option>
              <option value="USD"> USD </option>
              <option value="EUR"> EUR </option>
            </select>
          </fieldset>
        </div>
    )
}