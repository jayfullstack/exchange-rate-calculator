const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Generates the HTML select options for all countries
// Useful if I wanted to use them to generate the menu options

// function getRates(){
//   fetch('https://api.exchangerate-api.com/v4/latest/USD')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.rates);
//       Object.keys(data.rates).forEach(key =>{
//         console.log(key);
//       });
//     });
// }
// getRates();

// Fetch exchange rates and update the DOM
// Fetch won't reject on HTTP Error Status (unlike AJAX)
// Only rejects on something preventing it from firing
// Link to more info on Fetch Requests
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {

      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
