var searc = document.querySelector("#search")

searc.addEventListener("keyup" , e=>{
  search(e.target.value)
})

function sayhi(){
  console.log("yes iam clicked")
}

const days=["Sunday" ,"Monday" ,"Tuesday" ,"Wedensday" ,"Thursday" ,"Friday" ,"Saturday"  ]
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



async function search(a) {
  let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d2e3e0fb53514b2981d204514230308&q=${a}&days=3&aqi=no&alerts=no`)
  ;
  
  if (req.ok && 400 != req.status) {
      let res = await req.json();
      console.log(res)
      current(res.location, res.current)
      next(res.forecast.forecastday)
  }
}
var day = new Date()
  var today =days[day.getDay()]
  var month =monthNames[day.getMonth()];
  var date = month.concat(" " , day.getDay())
  var tommorow = (day.getDay())+1
  var dayafter = tommorow+1
  if(day.getDay() == 6 )
  {
    tommorow = 0;
    dayafter= 1;
  }
  con(tommorow)
function current(location , current){
  
  
  document.getElementById("weathercontent").className = "weather container row m-auto g-2 rounded-3 p-0 m-0 overflow-hidden"
  // console.log(current.condition.icon)
  con(current.condition.icon)

    var todayIcon = current.condition.icon.slice(2)
    con(todayIcon)
    
    var box = `
            <div class="card-header d-flex justify-content-between  p-2 mb-5 card-head ">
                <p class="fs-5 fw-bolder">${today}</p>
                <p class="fs-5 fw-bolder">${date}</p>

            </div>
            <div class="weather-info mb-5">
                <p class=" city ">${location.name}</p>
            </div>
            <div class="degree mb-5">
                <h1 class=" main">${current.temp_c}<sup>o</sup>C</h1>
            </div>
            <div class="icon mb-5">
                <img src="${todayIcon}" alt="">

            </div>
            <div class="wind d-flex justify-content-around mt-3">
                <div class="hum d-flex">
                    <i class="fa-regular fa-umbrella me-2"></i>
                    <p>${current.humidity}</p>
                    

                </div>
                <div class="speed d-flex">
                    <i class="fa-solid fa-wind me-2"></i>
                    <p>${current.vis_km} Km/h</p>
                </div>
                <div class="direction d-flex">
                    <i class="fa-brands fa-nfc-directional me-2"></i>
                    <p>${current.wind_dir}</p>
                </div>
            </div>
        </div>`

        con("here")
    document.getElementById("main-weather").innerHTML = box
  


}
//forcast[1].day.condition.icon

function con(a)
{
  console.log(a)
}

function next(forecast){
      var box2 = `<div class="card-header d-flex justify-content-around  p-2 mb-5 card-dark">
                  <p class="fs-5">${days[tommorow]}</p>
                  
                </div>
                <div class="weather-info mb-5">
                <img src="${forecast[1].day.condition.icon}" alt="">
                </div>
                <div class="degree mb-5">
                  <h1 class=" main2">${forecast[1].day.maxtemp_c} <sup>o</sup> C</h1>
                  <h3 class=" main3">${forecast[1].day.mintemp_c} <sup>o</sup> C</h3>
                </div>

                <div>
                  <p class="fs-4" >${forecast[1].day.condition.text}</p>
                </div>

               `
  document.getElementById("next").innerHTML = box2
  var box3 = `<div class="card-header d-flex justify-content-around  p-2 mb-5 card-head ">
                <p class="fs-5">${days[dayafter]}</p>
                
              </div>
              <div class="weather-info mb-5">
              <img src="${forecast[2].day.condition.icon}" alt="">
              </div>
              <div class="degree mb-5">
              <h1 class=" main2">${forecast[2].day.maxtemp_c} <sup>o</sup> C</h1>
              <h3 class=" main3">${forecast[2].day.mintemp_c} <sup>o</sup> C</h3>
              </div>

              <div>
              <p class="fs-4" >${forecast[2].day.condition.text}</p>
              </div>
  
          `
          document.getElementById("after").innerHTML = box3

  con(forecast[1].day.maxtemp_c)
  con(forecast[1].day.condition.icon)
}



// search("cairo")


fetch('https://api.geoapify.com/v1/ipinfo?apiKey=b44e7b237c9748e3ab754430ad073495')
  .then(response => response.json())
  .then(data => {
    // You can now access the location data in the "data" object
    console.log(data);
    search(data.city.name)
  })
