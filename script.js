const url='https://www.weatherapi.com/my/';
const apiKey='01bae03f01254f7fbf180834251511';
$(document).ready(function(){
    weatherFn('Noida');
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
    $('#city-input-btn').on('click',function(){
        let cityName=$("#city-input").val();
        if(cityName){
            weatherShowFn(cityName);
        } else {
            alert("please enter a city name.");
        }
    });
        $('#weather-info').fadeIn();
}