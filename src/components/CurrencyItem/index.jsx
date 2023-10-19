export const CurrencyItem = ({currencyValue}) => {
    return (
        <div className="currencyItem">
            <span className="currencyName">USD</span> 
            <span className="currencyValue">
                <span>{Number(currencyValue).toFixed(2)}</span>
                <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4.5L-6.99382e-07 4.5L2.5 0.5L5 4.5Z" fill="#00B75F"></path>
                 </svg>
            </span> 
        </div>
    )
}