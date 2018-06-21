// character constructor
function Character(name) {
  this.name = name;
  this.health = 100;
  this.status = "Good"
  this.illness = []
}
// wagon/inventory constructor
function Wagon() {
  this.food = 0;
  this.money = 500;
  this.days = 0;
  this.characters = [];
  this.bullets = 0;
  this.distance = 0;
  this.hunted = 0;
  this.completed = 0.01;
}

Character.prototype.healthBar = function() {
  var pairs = {Good: "#28a745", Fair: "#f0ad4e", Poor: "#d9534f", Dead: "black"};
    $( "#char1-health-bar").progressbar({value: char1.health});
    $( "#char1-health-bar .ui-widget-header").css("background", pairs[char1.status]).css("border-color", pairs[char1.status]);
    $( "#char2-health-bar").progressbar({value: char2.health});
    $( "#char2-health-bar .ui-widget-header").css("background", pairs[char2.status]).css("border-color", pairs[char2.status]);
    $( "#char3-health-bar").progressbar({value: char3.health});
    $( "#char3-health-bar .ui-widget-header").css("background", pairs[char3.status]).css("border-color", pairs[char3.status]);
    $( "#char4-health-bar").progressbar({value: char4.health});
    $( "#char4-health-bar .ui-widget-header").css("background", pairs[char4.status]).css("border-color", pairs[char4.status]);
    $( "#char5-health-bar").progressbar({value: char5.health});
    $( "#char5-health-bar .ui-widget-header").css("background", pairs[char5.status]).css("border-color", pairs[char5.status]);
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
//food checker
Wagon.prototype.resourceChecker = function() {
  if (this.food <= 0) {
    this.food = 0
    wagon.characters.forEach(function(char){
      char.health -= 10
    });
  }
  if (this.bullet <= 0) {
    this.bullet = 0
  }
}

//Checks for illness, status changes, and character death
Wagon.prototype.statusAdjuster = function() {
  wagon.characters.forEach(function(char){
    if (char.illness.length === 1) {
      char.health -= 2
    } else if (char.illness.length === 2) {
      char.health -= 4
    } else if (char.illness.length >= 3) {
      char.health -= 6
    }

    if (char.health >= 80) {
      char.status = "Good"
    } else if (char.health < 80 && char.health >= 20) {
      char.status = "Fair"
    } else if (char.health < 20 && char.health > 0) {
      char.status = "Poor"
    } else {
      char.status = "Dead"
    }
    char.healthBar();

    if (char.health <= 0) {
      var index = wagon.characters.indexOf(char)
      wagon.characters.splice(index, 1)
      char.status = "Dead"
    }
  })
  if (wagon.characters.length === 0) {
    buildEndModal("dead", "death", "Try Again")
    $(".button-content").prepend("Game Over! You killed everyone. Great job...")
    $("#myModal").toggle();
  }
}

//calculates potential illnesses
Wagon.prototype.turn = function() {
  this.hunted = 0;
  wagon.eventGrabber();
  wagon.characters.forEach(function(char){
    char.illnessGenerator()
  });
    wagon.statusAdjuster()
    if (wagon.food > 0) {
    wagon.food -= (wagon.characters.length * 5 )
  } else if (wagon.food <= 0) {
    wagon.food = 0
  }
    this.days += 1
    this.distance += 10
    landmarkEvent();
    this.completed = (this.completed + 2);
    journey(this.completed);
    wagon.resourceChecker()
}

function journey(dist) {
    $( "#progressbar" ).progressbar({
      value: dist
    });
  }



  // function for resting -- cure illness, gain some health
Wagon.prototype.rest = function() {
  wagon.characters.forEach(function(char){
    char.illness.splice(0, 1)
    if (char.health < 99) {
    char.health += 2
    }
  });
  wagon.statusAdjuster()
  wagon.food -= (wagon.characters.length * 5 )
  this.days += 1
  wagon.resourceChecker()
}

  //event grabber
Wagon.prototype.eventGrabber = function() {
  var num = Math.floor(Math.random() * Math.floor(100))
  if (this.distance === 100 || this.distance === 200 || this.distance === 300 || this.distance === 400 || this.distance === 500) {

  } else if (num >= 80) {
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
  //random positiveEvent
function positiveEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyIncrease = Math.floor(Math.random() * (200 - 100) + 100)
  if (num === 1) {
    $('.ongoing-events').prepend('As you rest by the river, you find ' + ranSupplyIncrease + ' gold. <br>')
    wagon.money += ranSupplyIncrease
    $('.wagon-money-remaining').text(wagon.money.toFixed(2));
  } else if (num === 2) {
    $('.ongoing-events').prepend('You come across an abandoned wagon, you find ' + ranSupplyIncrease + ' unspoiled food <br>')
    wagon.food += ranSupplyIncrease
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  } else if (num === 3) {
    $('.ongoing-events').prepend('You found a wounded deer- food increased by ' + ranSupplyIncrease + ' <br>')
    wagon.food += ranSupplyIncrease
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  } else if (num === 4) {
    $('.ongoing-events').prepend('As you travel along, you come across a group of suckers. You got some free shit- money increased by ' + ranSupplyIncrease + '. <br>')
    wagon.money += ranSupplyIncrease
    $('.wagon-money-remaining').text(wagon.money.toFixed(2));
  } else if (num === 5){
    $('.ongoing-events').prepend('You ambush and murder another party. We feast tonight. <br> You got ' + ranSupplyIncrease + ' pounds of food and ' + (ranSupplyIncrease/2) + ' dollars' )
    wagon.money += (ranSupplyIncrease/2)
    wagon.food += ranSupplyIncrease
    $('.wagon-money-remaining').text(wagon.money.toFixed(2));
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  }
}
  //random neutralEvent
function neutralEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  if (num === 1) {
    $(".ongoing-events").prepend("One of you oxen was pregnant and gave birth. The baby died and she is sad, but continues on. <br>")
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
  //random negativeEvent
function negativeEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var ranSupplyDecrease = Math.floor(Math.random() * (200 - 100) + 100)
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num === 1) {
    $(".ongoing-events").prepend("Your party finds a small lake and decides to go for a swim. Unfortunately the lake was full of piranhas. <br>" + wagon.characters[index].name + " got hurt! <br>")
    wagon.characters[index].health -= 10
  } else if (num === 2 && wagon.characters[index].illness.includes("Gonorrhea") == false) {
    $(".ongoing-events").prepend("You find a small bunny and decide to keep it. The bunny bites " + wagon.characters[index].name + ". Now " + wagon.characters[index].name + " has gonorrhea.<br>")
    wagon.characters[index].illness.push("Gonorrhea")
  } else if (num === 3) {
    $(".ongoing-events").prepend("Your party is ambushed, they hold you hostage and take " + ranSupplyDecrease + " pounds of your food. <br>")
    wagon.food -= ranSupplyDecrease
    wagon.days += index
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  } else if (num === 4) {
    $(".ongoing-events").prepend("Your wagon wheel broke, in the distance you hear Jesus Take The Wheel playing. Your party loses 5 days. <br>")
    wagon.days += 5
    wagon.food -= ((wagon.characters.length * 5 ) * 5)
    document.getElementById('jesusSnatch').play();
    $("#wheel-1").fadeIn(500);
    $("#wheel-2").delay(300).fadeIn(500);
    $("#wheel-1").fadeOut(500);
    $("#wheel-3").delay(400).fadeIn(500);
    $("#wheel-2").fadeOut(500);
    $("#wheel-4").delay(500).fadeIn(500);
    $("#wheel-3").fadeOut(500);
    $("#wheel-5").delay(600).fadeIn(500);
    $("#wheel-4").fadeOut(500);
    $("#wheel-6").delay(700).fadeIn(500);
    $("#wheel-5").fadeOut(500);
    $("#jesus").delay(1100).fadeIn(100);
    $("#wheel-6").slideUp(5000).fadeOut(500);
    $("#jesus").slideUp(5000).fadeOut(500);
    $("#star").delay(5250).fadeIn("puff").fadeOut();
  } else if (num === 5){
    $(".ongoing-events").prepend(ranSupplyDecrease + " of your food rots because " + wagon.characters[index].name + " wet themselves as they napped on it.")
    wagon.food -= ranSupplyDecrease
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  }
}
//landmarkEvent for distance traveled

function storeModal() {
  $('.modal-child').html('<div id="popup-text"><h2>Here is what is in your cart currently</h2><span id="wagon-food-remaining"></span></div>' + wagon.money + '<span id="back-button" class="btn btn-danger">Back</span></div>')
}

function buildModal(value) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="ongoing-events">' +
    '</div>'
  )
}

