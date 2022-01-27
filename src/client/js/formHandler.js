export function handleSubmit(event) {
  event.preventDefault()
  let date = document.getElementById('date').value
  let city = document.getElementById('city').value
  let postalCode = document.getElementById('postal').value
  Client.getCityData(date, city, postalCode)
}
