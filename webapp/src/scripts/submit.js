import geocodingConvert from './geocoding'
import axios from 'axios'

function submit(query, name, description) {
  // let location = geocodingConvert(query)

  let geocoder = new window.google.maps.Geocoder()
  geocoder.geocode( { 'address': query}, function(results, status) {
    if (status === 'OK') {
      console.log(results)
      let location = [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
      console.log(location, name, description)
      axios({
        method: 'post',
        url: "http://34.122.178.86/api/markers",
        data: {
          'location': location,
          'name': name,
          'description': description,
        }
      })
        .then((response) => {
          console.log(response);
          window.location.reload()
        }, (error) => {
          console.log(error);
        });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

export default submit