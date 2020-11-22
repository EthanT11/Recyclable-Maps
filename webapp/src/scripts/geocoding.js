import axios from 'axios';

function geocodingConvert(address){
  let geocoder = new window.google.maps.Geocoder()
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status === 'OK') {
      console.log(results)
      return([results[0].geometry.location.lat(), results[0].geometry.location.lng()])

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
axios({
  method: 'post',
  url: 'null',
  data: {
    'coordinates': [],
    'name': "",
    'description': "",
    'hours': []
  }
})
.then((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});

export default geocodingConvert