import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const ourInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryUnicDiv = document.querySelector('.country-info');


const woid = document.createElement('p');

function theText() {
  return ourInput.value.trim();
}

function fetchUsers() {
  return fetch(`https://restcountries.com/v3.1/name/${theText()}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchiUserov() {
  fetchUsers()
    .then(users => renderUserList(users))
    .catch(error => {
      console.log(error);
      if (ourInput.value.length > 1) {
        Notiflix.Notify.failure('FAILURE INPUT');
        countryUnicDiv.innerHTML = '';
        countryList.innerHTML = '';
      }
    });
}

ourInput.addEventListener('input', debounce(fetchiUserov, DEBOUNCE_DELAY));

function renderUserList(users) {
  console.log(users.length);
  if (users.length === 1) {
    const markup = users
      .map(user => {
        let ax = user.languages;
        let b = Object.values(ax);
        return `<li style="list-style-type:none">
        <div style="display:flex">
        <img width='30px' src="${user.flags.svg}" alt="text">
        <p style="font-size:30px; "><b></b>${user.name.common}</p>
        </div>
        <p style="font-size:30px; "><b>capital</b>: ${user.capital}</p>
            <p style="font-size:30px; "><b>population</b>: ${user.population}</p>
            <p style="font-size:30px; "><b>langueges</b>: ${b}</p>   
          </li>`;
      })
      .join('');

    countryList.innerHTML = '';
    countryUnicDiv.innerHTML = markup;
  } else if (users.length > 1 && users.length < 10) {
    const markup = users
      .map(user => {
        let ax = user.languages;
        let b = Object.values(ax);
        return `<li style="display:flex; list-style-type:none" >
        <div style="display:flex">
        <img width='50px' src="${user.flags.svg}" alt="text">
        <p style="font-size:30px; "><b></b> ${user.name.official}</p>
        </div>
        </li>`;
      })
      .join('');
    countryUnicDiv.innerHTML = '';
    countryList.innerHTML = markup;
  } else if (users.length > 10) {
    countryUnicDiv.innerHTML = '';
    countryList.innerHTML = '';
    Notiflix.Notify.failure('Слишком много совпадений. Введи что-то конкретнее братишка');
  }
}
