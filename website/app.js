/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=0d88af369a77c3ebadb1791d12339971";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', performAction);

/* Function called by event listener */
function performAction(event) {
    let zipCode = document.getElementById("zip").value;
    getWeather(baseURL, zipCode, apiKey)
        .then(function (data) {
            let req = {
                date: newDate,
                temp: data.main.temp,
                content: document.getElementById("feelings").value
            }
            postData('/weather', req)
                .then(
                    updateUI('/all')
                )
        });
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey);

    try {
        const weather = res.json();
        return weather;
    } catch (error) {
        console.log("error", error)
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};



/* Function to GET Project Data and Update UI*/
const updateUI = async (url = '') => {
    const req = await fetch(url);
    try {
        const data = await req.json()
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content;
    }
    catch (error) {
        console.log("error", error);
    }
};