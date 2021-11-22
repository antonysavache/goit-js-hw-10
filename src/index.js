// import './css/styles.css';
// import debounce from 'lodash';

const { create } = require("lodash");

// const DEBOUNCE_DELAY = 300;

const zapros = document.querySelector('#search-box');
const countryList = document.querySelector(".country-list");
const countryUnicDiv = document.querySelector(".country-info");



const woid = document.createElement('p')

// const dataValue = JSON.parse(get('https://restcountries.com/v3.1/name/ukraine'));

// zapros.addEventListener('input', () => {
//   console.log('', debounce(theText, 10000));
//   let url = `https://restcountries.com/v3.1/name/${theText()}`;
//   fetch(url)
//     .then(res => res.json())
//     .then(data => console.log('https://restcountries.com/v3.1/name/ukraine'))
// });


// console.log(fetch(''))

// let src = 'https://restcountries.com/v3.1/name/ukraine'

// fetch(src)
//     .then(res => res.json())
//     .then(data => console.log(src))



// TRY IT 
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });


// zapros.addEventListener('input', () => {
//   console.log('', debounce(theText, 10000));
//   let url = `https://restcountries.com/v3.1/name/${theText()}`;
//   fetch(url)
//     .then(res => res.json())
//     .then(data => console.log('https://restcountries.com/v3.1/name/ukraine'))
// });

function theText(){
    return  zapros.value.trim()
}


zapros.addEventListener("input", () => {
    fetchUsers()
      .then((users) => renderUserList(users))
      .catch((error) => console.log(error));
  });
  
  function fetchUsers() {
    return fetch(`https://restcountries.com/v3.1/name/${theText()}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }


  
  function renderUserList(users) {
      if (users.length === 1){
    const markup = users
      .map((user) => {
        let ax = user.languages;
        let b = Object.values(ax);
        
        // console.log(user.name.official)
        // ax.forEach(element => {
        //     return b.push(element.name)
        // });
        return `<li>
            <p><b>Name</b>: ${user.name.official}</p>
            <p><b>capital</b>: ${user.capital}</p>
            <p><b>population</b>: ${user.population}</p>
            <img width='100px' src="${user.flags.svg}" alt="text">
            <p><b>langueges</b>: ${b}</p>
            
          </li>`;
      })
      .join("");
      
      countryList.innerHTML = woid;
      countryUnicDiv.innerHTML = markup;
  }
  else if (users.length > 1 && users.length < 10) {
    const markup = users
    .map((user) => {
      let ax = user.languages;
      let b = Object.values(ax);
      
      // console.log(user.name.official)
      // ax.forEach(element => {
      //     return b.push(element.name)
      // });
      return `<li style="display:flex">
          <img width='100px' src="${user.flags.svg}" alt="text">
          <p><b>Name</b>: ${user.name.official}</p>
        </li>`;
    })
    .join("");
    
countryList.innerHTML = markup;
  }
  else if (users.length > 10){
    markup = `<li style="display:flex">
    <p><b>Name</b>: ту мач братишка, ту мач</p>
  </li>`;
  countryList.innerHTML = markup;
  }
    return console.log('1')
    
    ;
  


}