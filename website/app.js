/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();


//the generate button
const generateButton = document.getElementById('generate');

//URL of the openweather website
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
//the apikey linked to my account
const apiKey = '&appid=bba49e95d3ee6f4d0a90d5c1d622524e&units=metric';


//the async function that gets the temp from the openweather api
const getTemp = async (URL, zip, key)=>{

  //the returned obj from the api
  const res = await fetch(URL+zip+key);
  try {

    const data = await res.json();
    console.log(data.main.temp);
    //converting the temperature from kelvin to celsuis and returning it as an integer
    return (parseInt(data.main.temp));
  } 
  catch(error) {
    console.log("error", error);
  }
}

//the asyc function that stores data in the server
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}
//the async function that gets the user date from the server
const updateUI = async (URL)=>{

  const res = await fetch(URL);
  try {
    const data = await res.json();
    document.getElementById('date').innerHTML = "Date: "+ data.date;
    document.getElementById('temp').innerHTML = "Temperature: "+ data.temp+"°C";
    document.getElementById('content').innerHTML = "Feelings: "+data.userResponse;
  } 
  catch(error) {
    console.log("error", error);
  }
}







function  generateOutput(){
    console.log("Getting Data");
    
    //storing the feeling of the user in a variable(feelings)
    let feelings =  document.getElementById("feelings").value;

    //storing the zip code of the city that the user enterd in variable(zipEntered)
    let zipEntered = document.getElementById("zip").value;

    //Calling the function that fetches the the api and returns the temperature of the city
    getTemp(baseURL,zipEntered,apiKey)
    .then(result => {
      //if the req is fulfilled the then block will run

      //Creating an object to evetually pass it to the post req
      const UserData = {};

      //storing the temp in the object
      UserData.temp = result;
      //storing the date in the object
      UserData.date = newDate;
      //storing the user feelings in the object
      UserData.userResponse = feelings;

      //Note the names of the fields(temp,date,userResponse) are consistent with the projectData object in the server side

     

      postData("/postUserData", UserData)

      //postData("/postUserData", UserData);
      //updateUI("/retrieveData");


    }).then(()=>{
      updateUI("/retrieveData");

    });
 
}

//Adding an eventlistener to the generate button which is triggered when the button is clicked
generateButton.addEventListener('click', generateOutput);

