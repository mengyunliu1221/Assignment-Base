

const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

const restaurants = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => restaurants.push(...data));
  

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(places => {
    const regex = new RegExp(wordToMatch, 'gi');
    return places.name.match(regex);
  });
}


function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(places => {
      const regex = new RegExp(this.value, 'gi') ;
      const placeName = places.name.replace(regex, `<span class="hl">						${this.value}</span>`);
      const placeAddress = places.address_line_1.replace(regex, `<span 					 class="hl">${this.value}</span>`);
      const placeCity = places.city.replace(regex, `<span class="hl">						${this.value}</span>`);
      
      return  `
        <li>
            <span class= "title">${placeName}</span>
            <span class= "address">${placeAddress}, 
            	${placeCity}</span>
            <span class= "category">${places.category}</span>
        </li>
        `;
    }).join('');
    
    suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);