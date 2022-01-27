let apiKey = ''
let imageKey = ''
const getApiKey = async () => {
  const res = await fetch('http://localhost:8081/key')
  const api = await res.json()
  apiKey =  api.key
  imageKey = api.imageKey
  console.log(imageKey, 'image')
} 

export function getCityData(date, city, postalCode) {
  if(date != '' && city != '' && postalCode != '') {
    getApiKey()
    fetchImage(city)
    fetchData(city, date, postalCode)
    console.log(date)
    console.log(city)
    console.log(apiKey)
    retrieveData()
    retrieveImages()
  } else {
    alert ('please enter city, date and postal code')
  }
}

const fetchData = (city, date, postal) => {
  const startDate = date
  const endDate = date.replace(startDate.slice(-2), Number(startDate.slice(-2))+1)
  console.log(endDate)
  fetch(`https://api.weatherbit.io/v2.0/history/daily?postal_code=${postal}&country=${city}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => postUrl('http://localhost:8081/getCityData', data))
}

const fetchImage = (city) => {
  fetch(`https://pixabay.com/api/?key=${imageKey}&q=${city}+places&image_type=photo&pretty=true`)
  .then(response => response.json())
  .then(data => postImage('http://localhost:8081/getCityImage', data))
}

/* Function to POST data */
const postUrl = async (city, data) => {
  console.log(data)
    const response = await fetch (city, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    try {
      const newData = await response.json()
      return newData
    } catch(error) {
      console.log("error", error)
    }
}

const postImage = async (city, data) => {
  console.log(data)
    const response = await fetch (city, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.hits)
    })
    try {
      const newData = await response.json()
      return newData
    } catch(error) {
      console.log("error", error)
    }
}

  const retrieveData = async () =>{
  const request = await fetch('http://localhost:8081/all');
  try {
  const allData = await request.json()
  console.log(allData, 'hellooooo')
  if (allData.cityName != undefined) {
    document.getElementById('cityName').innerHTML =allData.cityName
    document.getElementById('cityTime').innerHTML = allData.time
    document.getElementById('cityDate').innerHTML = allData.date
    document.getElementById('citySnow').innerHTML = allData.snow
    document.getElementById('maxTemp').innerHTML = allData.maxTemp
    document.getElementById('minTemp').innerHTML = allData.minTemp
    document.getElementById('windSpeed').innerHTML = allData.windSpeed
  }
  }
  catch(error) {
    console.log('error', error)
  }
 }

 const retrieveImages = async () =>{
  const request = await fetch('http://localhost:8081/images');
  try {
  const allImages = await request.json()
  console.log(allImages, 'hellooooo')
  if (allImages.length != 0) {
    document.getElementById('image').src = allImages[2].userImageURL
  }
  }
  catch(error) {
    console.log('error', error)
  }
 }