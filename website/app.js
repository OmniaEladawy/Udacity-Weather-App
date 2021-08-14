// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

/* Global Variables */
const date = document.getElementById("date");
const temprature = document.getElementById("temp");
const content = document.getElementById("content");
const btn = document.getElementById("generate");

//call api
//base url of weather map api 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//personal api key
const apiKey = ',&appid=1e49a78bebeb0257307ef860f9980998&units=metric';

//button event 
btn.addEventListener('click', generate);

//function to generate data
function generate(){
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    
    getData(baseURL , zipCode , apiKey)
    .then((data) => {
        console.log(data);

        const dataObj = {
            date:newDate,
            temp: Math.round(data.main.temp),
            content: feeling,
        };
        
        postData('/addData' , dataObj);
    
        updateUI();
    }); 
}

//get request to get data from server 
const getData = async(baseURL , zipCode , apiKey) => {
    const response = await fetch(baseURL+zipCode+apiKey);
    console.log(response);
    try {
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log("Error: " , error);
    }
}

//post request to save data to server
const postData = async(url='' , dataObj={}) => {
    const response = await fetch(url , {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),       
    });

    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
    console.log("Error: ", error);
    }
}

//function to update UI 
const updateUI = async() => {
    const response = await fetch('/allData');
    try{
        const retrieveData = await response.json();
        console.log(retrieveData);
        date.innerHTML = "Date: " + retrieveData.date;
        temprature.innerHTML = "Temprature: " + retrieveData.temp + " C";
        content.innerHTML = "Feeling: " + retrieveData.content;
    }
    catch(error){
        console.log("Error: " , error);
    }
}
