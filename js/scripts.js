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
  var num = Math.floor(Math.random() * Math.floor(20))
  if (num === 1) {
    this.illness.push("Dysentery")
  } else if (num === 2) {
    this.illness.push("Gonorrhea")
  } else if (num === 3) {
    this.illness.push("Yellow Fever")
  } else if (num === 4) {
    this.illness.push("Pertussis")
  } else if (num === 5){
    this.illness.push("Broken Arm")
  }
}
//illness checker
Character.prototype.illnessChecker = function() {
  if (this.illness.length === 1) {
    this.health -= 2
  } else if (this.illness.length === 2) {
    this.health -= 4
  } else if (this.illness.length === 3) {
    this.health -= 6
  }
}
//status checker
Character.prototype.statusAdjuster = function() {
  if (this.health >= 80) {
    this.status = "good"
  } else if (this.health < 80 && this.health >= 20) {
    this.status = "fair"
  } else if (this.health < 20 && this.health > 0) {
    this.status = "poor"
  } else {
    this.status = "dead"
  }
}

$(document).ready(function(){
  $("#startBTN").click(function(){
    $("#start").fadeOut(500);
    $("#characterInput").delay(500).fadeIn(500);
  });
});