function buildEndModal(value, btnID1, btn1Name) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="button-content">' +
    '<div class="buttons">' +
    '<span id="'+ btnID1 + 'Button" class="btn btn-success">' + btn1Name +'</span>' +
    '</div>' +
    '</div>'
  )
}

function buildLandmarkModal(value, btnID1, btnID2, btn1Name, btn2Name) {
  $('.modal-child').html('<img src="img/' + value + '.jpg" alt="an image">' +
    '<div id="popup-text" class="button-content">' +
    '<div class="buttons">' +
    '<span id="'+ btnID1 + 'Button" class="btn btn-success">' + btn1Name +'</span> <span id="'+ btnID2 + 'Button" class="btn btn-success">' + btn2Name +'</span>' +
    '</div>' +
    '</div>'
  )
}

Wagon.prototype.buildScore = function() {
  var finalScore = 10000;
  finalScore -= ((this.days - 50) * 20) + ((5 - this.characters.length) * 2000) - (this.food * .2) - (this.money * .3) - (this.bullets* .1)
  return finalScore.toFixed();

}
//Push text to class .button-content
//Option 1 button - id #option1-button
//Option 2 button - id #option2-button
function landmarkEvent() {
  var num = wagon.distance
  if (num === 100) {
    buildLandmarkModal(num, "crossRiver", "detourRiver", "Cross River", "Detour")
    $(".button-content").prepend("You have reached a river. You can choose to risk supplies and your party to cross the river or take 7 days to go around. <br>")
    $("#buttonModal").toggle();
  } else if (num === 200) {
    buildModal("campStore");
    $(".ongoing-events").prepend("Your party has come across a camp, make a selection for what you would like to buy. <br>")
    $("#myModal").toggle();
    $("#gameMainScreen").fadeOut(500);
    $("#store").delay(500).fadeIn(500);
    $("#back-button").hide();
  } else if (num === 300) {
    buildLandmarkModal(num, "sacrifice", "flee", "Sacrifice", "Flee")
    $(".button-content").prepend("As you travel along the trail you hear screams in the distance. You have no choice but to keep moving forward. When out of nowhere your wagon is surrounded by crazed cannibals. One of them steps forward and proclaims: 'I am George Donner, my family is hungry. Sacrifice one of your own and the rest are free to go on!' <br>")
    $("#buttonModal").toggle();
  } else if (num === 400) {
    buildModal("generalStore");
    $(".ongoing-events").prepend("Your party has come across a trading post, make a selection for what you would like to buy. <br>")
    $("#myModal").toggle();
    $("#gameMainScreen").fadeOut(500);
    $("#store").delay(500).fadeIn(500);
    $("#back-button").hide();
  } else if (num === 500){
    buildEndModal(num, "win", "Play Again!")
    var endScore = wagon.buildScore()
    $(".button-content").prepend("<h4>WINNER!</h4>Your score is: " + endScore);
    $("#buttonModal").addClass('confetti');
    $("#buttonModal").toggle();
  }
}
//landmark 1 button events
function detourRiver() {
  for(i=0; i < 8; i++) {
    wagon.days += 1
    wagon.food -= (wagon.characters.length * 5 )
    wagon.resourceChecker()
    wagon.statusAdjuster()
  }
  $(".ongoing-events").prepend("You spent seven days and went around the river. <br>")
  wagon.statusAdjuster()
}
function crossRiver() {
  var num = Math.floor(Math.random() * Math.floor(100))
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num > 50) {
    wagon.characters[index].health -= 30
    wagon.food -= (wagon.food * 0.4)
    wagon.money -= (wagon.money * 0.2)
    buildModal("riverFail");
    $(".ongoing-events").prepend("Your wagon tipped over and " + wagon.characters[index].name + " was swallowed by a giant catfish. Luckily they narrowly escaped, but were still injured. The catfish also feasted on " + (wagon.food * 0.4).toFixed(0) + " pounds of food and stole " + (wagon.money * 0.2).toFixed(0) + " gold. <br>")
     $("#myModal").toggle();
    for(i=0; i < 4; i++) {
      wagon.statusAdjuster()
      wagon.days += 1
      wagon.food -= (wagon.characters.length * 5 )
    }
  } else {
    buildModal("riverWin");
    $(".ongoing-events").prepend("Your wagon successfully crossed the river! <br>")
     $("#myModal").toggle();
    wagon.days += 1
    wagon.food -= (wagon.characters.length * 5 )
  }

  wagon.resourceChecker()
  wagon.statusAdjuster()
}
// landmark 3 button events
function sacrifice() {
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  wagon.characters[index].health = 0
  $(".ongoing-events").prepend(wagon.characters[index].name + " has been sacrificed, the rest of your party is free to go. <br>")
  wagon.statusAdjuster()
}
function flee() {
  var num = Math.floor(Math.random() * Math.floor(100))
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num > 50) {
    wagon.characters[index].health = 0
    buildModal("fleeFail");
    $(".ongoing-events").prepend("George caught " + wagon.characters[index].name + " while trying to flee. We can only assume he was tasty af. <br>")
    $("#myModal").toggle();
    wagon.statusAdjuster()
    wagon.days += 1
    wagon.food -= (wagon.characters.length * 5 )
  } else {
    $(".ongoing-events").prepend("Everyone was lucky enough to escape unscathed. <br>")
    wagon.days += 1
    wagon.food -= (wagon.characters.length * 5 )
  }
  wagon.statusAdjuster()
  wagon.resourceChecker()
}
function deathEvent() {
  var num = Math.floor(Math.random() * Math.floor(5))
  var index = Math.floor(Math.random() * Math.floor(wagon.characters.length))
  if (num === 1 && wagon.characters[index].health < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " has been shot and killed by Dick Cheney while straying away from the party.<br>")
     $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  } else if (num === 2 && wagon.characters[index].illness.includes("Dysentery") == true && wagon.characters[index].health < 65) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " wakes up screaming in the middle of their nap. They hunch over and fall to the ground. Their chest bursts open and the creature inside jumps out and attacks " + wagon.characters[0].name + " with acid and scurries off into the wilderness.<br>" + wagon.characters[index].name + " is dead." )
    $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
    wagon.characters[0].health -= 15
    wagon.characters[0].illness.push("Acid Burns")
  } else if (num === 3 && wagon.characters[index].health < 65 ) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " has developed Pica and has been secretly snackin' on the gold. They die of heavy metal toxicity. You lose 25% of your gold.<br>")
    $("#myModal").toggle();
    wagon.money -= (wagon.money * 0.25)
    $('.wagon-money-remaining').text(wagon.money.toFixed(2));
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  } else if (num === 4) {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name + " got like stupid stoned the night before and ate a lot of food when their munchies kicked in. You lose " + (wagon.food * 0.5) + "lbs of food.<br>")
    $("#myModal").toggle();
    wagon.food -= (wagon.food * 0.5)
    $('.wagon-food-remaining').text(wagon.food.toFixed(2));
  } else if (num === 5 && wagon.characters[index].illness == "Gonorrhea") {
    buildModal(num);
    $(".ongoing-events").prepend(wagon.characters[index].name  + " has also contracted chlamyida and it has run rampant. They run off into the woods, never to be seen again.<br>")
    $("#myModal").toggle();
    wagon.characters[index].health = 0
    wagon.characters[index].status = "Dead"
  }
}
//Hunting
Wagon.prototype.huntingTime = function() {
  var hunt = Math.floor(Math.random() * Math.floor(150))
  if (this.hunted == 1) {
    var num = 1;
    buildModal(num);
    $(".ongoing-events").prepend("You have already hunted- you must continue to a new area to hunt further.<br>");
    $("#myModal").toggle();
  } else if (this.hunted == 0 && wagon.bullets > 0){
    this.food += hunt
    this.bullets -= 1
    wagon.statusAdjuster()
    this.hunted += 1;
    $(".ongoing-events").prepend("You got " + hunt + " pounds of food.<br>")
  }

  if (hunt === 0) {
    buildModal("huntFail");
    $(".ongoing-events").prepend("You came back empty handed. Your family resents you.<br>");
    $("#myModal").toggle();
  }

  if (wagon.bullets <= 0) {
    wagon.bullets = 0
  }
  $('#wagon-bullets-remaining').text(wagon.bullets);
}
//Profession checker
Wagon.prototype.profession = function(input) {
  if (input == 1) {
    this.money += 500
  } else if (input == 2) {
    this.money += 300
  } else if (input == 3) {
    this.food += 500
  } else if (input == 4) {
    this.food += 250
    this.money += 250
  } else if (input == 5) {
    this.money += 400
    this.food += 100
  } else if (input == 6) {
    this.money += 50
  }
}

