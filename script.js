const url='https://api.openweathermap.org/data/2.5/weather';
const apiKey='1bb92d5e18a6b6aa3fd03ea6c9e8cdae';
$(document).ready(function(){
    weatherFn('Noida');
    $('#city-input-btn').on('click',function(){
        let cityName=$('#city-input').val();
        if(cityName){
            weatherFn(cityName);

        } else {
            alert('Please enter a city name');
        }
    });
});
async function weatherFn(cName){
    const temp=`${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try{
        const res=await fetch(temp);
        const data=await res.json();
        if(res.ok){
            weatherShowFn(data);

        } else {
            alert('City not found.Please try again');
        } 
    } catch(error){
        console.error("Error fetching weather data:",error);
    }
}
function weatherShowFn(data){
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY,h:mm:ss a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed:${data.wind.speed}m/s`);
    const iconCode=data.weather[0].icon;
    $('#weather-icon').attr('src',`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    $('#weather-info').fadeIn();
}