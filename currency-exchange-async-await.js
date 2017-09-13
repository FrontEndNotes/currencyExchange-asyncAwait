const axios = require('axios');


const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
        const rate = response.data.rates[to];

        if (rate) 
            return rate;
        else 
            throw new Error();

    } catch (error) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to} ${error}`);
    }    
}


getCountriesByCurrency = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map( country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode} currency.`);
    }
}


const convertCurrency = async (from, to, amount) => {
    const countries = await getCountriesByCurrency(to);
    const rate = await getExchangeRate(from, to);
    const exchangeAmount = (rate * amount).toFixed(2);
    
    return `
        ${amount} ${from} is worth ${exchangeAmount} ${to}.
        ${to} can be used in the following countries: ${countries.join(', ')}
    `;
}


getExchangeRate('EUR', 'PLN').then( rate => console.log('Rate:', rate) );
getCountriesByCurrency('PLN').then( countries => console.log('Countries:', countries));

convertCurrency('EUR', 'PLN', 500)
    .then(converted=>console.log(converted))
    .catch( error => console.log(error));


// uncoment to test
// simulate error - not existing currency 'abc'

// convertCurrency('EUR', 'abc', 500)
//     .then(converted=>console.log(converted))
//     .catch( error => console.log(error));