function storeSubTotal(food, bullets) {
  var total = (food * 0.2) + (bullets * 0.1);
  $('.food-total').text((food * 0.2).toFixed(2));
  $('.bullet-total').text((bullets * 0.1).toFixed(2));
  return total.toFixed(2);
}

function storeBuy(food, bullets) {
    var total = ((food * 0.2) + (bullets * 0.1)).toFixed(2);

    if (total == NaN || isNaN(total) || wagon.money < total || food < 0 || bullets < 0) {
      $("#store").effect("shake", {times:3}, 700);
    }
    else {
      wagon.money -= total;
      wagon.food += food;
      wagon.bullets += bullets;
      $("#store").fadeOut(500);
      $("#gameMainScreen").delay(500).fadeIn(500);
      $('.wagon-money-remaining').text(wagon.money.toFixed(2));
      $("#food-fields input, #bullet-fields input").val(0);
      $(".store-total, .bullet-total, .food-total").text("$0");
      return total;
  }
}

function textUpdateUI() {
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
  $('#player-one-illness').text(char1.illness.length);
  $('#player-two-illness').text(char2.illness.length);
  $('#player-three-illness').text(char3.illness.length);
  $('#player-four-illness').text(char4.illness.length);
  $('#player-five-illness').text(char5.illness.length);
  $('#wagon-food-remaining').text(wagon.food.toFixed(0));
  $('.wagon-money-remaining').text(wagon.money.toFixed(2));
  $('#wagon-bullets-remaining').text(wagon.bullets.toFixed(0));
  $('.current-date').text(wagon.days);
  $('.distance-traveled').text(wagon.distance);
}

