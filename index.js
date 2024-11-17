const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    weatherFn('New York');
    
    $('#city-input-btn').click(function() {
        weatherFn($('#city-input').val());
    });

    $('#city-input').keypress(function(e) {
        if(e.which == 13) {
            weatherFn($('#city-input').val());
        }
    });
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM DD YYYY, h:mm a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed span').html(`${data.wind.speed} m/s`);
    $('#humidity span').html(`${data.main.humidity}%`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();

    const temp = data.main.temp;
    let gradient;
    if (temp < 0) {
        gradient = 'linear-gradient(135deg, #7474BF, #348AC7)';  
    } else if (temp < 10) {
        gradient = 'linear-gradient(135deg, #6DD5FA, #2980B9)';  
    } else if (temp < 20) {
        gradient = 'linear-gradient(135deg, #3CA55C, #B5AC49)';  
    } else if (temp < 30) {
        gradient = 'linear-gradient(135deg, #FFB75E, #ED8F03)';  
    } else {
        gradient = 'linear-gradient(135deg, #EB3349, #F45C43)';  
    }
    $('body').css('background', gradient);
}