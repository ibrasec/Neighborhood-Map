var mymap = L.map('mapid').setView([51.505, -0.09], 15);
// creating markers variable For bulk update of all markers at once
var markers = new L.LayerGroup().addTo(mymap);

var myIcon = L.icon({
    iconUrl: 'icon2.png',
    iconSize: [38, 95],
    iconAnchor: [225, 225],
    popupAnchor: [-3, -76]
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);


// simulate getting Data from foursquare using a call function
//var getData = getFoursquare();


var getData = [
{
    name : 'restaurant allforno',
    info: 'restaurant allfornopizza allfornopizza allfornopizza allforno',
    image: 'alforno.png',
    position: [51.50,-0.085]
},{
    name : 'restaurant tandori',
    info: 'restaurant  tandoripizza tandoripizza tandori',
    image: 'tandori.png',
    position: [51.51,-0.0865]
},{
    name: 'restaurant  gamaj',
    info: 'restaurant  gamajpizza gamajpizza gamaj',
    image: 'gamaj.png',
    position: [51.50,-0.0876]
},{
    name : 'restaurant  janzure',
    info: 'restaurant  janzurepizza janzurepizza janzure',
    image: 'janzure.png',
    position: [51.51,-0.0888]
}];











// Setting the Original Data, or data before parsing Third party app
var initialMarks = [
{
    name : 'pizza allforno',
    info: 'pizza allfornopizza allfornopizza allfornopizza allforno',
    image: 'alforno.png',
    position: [51.50,-0.075]
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

    initialMarks.forEach(function(markItem) {
        self.markList.push(new Mark(markItem));    // it has to be the ViewModel that is why self not this
    });

    this.currentMark = ko.observable( this.markList() );

    // to refresh the map when the filter button is refresshed
    this.filterThis = function(clicked) {
        //getData = getFoursquare()
        markers.clearLayers();
        self.markList = ko.observableArray([]);
        for (i=0;i<getData.length;i++){
                self.markList.push(new Mark(getData[i]));
        }
        //this.getData().forEach(function(markItem) {
        //    self.markList.push(new Mark(markItem));    // it has to be the ViewModel that is why self not this
        //});
        console.log('marklist inside filterThis',self.markList())
        for (i=0;i<self.markList().length;i++){
            //console.log('asd',self.markList()[i].markPosition())

            L.marker(self.markList()[i].markPosition(), {  title: 'look at me!', riseOnHover: 'true'}).addTo(mymap)
              .bindPopup("<b>Hello world!</b><br />I am a "+self.markList()[i].markName()).openPopup()
              .addTo(markers);
        };

    };

    this.showThis = function(clicked) {
        mymap.setView(clicked.markPosition(),15);
    };

    // Add Markers to the map
    for (i=0;i<self.markList().length;i++){
        //console.log('asd',self.markList()[i].markPosition())

        L.marker(self.markList()[i].markPosition(), { title: 'look at me!', riseOnHover: 'true'}).addTo(mymap)
          .bindPopup("<b>Hello world!</b><br />I am a "+self.markList()[i].markName()).openPopup()
          .addTo(markers);
    };


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
