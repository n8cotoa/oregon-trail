// character constructor
function Character(name) {
  this.name = name;
  this.health = 100;
  this.status = "good"
  this.illness = []
}
// wagon/inventory constructor
function Wagon() {
  this.food = 0;
  this.money = 500;
  this.days = 0;
  this.characters = []
}
// illness generator
Character.prototype.illnessGenerator = function() {
  var num = Math.floor(Math.random() * Math.floor(80))
  if (num === 1 && this.illness.includes("Dysentery") == false ) {
    this.illness.push("Dysentery")
    $(".ongoing-events").prepend(this.name + " got Dysentery <br>")
  } else if (num === 2 && this.illness.includes("Gonorrhea") == false) {
    this.illness.push("Gonorrhea")
    $(".ongoing-events").prepend(this.name + " got Gonorrhea <br>")
  } else if (num === 3 && this.illness.includes("Yellow Fever") == false) {
    this.illness.push("Yellow Fever")
    $(".ongoing-events").prepend(this.name + " got Yellow Fever <br>")
  } else if (num === 4 && this.illness.includes("Pertussis") == false) {
    this.illness.push("Pertussis")
    $(".ongoing-events").prepend(this.name + " got Pertussis <br>")
  } else if (num === 5 && this.illness.includes("Broken Arm") == false){
    this.illness.push("Broken Arm")
    $(".ongoing-events").prepend(this.name + " got a Broken Arm <br>")
  }
}
//illness checker
Character.prototype.illnessChecker = function() {
  if (this.illness.length === 1) {
    this.health -= 2
  } else if (this.illness.length === 2) {
    this.health -= 4
  } else if (this.illness.length >= 3) {
    this.health -= 6
  }
}

//food checker
Wagon.prototype.foodChecker = function() {
  if (this.food === 0) {
    wagon.characters.forEach(function(char){
      char.health -= 10
    });
  }
}

//death checker
Wagon.prototype.deathChecker = function() {
  wagon.characters.forEach(function(char){
    if (char.health <= 0) {
      var index = wagon.characters.indexOf(char)
      wagon.characters.splice(index, 1)
      char.status = "Dead"
    }
  })
  if (wagon.characters.length === 0) {
    alert("Game Over! You killed everyone. Great job...")
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
  wagon.eventGrabber()
  wagon.characters.forEach(function(char){
    char.illnessGenerator()
    char.illnessChecker() //reduces health if infected
    char.statusAdjuster() //updates status on screen based on health
  });
  if (wagon.food > 0) {
  wagon.food -= (wagon.characters.length * 5 )
} else if (wagon.food <= 0) {
  wagon.food = 0
}
  this.days += 1
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
  wagon.food -= (wagon.characters.length * 5 )
  this.days += 1
}
//event grabber
Wagon.prototype.eventGrabber = function() {
  var num = Math.floor(Math.random() * Math.floor(100))
  if (num >= 80) {
    positiveEvent()
    //call positive event
  } else if (num < 80 && num >= 60) {
    neutralEvent()
    //call neutral event
  } else if (num < 60 && num >= 40) {
    negativeEvent()
    //call negative event
  } else if (num < 40 && num >= 35){
    deathEvent()
    //call death event
  }
}

function positiveEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyIncrease = Math.floor(Math.random() * (200 - 100) + 100)
  if (num === 1) {
    $(".ongoing-events").prepend("As you rest by the river, you find some gold. <br>")
    wagon.money += ranSupplyIncrease
  } else if (num === 2) {
    $(".ongoing-events").prepend("You come across an abandoned wagon, you find some unspoiled food <br>")
    wagon.food += ranSupplyIncrease
  } else if (num === 3) {
    $(".ongoing-events").prepend("You found a wounded deer <br>")
    wagon.food += ranSupplyIncrease
  } else if (num === 4) {
    $(".ongoing-events").prepend("As you travel along, you come across a group of suckers. You got some free shit. <br>")
    wagon.money += ranSupplyIncrease
  } else if (num === 5){
    $(".ongoing-events").prepend("You ambush and murder another party. We feast tonight. <br> You got " + ranSupplyIncrease + " pounds of food and " + (ranSupplyIncrease/2) + " dollars" )
    wagon.money += (ranSupplyIncrease/2)
    wagon.food += ranSupplyIncrease
  }
}

function neutralEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  if (num === 1) {
    $(".ongoing-events").prepend("One of you ox was pregnant and gave birth. The baby died and she is sad, but continues on. <br>")
  } else if (num === 2) {
    $(".ongoing-events").prepend("You get a letter from home. <br>")
  } else if (num === 3) {
    $(".ongoing-events").prepend("Your party finds a small lake and decides to go for a swim. <br>")
  } else if (num === 4) {
    $(".ongoing-events").prepend("You find a small bunny and decide to keep it (not as food, what's wrong with you.) <br>")
  } else if (num === 5){
    $(".ongoing-events").prepend("A member of your party explores their sexuality with a neighbor boy. <br>")
  }
}

function negativeEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyDecrease = Math.floor(Math.random() * (200 - 100) + 100)
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num === 1) {
    $(".ongoing-events").prepend("Your party finds a small lake and decides to go for a swim. Unfortunately the lake was full of phirranas. <br>" + wagon.characters[index].name + " got hurt! <br>")
    wagon.characters[index].health -= 10
  } else if (num === 2 && wagon.characters[index].illness.includes("Gonorrhea") == false) {
    $(".ongoing-events").prepend("You find a small bunny and decide to keep it. The bunny bites" + wagon.characters[index].name + "." + wagon.characters[index].name + "has gonorrhea.")
    wagon.characters[index].illness.push("Gonorrhea")
  } else if (num === 3) {
    $(".ongoing-events").prepend("Your party is ambush, they hold you hostage and take some of your food. <br>")
    wagon.food -= ranSupplyDecrease
    wagon.days += index
  } else if (num === 4) {
    $(".ongoing-events").prepend("Your wagon wheel broke, in the distance you hear Jesus Take The Wheel playing. <br>")
    wagon.days += 5
    wagon.food -= ((wagon.characters.length * 5 ) * 5)
  } else if (num === 5){
    $(".ongoing-events").prepend("Some of your food rots because " + wagon.characters[index].name + " wet themselves as they napped on it.")
    wagon.food -= ranSupplyDecrease
  }
}

function buildModal(value) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="ongoing-events">' +
    '</div>'
  )
}

function deathEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num === 1 && wagon.characters[index].health < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " has been shot and killed by Dick Chenney while straying away from the party.")
     $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  } else if (num === 2 && wagon.characters[index].illness.includes("Dysentery") == true && wagon.characters[index].health < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " wakes up screaming in the middle of their nap. They hunch over and fall to the ground. Their chest bursts open and the creature inside jumps out and attacks " + wagon.characters[0].name + " with acid and scurries off into the wilderness. " + wagon.characters[index].name + " is dead." )
    $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
    wagon.characters[0].health -= 15
    wagon.characters[0].illness.push("Acid Burns")
  } else if (num === 3 && wagon.characters[index].health < 65 ) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " has developed Pica and has been secretly snackin' on the gold. They die of heavy metal toxicity. You lose 25% of your gold.")
    $("#myModal").toggle();
    wagon.money -= (wagon.money * 0.25)
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  } else if (num === 4) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " got like stupid stoned the night before and ate a lot of food when their munchies kicked in.")
    $("#myModal").toggle();
    wagon.food -= (wagon.money * 0.5)
  } else if (num === 5 && wagon.characters[index].illness == "Gonorrhea") {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name  + " has also contracted chlymida and it has run rampant. They run off into the woods, never to be seen again.")
    $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  }
}

//Hunting
Wagon.prototype.huntingTime = function() {
  this.food += Math.floor(Math.random() * Math.floor(150))
  this.days += 1
  wagon.characters.forEach(function(char){
    char.illnessChecker() //reduces health if infected
    char.statusAdjuster() //updates status on screen based on health
  });
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

function validateNames(profession, playerOne, playerTwo, playerThree, playerFour, playerFive) {
  if (profession === undefined || playerOne === "" || playerTwo === "" || playerThree === "" || playerFour === "" || playerFive === "") {
    // for (var i = 0; i < 6; i++) {
    //   $("#char" + i).effect("shake", {times:3}, 700);
    // }
    $("#charNameInput").effect("shake", {times:3}, 700);
    $("#profession").effect("shake", {times:3}, 700)
  } else {
    $("#characterInput").fadeOut(500);
    $("#store").delay(500).fadeIn(500);
  }
}

$(document).ready(function(){
  var x = 1;
  $('#wagon-images').addClass('sky1');

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementById('myModal');

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

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
    var profession = $("input:radio[name=profession]:checked").val()
    validateNames(profession, playerOneName, playerTwoName, playerThreeName, playerFourName, playerFiveName)
    char1 = new Character(playerOneName)
    char2 = new Character(playerTwoName)
    char3 = new Character(playerThreeName)
    char4 = new Character(playerFourName)
    char5 = new Character(playerFiveName)
    wagon = new Wagon()

    wagon.characters.push(char1, char2, char3, char4, char5)
    wagon.profession()
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
  });

  $("#continue-button").click(function(){
    wagon.turn()
    wagon.foodChecker()
    wagon.deathChecker()
    $('#player-one-status').text(char1.status);
    $('#player-two-status').text(char2.status);
    $('#player-three-status').text(char3.status);
    $('#player-four-status').text(char4.status);
    $('#player-five-status').text(char5.status);
    $('#wagon-food-remaining').text(wagon.food);
    $('.current-date').text(wagon.days)
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
    $('.current-date').text(wagon.days);
  });

  $('#hunt-button').click(function(){
    wagon.huntingTime()
    $('#player-one-status').text(char1.status);
    $('#player-two-status').text(char2.status);
    $('#player-three-status').text(char3.status);
    $('#player-four-status').text(char4.status);
    $('#player-five-status').text(char5.status);
    $('#wagon-food-remaining').text(wagon.food);
    $('.current-date').text(wagon.days);
  });
});
