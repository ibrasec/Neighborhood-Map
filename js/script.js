var mymap = L.map('mapid').setView([51.505, -0.09], 15);
// creating markers_layer variable For bulk update of all markers_layer at once
var markers_layer = new L.LayerGroup().addTo(mymap);
var markers = {};
var oldClicked = '';
var oldItemClicked = '';
var myIcon = L.icon({
    iconUrl: './img/marker-icon.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-1, -38] // point from which the popup should open relative to the iconAnchor
});


var mySelectedIcon = L.icon({
    iconUrl: './img/marker-icon-selected.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [-1, -38] // point from which the popup should open relative to the iconAnchor
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
        name: 'Kaplan Law School',
        info: 'Palace House, 3 Cathedral St, London SE1 9DE, UK',
        icon: './img/school_64.png',
        image: './img/kaplan.png',
        position: [51.506535, -0.090685]
    }, {
        name: 'Charles Dickens Primary Scool',
        info: 'Toulmin St, London SE1 1AF, UK',
        icon: './img/school_64.png',
        image: './img/charles_school.jpeg',
        position: [51.501139, -0.09634]
    }, {
        name: 'Snowsfields Primary School',
        info: 'Kirby Grove, London SE1 3TD, UK',
        icon: './img/school_64.png',
        image: './img/snowfield_school.jpeg',
        position: [51.501752, -0.083948]
    }, {
        name: 'Bell London',
        info: '1-2 Bear Gardens, London SE1 9ED, UK',
        icon: './img/school_64.png',
        image: './img/bell_school.jpeg',
        position: [51.507627, -0.095675]
    }, {
        name: 'Flying Fantastic',
        info: '229 Union St, London SE1 0LR, UK',
        icon: '../img/school_64.png',
        image: './img/flying_fantastic.jpeg',
        position: [51.503554, -0.101797]
    }
];


var Mark = function (data) {
    this.markInfo = ko.observable(data.info);
    this.markPosition = ko.observable(data.position);
    this.markName = ko.observable(data.name);
    this.markIcon = ko.observable(data.icon);
    this.markImage = ko.observable(data.image);
    this.markId = ko.observable(data.id);
};


var ViewModel = function () {
    var self = this;
    this.imageError = 'error';
    this.markList = ko.observableArray([]);
    this.go = ko.observableArray([]);
    initialMarks.forEach(function (markItem) {
        self.markList.push(new Mark(markItem));    // it has to be the ViewModel that is why self not this
    });

    this.currentMark = ko.observable(this.markList());

    // to refresh the map when the filter button is refresshed
    this.filterThis = function (clicked) {
        // calling ajax data when the retrieved successfully
        ajax().done(function (result) {
            console.log('result',result)
            result_items = result.response.groups[0].items;
            result_length = result.response.groups[0].items.length;
            markers_layer.clearLayers();
            self.markList = ko.observableArray([]);
            for (i = 0; i < result_length; i++) {
                var itemImage = '';
                // retrieve item image using ajax
                getPhoto(result_items[i].venue.id).done(function (image) {
                    prefix = image.response.photos.items[0].prefix;
                    suffix = image.response.photos.items[0].suffix;
                    itemImage = prefix + '300x100' + suffix;
                    self.imageError = '';
                }).fail(function () {
                    console.log('We coudlnt retrieve the image');
                });
                // Assign an Error image if we couldn't retrive an image
                if (self.imageError === 'error') { itemImage = './img/error-note.png'; }
                itemAddress = result_items[i].venue.location.address;
                itemCity = result_items[i].venue.location.city;
                itemState = result_items[i].venue.location.state;
                itemCountry = result_items[i].venue.location.country;
                itemIcon = result_items[i].venue.categories[0].icon.prefix + '64' + result_items[i].venue.categories[0].icon.suffix;
                itemName = result_items[i].venue.name;
                itemlatlng = [result_items[i].venue.location.lat, result_items[i].venue.location.lng];
                itemId = result_items[i].venue.id;
                // Gathering item info
                itemInfo = itemAddress + ',' + itemCity + ',' + itemState + ',' + itemCountry;
                thisdata = {name:itemName, position:itemlatlng, info:itemInfo, icon:itemIcon, image:itemImage, id:itemId};
                self.markList.push(new Mark(thisdata));
            };
            self.currentMark(self.markList)
            updateMarkers()
        }).fail(function () {
            alert("Sorry... We are unable to fetch the data due to connectivty issue")
        });
    };


    // Add markers_layer to the map
    function updateMarkers() {
        for (j = 0; j < self.markList().length; j++) {
            popupText = "<img src=" + self.markList()[j].markImage() + "><br>" +
                        "<b>Icon:</b> <img src=" + self.markList()[j].markIcon() + "><br>" +
                        "<b>Name:</b>" + self.markList()[j].markName() +"<br>" +
                        "<b>Address:</b>" + self.markList()[j].markInfo()
            var x = L.marker(self.markList()[j].markPosition(), { icon: myIcon, title: self.markList()[j].markName(), riseOnHover: 'true'}).addTo(mymap)
                .bindPopup(popupText).openPopup()
                .addTo(markers_layer);
            x.on('click', onMarkClick);
            markers[self.markList()[j].markName()]=x
        };
    }

    updateMarkers()

    function onMarkClick(e) {
        // To check if there are any previously clicked Mark to Unmark it
        if ( (oldClicked != '') && (oldClicked.latlng !== e.latlng) ) {
            oldClicked.target.setIcon(myIcon);
        }        
        // To Color the Mark if it hasn't been selected
        if ( e.target.options.icon.options.iconUrl == myIcon.options.iconUrl) {
            e.target.setIcon(mySelectedIcon);
            oldItemClicked.setIcon(myIcon);  
            oldClicked = e
        } 
        // To un-color the Mark if it was selected before
        else {
            e.target.setIcon(myIcon);
        }
    }

    // Use the event to find the clicked element
    $('.list-group').on('click', function(e) {
        markers[e.target.textContent].openPopup()
        console.log(oldItemClicked._latlng, markers[e.target.textContent]._latlng )
        if ( (oldItemClicked != '') && (oldItemClicked._latlng !== markers[e.target.textContent]._latlng) ) {
            console.log('old is different => Set myicon')
            oldItemClicked.setIcon(myIcon);
        }
        if ( markers[e.target.textContent].options.icon.options.iconUrl == myIcon.options.iconUrl) {
            console.log('new icon is clicked => set myseleceted icon')
            markers[e.target.textContent].setIcon(mySelectedIcon);
            if (oldClicked !='') {oldClicked.target.setIcon(myIcon);}
            oldItemClicked = markers[e.target.textContent]
        } 
        // To un-color the Mark if it was selected before
        else {
            console.log('else => set myicon')
            markers[e.target.textContent].setIcon(myIcon);
        }
    });


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
