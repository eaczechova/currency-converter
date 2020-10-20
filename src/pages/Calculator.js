import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';


function Select({ value, setCurrency }) {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch(`https://api.ratesapi.io/api/latest?base=PLN`)
            .then(res => res.json())
            .then(data => {
                setCurrencies(Object.keys(data.rates))
            });
    }, []);

    return (
        <select value={value} onChange={(e) => {
            setCurrency(e.target.value)
        }}> {currencies.map((c) =>
            <option value={c}>{c}</option>
        )}
        </select>
    );
}

function Calculator() {
    const [result, setResult] = useState(0)
    const [amount, setAmount] = useState(0);
    const [currencyFrom, setCurrencyFrom] = useState("PLN");
    const [currencyTo, setCurrencyTo] = useState("USD");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}`)
            .then(res => res.json())
            .then(data => {
                setResult(amount * data.rates[currencyTo]);
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="number" placeholder="Amount" onChange={(e) => {
                    setAmount(e.target.value);
                }} />
            </div>

            <div>
                <span>From:</span>
                <Select value={currencyFrom} setCurrency={setCurrencyFrom} />
            </div>

            <div>
                <span>To:</span>
                <Select value={currencyTo} setCurrency={setCurrencyTo} />
            </div>
            <div>Result: {result}</div>
            <Button>Send</Button>
        </form>
    );
}

export default Calculator