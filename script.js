const countriesContainer=document.querySelector('.countries-container');
const filterbyRegion=document.querySelector('.filter-by-region');
const searchInput=document.querySelector('.search-container input');

let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data)=>{
    renderCountery(data);
    allCountriesData=data;
   // console.log(allCountriesData);
});



// const cardImg=document.createElement('img');
// cardImg.src="https://flagcdn.com/et.svg";

// countryCard.append(cardImg);


filterbyRegion.addEventListener('change',(e)=>{
    console.log(e.target.value);

    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
.then((res)=>res.json())
.then(renderCountery);

})


function renderCountery(data){
    
    countriesContainer.innerHTML='';

    data.forEach((country) => {
        //console.log(country.capital);
        const countryCard=document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href=`country.html?name=${country.name.common}`;
        //console.log(countryCard);
        
        
        const cardHTML=`
                
                <img src= "${country.flags.svg}">
                <div class="card-text">
                    <h3 class="card-title"> ${country.name.common}</h3>
                    <p><b>Population</b>: ${(country.population).toLocaleString('en-IN')}</p>
                    <p><b>Region</b>: ${country.region}</p>
                    <p><b>Capital</b>: ${country.capital}</p>
                </div>
                </a>`;
        
        countryCard.innerHTML=cardHTML;
        
        countriesContainer.append(countryCard)
        
        
    });
}


searchInput.addEventListener('input',(e)=>{
    //console.log(e.target.value);
    let filterdCountries = allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
   // console.log(filterdCountries);

    renderCountery(filterdCountries);
})