function validateNames(profession, playerOne, playerTwo, playerThree, playerFour, playerFive) {
  if (profession === undefined || playerOne === "" || playerTwo === "" || playerThree === "" || playerFour === "" || playerFive === "") {
    $("#charNameInput").effect("shake", {times:3}, 700);
    $("#profession").effect("shake", {times:3}, 700)
  } else {
    $("#characterInput").fadeOut(500);
    $("#store").delay(500).fadeIn(500);
  }
}

function enableSubmit(ele) {
  if (ele == "#continue-button") {
    $(ele).css({"pointer-events":"auto","background-color":"#28a745","border-color":"#28a745"});
  } else if (ele == "#rest-button") {
    $(ele).css({"pointer-events":"auto","background-color":"#17a2b8","border-color":"#17a2b8"});
  }
}


$(document).ready(function(){
  var x = 1;
  $('#wagon-images').addClass('sky1');

  // modal that closes with click anywhere
  var modal = document.getElementById('myModal');
  var span = document.getElementById('myModal');
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
    var professionValue = $("input:radio[name=profession]:checked").val()

    validateNames(professionValue, playerOneName, playerTwoName, playerThreeName, playerFourName, playerFiveName)
    char1 = new Character(playerOneName)
    char2 = new Character(playerTwoName)
    char3 = new Character(playerThreeName)
    char4 = new Character(playerFourName)
    char5 = new Character(playerFiveName)
    wagon = new Wagon()
    journey(0)
    char1.healthBar()
    wagon.characters.push(char1, char2, char3, char4, char5)
    wagon.profession(professionValue)
    textUpdateUI()
  });

  $("#subtotal").click(function(){
    var buyFood = parseInt($("#food-fields input").val())
    var buyBullets = parseInt($("#bullet-fields input").val())
    $(".store-total").text("$ " + storeSubTotal(buyFood, buyBullets))
  });

  $("#storeBTN").click(function(){
    var buyFood = parseInt($("#food-fields input").val())
    var buyBullets = parseInt($("#bullet-fields input").val())
    storeBuy(buyFood, buyBullets)
    $('#wagon-food-remaining').text(wagon.food);
    $('.wagon-money-remaining').text(wagon.money.toFixed(2));
    $('#wagon-bullets-remaining').text(wagon.bullets);
  });

