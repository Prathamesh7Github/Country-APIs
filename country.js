const countryName = new URLSearchParams(location.search).get('name')
const flagImg=document.querySelector('.country-details img');
const flagName=document.querySelector('h1');
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const subRegion=document.querySelector('.sub-region');
const capital=document.querySelector('.capital');
const topLevelDomain=document.querySelector('.topLevelDomain');
const currency=document.querySelector('.currency');
const langauge=document.querySelector('.lang');
const borderCountrySelect=document.querySelector('.border-countries');
const backButton=document.querySelector('.back-button');



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then((data)=>{
    console.log(data);
    flagImg.src=data[0].flags.svg;
    flagName.innerText=data[0].name.common;

        //console.log(data[0].name.nativeName.eng.common);
    if(data[0].name.nativeName){
        console.log(Object.values(data[0].name.nativeName)[0].common);
        nativeName.innerText=Object.values(data[0].name.nativeName)[0].common;
    }
    else{
        nativeName.innerText=data[0].name.common
    }


    population.innerText=data[0].population.toLocaleString('en-IN');
    region.innerText=data[0].region;
    topLevelDomain.innerText=data[0].tld.join(', ');
    currency.innerText=Object.values(data[0].currencies).map((cur)=>cur.name).join(', ');
   
    if(data[0].subregion){
        subRegion.innerText=data[0].subregion;    
    }

    if(data[0].capital){
        capital.innerText=data[0].capital;
    }

    if(data[0].currencies){
        langauge.innerText=Object.values(data[0].languages).join(', ');
    }
    //langauges.innerText=Object.values(data[0].langauges);

    if(data[0].borders){
        data[0].borders.forEach((border) => {
            console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([borderCountry])=>{
                //console.log(borderCountry.name.common);

                let boderCountryTag=document.createElement('a');
                boderCountryTag.innerText=borderCountry.name.common;
                boderCountryTag.href=`country.html?name=${borderCountry.name.common}`;
                borderCountrySelect.append(boderCountryTag);
            })
        });
    }

})