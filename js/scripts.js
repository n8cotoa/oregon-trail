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
  this.money = 500;
  this.days = 0;
  this.characters = []
}
// illness generator
Character.prototype.illnessGenerator = function() {
  var num = Math.floor(Math.random() * Math.floor(20))
  if (num === 1 && this.illness != "Dysentery") {
    this.illness.push("Dysentery")
  } else if (num === 2 && this.illness != "Gonorrhea") {
    this.illness.push("Gonorrhea")
  } else if (num === 3 && this.illness != "Yellow Fever") {
    this.illness.push("Yellow Fever")
  } else if (num === 4 && this.illness != "Pertussis") {
    this.illness.push("Pertussis")
  } else if (num === 5 && this.illness != "Broken Arm"){
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
//status adjuster
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
//calculates potential illnesses
Wagon.prototype.turn = function() {
  wagon.characters.forEach(function(char){
    char.illnessGenerator()
    char.illnessChecker()
    char.statusAdjuster()
  });
  wagon.food -= (wagon.characters.length * 5 )
  wagon.eventGrabber()
  wagon.dayCounter()
}
// function for resting -- cure illness, gain some health
Wagon.prototype.rest = function() {
  wagon.characters.forEach(function(char){
    char.illness.splice(0, 1)
    if (char.health < 99) {
    char.health += 2
    }
    char.statusAdjuster()
  });
}
//event grabber
Wagon.prototype.eventGrabber = function() {
  var num = Math.floor(Math.random() * Math.floor(100))
  if (num >= 80) {
    positiveEvent()
    //call positive event
  } else if (num < 80 && num >= 20) {
    neutralEvent()
    //call neutral event
  } else if (num < 20 && num > 5) {
    negativeEvent()
    //call negative event
  } else {
    deathEvent()
    //call death event
  }
}

function positiveEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyIncrease = Math.floor(Math.random() * (200 - 100) + 100)
  if (num === 1) {
    $("#ongoing-events").prepend("As you rest by the river, you find some gold. <br>")
    wagon.money += ranSupplyIncrease
  } else if (num === 2) {
    $("#ongoing-events").prepend("You come across an abandoned wagon, you find some unspoiled food <br>")
    wagon.food += ranSupplyIncrease
  } else if (num === 3) {
    $("#ongoing-events").prepend("You found a wounded deer <br>")
    wagon.food += ranSupplyIncrease
  } else if (num === 4) {
    $("#ongoing-events").prepend("As you travel along, you come across a group of suckers. You got some free shit. <br>")
    wagon.money += ranSupplyIncrease
  } else if (num === 5){
    $("#ongoing-events").prepend("You ambush and murder another party. We feast tonight. <br> You got " + ranSupplyIncrease + " pounds of food and " + (ranSupplyIncrease/2) + " dollars" )
    wagon.money += (ranSupplyIncrease/2)
    wagon.food += ranSupplyIncrease
  }
}

function neutralEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  if (num === 1) {
    $("#ongoing-events").prepend("One of you ox was pregnant and gave birth. The baby died and she is sad, but continues on. <br>")
  } else if (num === 2) {
    $("#ongoing-events").prepend("You get a letter from home. <br>")
  } else if (num === 3) {
    $("#ongoing-events").prepend("Your party finds a small lake and decides to go for a swim. <br>")
  } else if (num === 4) {
    $("#ongoing-events").prepend("You find a small bunny and decide to keep it (not as food, what's wrong with you.) <br>")
  } else if (num === 5){
    $("#ongoing-events").prepend("A member of your party explores their sexuality with a neighbor boy. <br>")
  }
}

function negativeEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyDecrease = Math.floor(Math.random() * (200 - 100) + 100)
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  console.log(index);
  if (num === 1) {
    $("#ongoing-events").prepend("Your party finds a small lake and decides to go for a swim. Unfortunately the lake was full of phirranas. <br>" + wagon.characters[index].name + " got hurt! <br>")
    wagon.characters[index].health -= 10
  } else if (num === 2 && wagon.characters[index].illness != "Gonorrhea") {
    $("#ongoing-events").prepend("You find a small bunny and decide to keep it. The bunny bites" + wagon.characters[index].name + "." + wagon.characters[index].name + "has gonorrhea.")
    wagon.characters[index].illness.push("Gonorrhea")
  } else if (num === 3) {
    $("#ongoing-events").prepend("Your party is ambush, they hold you hostage and take some of your food. <br>")
    wagon.food -= ranSupplyDecrease
    wagon.days += index
  } else if (num === 4) {
    $("#ongoing-events").prepend("Your wagon wheel broke, in the distance you hear Jesus Take The Wheel playing. <br>")
    wagon.days += 5
    wagon.food -= ((wagon.characters.length * 5 ) * 5)
  } else if (num === 5){
    $("#ongoing-events").prepend("Some of your food rots because " + wagon.characters[index].name + " wet themselves as they napped on it.")
    wagon.food -= ranSupplyDecrease
  }
}

function deathEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num === 1 && wagon.characters[index].health < 65) {
    $("#ongoing-events").prepend(wagon.characters[index].name + " has been shot and killed by Dick Chenney while straying away from the party.")
    wagon.characters.splice(index, 1)
  } else if (num === 2 && wagon.characters[index].illness == "Dysentery" && wagon.characters[index].health < 65) {
    $("#ongoing-events").prepend(wagon.characters[index].name + " wakes up screaming in the middle of their nap. They hunch over and fall to the ground. Their chest bursts open and the creature inside jumps out and attacks " + wagon.characters[0].name + " with acid and scurries off into the wilderness. " + wagon.characters[index].name + " is dead." )
    wagon.characters.splice(index, 1)
    wagon.characters[0].health -= 15
    wagon.characters[0].illness.push("Acid Burns")
  } else if (num === 3 && wagon.characters[index].health < 45 ) {
    $("#ongoing-events").prepend(wagon.characters[index].name + " has developed Pica and has been secretly snackin' on the gold. They die of heavy metal toxicity. You lose 25% of your gold.")
    wagon.money -= (wagon.money * 0.25)
    wagon.characters.splice(index, 1)
  } else if (num === 4) {
    $("#ongoing-events").prepend(wagon.characters[index].name + " got like stupid stoned the night before and ate a lot of food when their munchies kicked in.")
    wagon.food -= (wagon.money * 0.5)
  } else if (num === 5 && wagon.characters[index].illness == "Gonorrhea") {
    $("#ongoing-events").prepend(wagon.characters[index].name  + " has also contracted chlymida and it has run rampant. They run off into the woods, never to be seen again.")
    wagon.characters.splice(index, 1)
  }
}
//Hunting
Wagon.prototype.huntingTime = function() {
  this.food += Math.floor(Math.random() * Math.floor(150))
}
//Profession checker
Wagon.prototype.profession = function() {
  if ("[name=profession][value=1]:checked") {
    this.money += 500
  } else if ("[name=profession][value=2]:checked") {
    this.money += 300
  } else if ("[name=profession][value=3]:checked") {
    this.food += 500
  } else if ("[name=profession][value=4]:checked") {
    this.food += 250
    this.money += 250
  } else if ("[name=profession][value=5]:checked") {
    this.money += 400
    this.food += 100
  } else if ("[name=profession][value=6]:checked") {
    this.money += 50
  }
}
// IF we change how this works it is referenced in the different event grabbers
Wagon.prototype.dayCounter = function() {
  this.days += 1
}

function storeSubTotal(food) {
  var total = (food * 0.2)
  return total
}

function storeBuy(food) {
  wagon.food += food
  wagon.money -= (food * 0.2)

  var total = (food * 0.2)
  return total
}

$(document).ready(function(){
  var x = 1;
  $('#wagon-images').addClass('sky1');

  $("#startBTN").click(function(){
    $("#start").fadeOut(500);
    $("#characterInput").delay(500).fadeIn(500);
  });
  $("#characterBTN").click(function(){
    var playerOneName = $("#char1").val()
    var playerTwoName = $("#char2").val()
    var playerThreeName = $("#char3").val()
    var playerFourName = $("#char4").val()
    var playerFiveName = $("#char5").val()

    char1 = new Character(playerOneName)
    char2 = new Character(playerTwoName)
    char3 = new Character(playerThreeName)
    char4 = new Character(playerFourName)
    char5 = new Character(playerFiveName)
    wagon = new Wagon()

    wagon.characters.push(char1, char2, char3, char4, char5)
    wagon.profession()
    $("#characterInput").fadeOut(500);
    $("#store").delay(500).fadeIn(500);
    $('#player-one-name').text(char1.name);
    $('#player-two-name').text(char2.name);
    $('#player-three-name').text(char3.name);
    $('#player-four-name').text(char4.name);
    $('#player-five-name').text(char5.name);
    $('#player-one-status').text(char1.status);
    $('#player-two-status').text(char2.status);
    $('#player-three-status').text(char3.status);
    $('#player-four-status').text(char4.status);
    $('#player-five-status').text(char5.status);
    $('#wagon-food-remaining').text(wagon.food);

  });
$("#subtotal").click(function(){
  var buyFood = parseInt($("#store input").val())
  $(".store-total").text("$ " + storeSubTotal(buyFood))
});

$("#storeBTN").click(function(){
  $("#store").fadeOut(500);
  $("#gameMainScreen").delay(500).fadeIn(500);
  var buyFood = parseInt($("#store input").val())
  storeBuy(buyFood)
  $('#wagon-food-remaining').text(wagon.food);
  /* button will eventually add items to wagon's inventory count. presently hardcoded, so, no effect */
});

  $("#continue-button").click(function(){
    wagon.turn()
    $('#player-one-status').text(char1.status);
    $('#player-two-status').text(char2.status);
    $('#player-three-status').text(char3.status);
    $('#player-four-status').text(char4.status);
    $('#player-five-status').text(char5.status);
    $('#wagon-food-remaining').text(wagon.food);
    console.log(wagon)
    if (x < 4) {
      $('#wagon-' + x).toggle();
      $('#wagon-images').removeClass('sky' + x);
      x++;
      $('#wagon-' + x).toggle();
      $('#wagon-images').addClass('sky' + x);
    } else {
      $('#wagon-' + x).toggle();
      $('#wagon-images').removeClass('sky' + x);
      x = 1;
      $('#wagon-' + x).toggle();
      $('#wagon-images').addClass('sky' + x);
    }
  });

  $("#rest-button").click(function(){
    wagon.rest()
    $('#player-one-status').text(char1.status);
    $('#player-two-status').text(char2.status);
    $('#player-three-status').text(char3.status);
    $('#player-four-status').text(char4.status);
    $('#player-five-status').text(char5.status);
    $('#wagon-food-remaining').text(wagon.food);
  });
});
