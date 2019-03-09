let uluru, map, marker
let ws
let players = {}
let nick = '1'

// Tworzenie mapy
function initMap() {
    uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        // keyboardShortcuts: false
    });
   
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP
    });
    getLocalization()
    startWebSocket()
    addKeyboardEvents()
}
 //Przypicie zdarzenia do poruszania markerem
function addKeyboardEvents() {
    window.addEventListener('keydown', poruszMarkerem)
}
// Funckja do poruszania markerem
function poruszMarkerem(ev) {
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()
 
    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }
    let position = {
        lat,
        lng
    }
    let wsData = {
        lat: lat,
        lng: lng,
        id: nick
    }
    marker.setPosition(position)
    ws.send(JSON.stringify(wsData))
}
// Websocket
function startWebSocket() {
    let url = 'ws://91.121.6.192:8010'
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}
// Data z websocket
function onWSOpen(data) {
    console.log(data)
}
//
function onWSMessage(e) {
    let data = JSON.parse(e.data)
 
    if (!players['user' + data.id]) {
        players['user' + data.id] = new google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map: map,
            animation: google.maps.Animation.DROP
        })
    } else {
        players['user' + data.id].setPosition({
            lat: data.lat,
            lng: data.lng
        })
    }
}
//Pobranie geolokalizacji
function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

//Pobranie lat / long od uzytkownika
function geoOk(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
}
 
//Funkcja wywyołana jeśli użytkownik odmówi geolokalizacji
function geoFail(err) {
    console.log(err)
}