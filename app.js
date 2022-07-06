var obj = {};
const api = {
    key:"b272832c53e98e085ed787efae81d87d",
    base: "https://api.openweathermap.org/data/2.5/"
}
var loader = document.querySelector("header .loader");

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", function(e){
    if(e.keyCode == 13 && searchbox.value!=""){
        getRestults(searchbox.value);
        
    }
})


function getRestults(query){
    // fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    //     .then(weather => {
    //         return weather.json()
    //     }).then(data => {
    //         obj = data;
    //         console.log(obj);
    //         // display(obj);
    //     });
    

    loader.style.display = "block";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
    xhr.addEventListener("readystatechange", function(){
        if(xhr.status==200 && xhr.readyState===4){
            // console.log(xhr.responseText);
            obj =JSON.parse(xhr.responseText);
            
            console.log(obj);
            loader.style.display = "none";
            searchbox.value="";
            
            display(obj);
        }
        else if(xhr.status!=200 && xhr.readyState===4){
            alert("Please enter valid city name");
            loader.style.display = "none";
            searchbox.value="";
        }
    })
    xhr.send();
}


function display(obj){
    var city = document.querySelector(".location .city");
    var date = document.querySelector(".location .date");
    var temp = document.querySelector(".current .temp");
    var weather = document.querySelector(".current .weather");
    var hiLow = document.querySelector(".current .hi-low");

    city.innerHTML = `${obj.name}, ${obj.sys.country}`;
    date.innerHTML = `${new Date().toLocaleString('default', { weekday: 'long'})} 
                        ${new Date().getDate()} 
                        ${new Date().toLocaleString('default', { month:"long", year:"numeric"})}`

    temp.innerHTML = `${obj.main.temp}<span>℃</span>`
    weather.innerHTML = `${obj.weather[0].main}`;
    hiLow.innerHTML = `${obj.main.temp_min}℃/${obj.main.temp_max}℃`


}