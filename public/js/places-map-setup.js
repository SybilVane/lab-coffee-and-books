function initMap() {
  const map = new google.maps.Map(document.querySelector('#myMap'), {
    zoom: 15,
    center: { lat: 40.427011473175085, lng: -3.70402815153775 },
    title: 'Campus MAD',
  });

  getPlaces(map);
}

function getPlaces(map) {
  axios
    .get('/api/places')
    .then(response => printPlaces(response.data, map))
    .catch(err => console.log(err));
}

function printPlaces(places, map) {
  places.forEach(place => {
    let position = {
      lat: place.location.coordinates[0],
      lng: place.location.coordinates[1],
    };

    new google.maps.Marker({ map, position, title: place.name });
  });
}
