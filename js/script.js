var mymap = L.map('mapid').setView([51.505, -0.09], 15);
// creating markers variable For bulk update of all markers at once
var markers = new L.LayerGroup().addTo(mymap);

var myIcon = L.icon({
    iconUrl: './img/marker-icon.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
});


var mySelectedIcon = L.icon({
    iconUrl: './img/marker-icon-selected.png',
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [-1, -38] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);




// Setting the Original Data, or data before parsing Third party app
var initialMarks = [
{
    name : 'pizza allforno',
    info: 'pizza allfornopizza allfornopizza allfornopizza allforno',
    image: 'alforno.png',
    position: [51.50,-0.075]
},{
    name : 'pizza JUMLA',
    info: 'pizza JUMLA',
    image: 'tandori.png',
    position: [51.51,-0.08]
},{
    name : 'pizza tandori',
    info: 'pizza tandoripizza tandoripizza tandori',
    image: 'tandori.png',
    position: [51.50,-0.08]
},{
    name: 'pizza gamaj',
    info: 'pizza gamajpizza gamajpizza gamaj',
    image: 'gamaj.png',
    position: [51.50,-0.085]
},{
    name : 'pizza janzure',
    info: 'pizza janzurepizza janzurepizza janzure',
    image: 'janzure.png',
    position: [51.50,-0.081]
}];


var Mark = function(data) {
    //this.markInfo = ko.observable(data.info);
    this.markPosition = ko.observable(data.position);
    this.markName = ko.observable(data.name);  
    //this.markImage = ko.observable(data.image);  
};


var ViewModel = function() {
    var self = this
    //self.getData = getFoursquare();
    this.markList = ko.observableArray([]);
    this.go = ko.observableArray([]);
    initialMarks.forEach(function(markItem) {
        self.markList.push(new Mark(markItem));    // it has to be the ViewModel that is why self not this
    });

    this.currentMark = ko.observable( this.markList() );

    // to refresh the map when the filter button is refresshed
    this.filterThis = function(clicked) {
        // calling ajax data when the retrieved successfully
        ajax().done(function(result) {
        console.log('result',result)
        result_items = result.response.groups[0].items
        result_length =   result.response.groups[0].items.length      
        console.log('inside filterThis',result_items, result_length)
        markers.clearLayers();
        self.markList = ko.observableArray([]);
        for(i=0;i<result_length;i++){
                itemname = result_items[i].venue.name
                itemlatlng = [result_items[i].venue.location.lat, result_items[i].venue.location.lng]
                thisdata = {name:itemname, position:itemlatlng}
                self.markList.push(new Mark(thisdata));
        };
        self.currentMark(self.markList)
        for (i=0;i<self.markList().length;i++){
            x = L.marker(self.markList()[i].markPosition(), {   icon: myIcon, title: 'look at me!', riseOnHover: 'true'}).addTo(mymap)
              .bindPopup("<b>Hello world!</b><br />I am a "+self.markList()[i].markName()).openPopup()
              .addTo(markers);
              x.on('click', onMarkClick);
        };
        }).fail(function() {
            alert("Sorry... We are unable to fetch the data due to connectivty issue")
        });
        console.log('selfmarklist',this.markList()[0].markName());
    };

    this.showThis = function(clicked) {
        console.log('Something has been clicked',clicked)
        console.log(self.currentMark(clicked))
    };

    // Add Markers to the map

    for (i=0;i<self.markList().length;i++){
        var x = L.marker(self.markList()[i].markPosition(), { icon: myIcon, title: 'look at me!', riseOnHover: 'true'}).addTo(mymap)
          .bindPopup("<b>Hello world!</b><br />I am a "+self.markList()[i].markName()).openPopup()
         .addTo(markers);            
         x.on('click', onMarkClick);

    };

    function onMarkClick(e){
        console.dir(markers)
        if (e.target.options.icon.options.iconUrl == myIcon.options.iconUrl){
            e.target.setIcon(mySelectedIcon);
        } else {
            e.target.setIcon(myIcon);                
        }
    }


    var popup = L.popup();

    function onMapClick(e) {
        popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }
    mymap.on('click', onMapClick);
};


ko.applyBindings(new ViewModel());
