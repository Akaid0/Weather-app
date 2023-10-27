const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone')
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '250a0772c7b3edc284d1fbd54085dced';


window.onload = function () {
    const images = ["./assets/image (1).jpg","./assets/image (2).jpg","./assets/image (3).jpg","./assets/image (4).jpg","./assets/image (5).jpg","./assets/image (6).jpg","./assets/image (7).jpg","./assets/image (8).jpg","./assets/image (9).jpg","./assets/image (10).jpg","./assets/image (11).jpg","./assets/image (12).jpg","./assets/image (13).jpg","./assets/image (14).jpg","./assets/image (15).jpg","./assets/image (16).jpg","./assets/image (17).jpg","./assets/image (18).jpg","./assets/image (19).jpg","./assets/image (20).jpg","./assets/image (21).jpg","./assets/image (22).jpg","./assets/image (23).jpg","./assets/image (24).jpg","./assets/image (25).jpg","./assets/image (26).jpg","./assets/image (27).jpg","./assets/image (28).jpg","./assets/image (29).jpg","./assets/image (30).jpg","./assets/image (31).jpg","./assets/image (32).jpg","./assets/image (33).jpg","./assets/image (34).jpg","./assets/image (35).jpg","./assets/image (36).jpg","./assets/image (37).jpg","./assets/image (38).jpg","./assets/image (39).jpg","./assets/image (40).jpg","./assets/image (41).jpg","./assets/image (42).jpg","./assets/image (43).jpg","./assets/image (44).jpg","./assets/image (45).jpg","./assets/image (46).jpg","./assets/image (47).jpg","./assets/image (48).jpg","./assets/image (49).jpg","./assets/image (50).jpg","./assets/image (51).jpg","./assets/image (52).jpg","./assets/image (53).jpg","./assets/image (54).jpg","./assets/image (55).jpg","./assets/image (56).jpg","./assets/image (57).jpg","./assets/image (58).jpg","./assets/image (59).jpg","./assets/image (60).jpg","./assets/image (61).jpg","./assets/image (62).jpg","./assets/image (63).jpg","./assets/image (64).jpg","./assets/image (65).jpg","./assets/image (66).jpg","./assets/image (67).jpg","./assets/image (68).jpg","./assets/image (69).jpg","./assets/image (70).jpg","./assets/image (71).jpg"];
    var image = images[Math.floor(Math.random() * images.length)];
    document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + image + "')";
    document.getElementsByTagName('body')[0].style.backgroundRepeat = "no-repeat";
    document.getElementsByTagName('body')[0].style.backgroundPosition = "center center";
    document.getElementsByTagName('body')[0].style.objectFit = "cover";
}

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour ;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeE1.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0' +minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ', ' + date+ ' ' + months[month];

}, 1000);

getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    });
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + data.lon+ 'E '

    currentWeatherItemsE1.innerHTML =
     `<div class="weather-item">
        <p>Humidity</p>
        <p>${humidity} %</p>
    </div>
    <div class="weather-item">
        <p>Pressure</p>
        <p>${pressure} hPa</p>
    </div>
    <div class="weather-item">
        <p>Wind speed </p>
        <p>${wind_speed }m/s</p>
    </div>
    <div class="weather-item">
        <p>Sunrise</p>
        <p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
    </div>
    <div class="weather-item">
        <p>Sunset</p>
        <p>${window.moment(sunset * 1000).format('HH:mm a')}</p>
    </div>`;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0) {
            currentTempE1.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Day &emsp; ${Math.round(day.temp.day)} &#176;C</div>
                <div class="temp">Night &emsp; ${Math.round(day.temp.night)} &#176;C</div>
            </div>
            `
        } else {
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Day &emsp; ${Math.round(day.temp.day)} &#176;C</div>
                <div class="temp">Night &emsp; ${Math.round(day.temp.night)} &#176;C</div>
            </div>
            `
        }
    });

    weatherForecastE1.innerHTML = otherDayForcast;
}
