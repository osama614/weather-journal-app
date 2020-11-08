/* Global Variables */
let apiKey = '&appid=1d509b2f565fcf3fa07873c700e84453'
let baseUri = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const button = document.getElementById('generate');


const perform = () => {
  const zipCode = document.getElementById('zip').value;
  const userFeelings = document.getElementById('feelings').value;

  getWeatherData(baseUri,zipCode, apiKey)

  .then((res) => {
    console.log(res)
    postData('/weatherData', data={temperature: res.temperature, date: res.date, userResponse: userFeelings})

  })

  .then(() => {
    updateUi('/getWeatherData');
  })
};


/* Function to GET data */
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  
  let url = `${baseUrl}${zipCode}${apiKey}`   
  const respond = await fetch(url);
      
  try {
      
    const myData = await respond.json();
    const formattedData = {
        temperature: myData.main.temp,
        date: newDate
    };
    console.log(formattedData)
    return formattedData;

  }catch(err) {
    console.log("error", err);
    const validat = document.getElementById('validation')
    validat.style.display = 'block';
    validat.innerHTML = "This is invalid Zip code"
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      } catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

// for updating the page view
const updateUi = async (uri) => {
    const response = await fetch(uri);
    try{
        const myData = await response.json();
        console.log(myData);
        document.getElementById('temp').innerHTML = `<i class='fas fa-thermometer-three-quarters'></i><span>${ myData.temperature} °F</span>`;
        document.getElementById('date').innerHTML = `<i class='far fa-calendar-alt'></i><span>${ myData.date}</span>`;
        document.getElementById('content').innerHTML = `<i class='far fa-comment'></i><span>${ myData.userResponse}</span>`;
    }
    catch(err) {
        console.log("error:", err)
    }
};  
  
button.addEventListener('click', perform);  
  