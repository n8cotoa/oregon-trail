// character constructor
function Character(name) {
  this.name = name;
  this.health = 100;
  this.status = "good"
  this.illness = []
}
// wagon/inventory constructor
function Wagon() {
  this.food = 2000;
}

$(document).ready(function(){
  $("#startBTN").click(function(){
    $("#start").fadeOut(500);
    $("#characterInput").delay(500).fadeIn(500);
  });
});
