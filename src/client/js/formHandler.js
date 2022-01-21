export function handleSubmit(event) {
    event.preventDefault()
    let urlEntered = document.getElementById('url').value
    Client.checkUrl(urlEntered)
}
