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
  this.markInfo = ko.observable(data.info);
  this.markPosition = ko.observable(data.position);
  this.markName = ko.observable(data.name);  
  this.markImage = ko.observable(data.image);  
};


var ViewModel = function() {
  var self = this
  this.markList = ko.observableArray([]);

  initialMarks.forEach(function(markItem) {
    self.markList.push(new Mark(markItem));    // it has to be the ViewModel that is why self not this
    });
  this.currentMark = ko.observable( this.markList()[1]);
  // to choose a car when we click on it
  this.chooseThis = function(clicked) {
    self.currentMark( clicked );  
    };
  this.showThis = function(clicked) {
        console.log(clicked.markPosition())
    };  
};


ko.applyBindings(new ViewModel());