$("#preCheckout").click(function(){
  storeModal();
  $('#myModal').toggle();
});

$("#back-button").click(function(){
  $("#store").fadeOut(500);
  $("#characterInput").delay(500).fadeIn(500);
});

  $("#continue-button").click(function(){
    $("#continue-button").css({"pointer-events":"none","background-color":"lightgreen","border-color":"lightgreen"});
    setTimeout(function() { enableSubmit("#continue-button") }, 500);
    wagon.turn()
    wagon.statusAdjuster()
    textUpdateUI()

    if (x < 6) {
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
    $("#rest-button").css({"pointer-events":"none","background-color":"lightblue","border-color":"lightblue"});
    setTimeout(function() { enableSubmit("#rest-button") }, 500);
    wagon.rest()
    textUpdateUI()
  });

  $('#hunt-button').click(function(){
    wagon.huntingTime()
    wagon.resourceChecker()
    textUpdateUI()
  });

  $(document).on('click', '#deathButton', function(){
    history.go(0)
  });

  $(document).on('click', '#winButton', function(){
    history.go(0)
  });

  $(document).on('click', '#sacrifice', function(){
    history.go(0)
  });

  $(document).on('click', '#crossRiverButton', function(){
    crossRiver()
    textUpdateUI()
    $('#buttonModal').hide();
  });
  $(document).on('click', '#detourRiverButton', function(){
    detourRiver()
    textUpdateUI()
    $('#buttonModal').hide();

  });
  $(document).on('click', '#sacrificeButton', function(){
    sacrifice()
    textUpdateUI()
    $('#buttonModal').hide();
  });
  $(document).on('click', '#fleeButton', function(){
    flee()
    textUpdateUI()
    $('#buttonModal').hide();
  });

});
