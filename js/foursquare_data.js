
function ajax(){
    var itemsCount = 0
    var searchFor = $('.form-control')[0].value || 'pizza';
    var clientId = '3JMB4UVFMMT0ZJJ2CAEEE10DD42DWOSZEXQB0GO5214Y3A5A';
    var clientSecret = 'KXFDQJMF5TXUFHPASTL0AHF0BCHY3HIVUT1AC2330MP235C3';
    return $.ajax({
        type: "GET",
        dataType: 'json',
	    url:"https://api.foursquare.com/v2/venues/explore?client_id="+clientId+"&radius=1000&client_secret="+clientSecret + "&v=20180323&ll=51.49608,-0.068759&query="+searchFor})
}

//$('#formcontainer').submit(loadData);
    // to get the location of the Searh word
    
