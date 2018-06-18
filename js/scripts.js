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
// illness generator
Character.prototype.illnessGenerator = function() {
  var num = Math.floor(Math.random() * Math.floor(5))

  if (num === 1) {
    this.illness.push("Dysentery")
  } else if (num === 2) {
    this.illness.push("Gonorrhea")
  } else if (num === 3) {
    this.illness.push("Yellow Fever")
  } else if (num === 4) {
    this.illness.push("Pertussis")
  } else {
    this.illness.push("Broken Arm")
  }
}

$(document).ready(function(){
  $("#startBTN").click(function(){
    $("#start").fadeOut(500);
    $("#characterInput").delay(500).fadeIn(500);
  });
});
