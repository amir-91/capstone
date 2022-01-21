export function checkUrl(url) {
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    if(url.match(urlRegex)) {
      fetchData(url)
      retrieveData()
    } else if(url=='') { 
        alert('input is required')
    } else {
      alert('please enter valid url')
    }  
}

const fetchData = (url) => {
  fetch(`https://api.meaningcloud.com/sentiment-2.1?key=b0bc2d3f041fd9932fa9964b3b362e85&&url=${url}&lang=en`)
  .then(response => response.json())
  .then(data => postUrl('http://localhost:8081/checkUrl', data))
}

/* Function to POST data */
const postUrl = async (url, data) => {
    const response = await fetch (url, {
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

const retrieveData = async () =>{
  const request = await fetch('http://localhost:8081/all');
  try {
  const allData = await request.json()
  if (allData.agreement != undefined) {
    document.getElementById('agreement').innerHTML =allData.agreement
    document.getElementById('subjectivity').innerHTML = allData.subjectivity
    document.getElementById('confidence').innerHTML = allData.confidence
    document.getElementById('irony').innerHTML = allData.irony
    document.getElementById('score_tag').innerHTML = allData.score_tag
  }
  }
  catch(error) {
    console.log('error', error)
  }
 }
