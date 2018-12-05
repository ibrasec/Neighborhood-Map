var clientId = '3JMB4UVFMMT0ZJJ2CAEEE10DD42DWOSZEXQB0GO5214Y3A5A';
var clientSecret = 'KXFDQJMF5TXUFHPASTL0AHF0BCHY3HIVUT1AC2330MP235C3';
function ajax() {
    var searchFor = $('.form-control')[0].value || 'pizza';
    return $.ajax({
        type: "GET",
        dataType: 'json',
        url: "https://api.foursquare.com/v2/venues/explore?client_id=" + clientId + "&radius=1000&client_secret=" + clientSecret + "&v=20180323&ll=51.503026, -0.091159&query=" + searchFor
    })
}

function getPhoto(venuesId) {
    return $.ajax({
        type: "GET",
        dataType: 'json',
        url: "https://api.foursquare.com/v2/venues/" + venuesId + "/photos?limit=1&v=20180323&client_id=" + clientId + "&client_secret=" + clientSecret
    })
}

