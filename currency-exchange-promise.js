const axios = require('axios');


const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`)
        .then( response => {
            return response.data.rates[to];
        });
}


const getCountriesByCurrency = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        .then( response => {
            return response.data.map( country => country.name);
        });
}


const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountriesByCurrency(to).then( tempCountries=>{
        countries = tempCountries;
        return getExchangeRate(from, to)
    }).then(rate => {
        const exchangeAmount = (rate * amount).toFixed(2);

        return `
            ${amount} ${from} is worth ${exchangeAmount} ${to}.
            ${to} can be used in the following countries: ${countries.join(', ')}
        `;
    });
}

getExchangeRate('EUR', 'PLN').then( rate => console.log('Rate:', rate) );
getCountriesByCurrency('PLN').then( countries => console.log('Countries:', countries) );
convertCurrency('EUR', 'PLN', 500).then( converted => console.log(converted) );