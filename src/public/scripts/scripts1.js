const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const countryLink = (country)=> `https://geocoding-api.open-meteo.com/v1/search?name=${country}&count=1&language=en&format=json`

const latlonLink = (latitude,longitude) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature`

const getCountryLatAndLon = async(country) => {
    try{
        const response = await fetch(countryLink(country));
        if(response.ok){
            const data = await response.json();
            if(!isObjectEmpty(data)){
                throw new Error('No Match Found, Please Try Again');;
            }
            return { latitude : data.results[0].latitude , longitude: data.results[0].longitude};
        }
    }catch(error){
        throw error;
    }
  
}

const isObjectEmpty = (objectName) => {
    const dat = Object.keys(objectName).find(x=> x === "results");
    console.log(dat);
    return dat;   
  }

const getTemperatureLatAndLon = async(latitude,longitude) => {
    try{
        const response = await fetch(latlonLink(latitude,longitude));
        if(response.ok){
            const data = await response.json();
            if(data.error) throw new Error('No Match Found, Please Try Again');
            return { temperature: data.current_weather.temperature.toString().concat(data.hourly_units.temperature_2m)};
        } 
    }catch(error){
        throw error;
    }
  
}

module.exports = {getCountryLatAndLon ,getTemperatureLatAndLon}








