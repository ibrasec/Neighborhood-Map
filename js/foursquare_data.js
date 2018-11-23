

function getFoursquare() {

    var searchFor = 'restaurant';
    var clientId = '3JMB4UVFMMT0ZJJ2CAEEE10DD42DWOSZEXQB0GO5214Y3A5A';
    var clientSecret = 'KXFDQJMF5TXUFHPASTL0AHF0BCHY3HIVUT1AC2330MP235C3';
    var result = [];
    // to get the location of the Searh word
    $.getJSON( "https://api.foursquare.com/v2/venues/explore?client_id="+clientId+"&radius=1000&client_secret="+clientSecret + "&v=20180323&ll=51.49608,-0.068759&query="+searchFor, function( data ) {
        var d_ = data.response.groups[0].items
        $.each( d_, function( key, val ) {
            var id = val.venue.id
            var name = val.venue.name
            var address = val.venue.location.address
            var location = [val.venue.location.lat, val.venue.location.lng]
            result.push({ 'id':id, 'name':name ,'address':address, 'position':location })
        });
        // itrating through data to find the url, the main and the snippet 
    })        
      .done(function () {
        console.log('inside foursqurae',result)
        return result
        //$("#nytimes-articles").append(items);
    })
      .fail(function () {
        error = '<p>COULDNT COULDNT COULDNT COULDNT COULDNT COULDNT</p>';
        console.log('error')
    });

    return result;
};

//$('#form-container').submit(loadData);
